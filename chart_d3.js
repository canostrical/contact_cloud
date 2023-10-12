import { select } from "./vendor/d3-selection-3-0-0.js";
import { scaleLinear } from "./vendor/d3-scale-4-0-2.js";
import { text } from "./vendor/d3-fetch-3-0-1.js";
import { csvParseRows } from "./vendor/d3-dsv-3-0-1.js";
import { interpolateRainbow } from "./vendor/d3-scale-chromatic-3-0-0.js";
import { color } from "./vendor/d3-color-3-1-0.js";
import { zoom, zoomIdentity, zoomTransform } from "./vendor/d3-zoom-3-0-0.js";
import { bech32, base16 } from "./vendor/scure-base-1-1-1.js";

// using nostr links until nostrapp.link or alternative works reliably on (my) iPhone
const isIOS = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
const urlPrefix = isIOS ? "nostr:" : "https://nostrapp.link/main/apps/social#";

const href = document.getElementById("href");

const showUser = (hex) => {
  if (!hex) return;

  href.setAttribute("href", `${urlPrefix}${hexToBech(hex)}`);
  href.click();
};

const drawPoint = (context, scaleX, scaleY, point, color, alpha, size) => {
  context.beginPath();
  context.globalAlpha = alpha;
  context.fillStyle = color;
  const px = scaleX(point[0]);
  const py = scaleY(point[1]);

  context.arc(px, py, size, 0, 2 * Math.PI, true);
  context.fill();
};

const getClosestIndex = (points, x, y, eventX, eventY, radius) => {
  let closestIndex;
  let minDistance = Infinity;
  points.forEach((point, i) => {
    const pointX = x(point[0]);
    const pointY = y(point[1]);
    const distance = Math.hypot(pointX - eventX, pointY - eventY);
    if (distance < minDistance && radius != null && distance < radius) {
      closestIndex = i;
      minDistance = distance;
    }
  });

  return closestIndex;
};

const bechToHex = (npub) =>
  base16.encode(bech32.fromWords(bech32.decode(npub).words)).toLowerCase();

const hexToBech = (hex) =>
  bech32.encode("npub", bech32.toWords(base16.decode(hex.toUpperCase())));

const pubkeyValueAsHex = (input) => {
  const pubkey = input.value.trim().toLowerCase();
  return pubkey.startsWith("npub") ? bechToHex(pubkey) : pubkey;
};

const run = async () => {
  let colors = [];
  const points = [];
  let selectedIndex = undefined;
  let closestIndex = undefined;
  const hexs = [];
  const getColors = (n) =>
    new Array(n).fill().map((v, i) => color(interpolateRainbow(i / n)).hex());

  const canvas = select("#canvas");
  const node = canvas.node();

  const width = node.offsetWidth;
  const height = node.offsetHeight;

  node.width = width;
  node.height = height;

  const context = node.getContext("2d");

  const x = scaleLinear().domain([-1.0, 1.0]).range([0, width]);
  const y = scaleLinear().domain([-1.0, 1.0]).range([height, 0]);
  let scaledX = x;
  let scaledY = y;

  const draw = (transform) => {
    scaledX = transform.rescaleX(x);
    scaledY = transform.rescaleY(y);

    context.clearRect(0, 0, width, height);

    const selectedPoint = points[selectedIndex];
    const closestPoint = points[closestIndex];

    points.forEach((point) => {
      if (selectedPoint !== point && closestPoint !== point)
        drawPoint(context, scaledX, scaledY, point, colors[point[2]], 0.75, 5);
    });

    if (closestPoint) {
      drawPoint(
        context,
        scaledX,
        scaledY,
        closestPoint,
        colors[closestPoint[2]],
        1,
        10
      );
    }

    if (selectedPoint) {
      drawPoint(context, scaledX, scaledY, selectedPoint, "#000000", 1, 10);
    }
  };

  const redraw = () => {
    draw(zoomTransform(node));
  };

  const csv = await text("nostr_graph.csv");

  let labelsN = 0;
  csvParseRows(csv, (row, i) => {
    const label = parseInt(row[2]);
    if (label > labelsN) labelsN = label;
    points.push([parseFloat(row[0]), parseFloat(row[1]), label]);
    hexs.push(row[3]);
  });
  colors = getColors(labelsN + 1);

  const doZoom = zoom()
    .scaleExtent([0.8, 1000])
    .on("zoom", ({ transform }) => {
      context.save();
      draw(transform);
      context.restore();
    });

  canvas.call(doZoom);
  draw(zoomIdentity);

  const input = document.getElementById("pubkey");

  const zoomTo = (pointIndex) => {
    const point = points[pointIndex];
    console.log(`zooming to ${point}`);
    selectedIndex = pointIndex;

    canvas.call(doZoom.translateTo, x(point[0]), y(point[1]));
    canvas.call(doZoom.scaleBy, 10);
  };

  const processPubkey = () => {
    try {
      const pointIndex = hexs.indexOf(pubkeyValueAsHex(input));

      if (pointIndex > -1) {
        zoomTo(pointIndex);
      }
    } catch (error) {
      console.error(error);
    }
  };
  input.addEventListener("change", processPubkey);

  node.addEventListener("mousemove", (e) => {
    closestIndex = getClosestIndex(
      points,
      scaledX,
      scaledY,
      e.clientX,
      e.clientY,
      10
    );
    redraw();
  });

  node.addEventListener("click", () => showUser(hexs[closestIndex]));
};

run();
