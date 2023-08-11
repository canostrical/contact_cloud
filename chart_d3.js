import { select } from "./vendor/d3-selection-3-0-0.js";
import { scaleLinear } from "./vendor/d3-scale-4-0-2.js";
import { text } from "./vendor/d3-fetch-3-0-1.js";
import { csvParseRows } from "./vendor/d3-dsv-3-0-1.js";
import { interpolateRainbow } from "./vendor/d3-scale-chromatic-3-0-0.js";
import { color } from "./vendor/d3-color-3-1-0.js";
import { zoom, zoomIdentity } from "./vendor/d3-zoom-3-0-0.js";
import { bech32, base16 } from "./vendor/scure-base-1-1-1.js";

const drawPoint = (context, scaleX, scaleY, point, colors, selected) => {
  context.beginPath();
  const [color, size, alpha] = selected
    ? ["#000000", 10, 1]
    : [colors[point[2]], 5, 0.75];
  context.globalAlpha = alpha;
  context.fillStyle = color;
  const px = scaleX(point[0]);
  const py = scaleY(point[1]);

  context.arc(px, py, size, 0, 2 * Math.PI, true);
  context.fill();
};

const closestPoint = (points, x, y, eventX, eventY, radius) => {
  let closestPoint;
  let minDistance = Infinity;
  points.forEach((point) => {
    const pointX = x(point[0]);
    const pointY = y(point[1]);
    const distance = Math.hypot(pointX - eventX, pointY - eventY);
    if (distance < minDistance && radius != null && distance < radius) {
      closestPoint = point;
      minDistance = distance;
    }
  });

  return closestPoint;
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
  let selectedPoint = undefined;
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

  const draw = (transform) => {
    const scaleX = transform.rescaleX(x);
    const scaleY = transform.rescaleY(y);

    context.clearRect(0, 0, width, height);

    points.forEach((point) => {
      if (selectedPoint !== point)
        drawPoint(context, scaleX, scaleY, point, colors, false);
    });

    if (selectedPoint)
      drawPoint(context, scaleX, scaleY, selectedPoint, colors, true);
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

  const zoomTo = (point) => {
    console.log(`zooming to ${point}`);
    selectedPoint = point;

    canvas.call(doZoom.translateTo, x(point[0]), y(point[1]));
    canvas.call(doZoom.scaleBy, 10);
  };

  const processPubkey = () => {
    try {
      const pointI = hexs.indexOf(pubkeyValueAsHex(input));

      if (pointI > -1) {
        zoomTo(points[pointI]);
      }
    } catch (error) {
      console.error(error);
    }
  };
  input.addEventListener("change", processPubkey);

  node.addEventListener("mousemove", (e) => {
    const closest = closestPoint(points, x, y, e.clientX, e.clientY, 10);
    if (closest) {
    }
  });
};

run();
