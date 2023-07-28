import { select } from "./vendor/d3-selection-3-0-0.js";
import { scaleLinear } from "./vendor/d3-scale-4-0-2.js";
import { text } from "./vendor/d3-fetch-3-0-1.js";
import { csvParseRows } from "./vendor/d3-dsv-3-0-1.js";
import { interpolateRainbow } from "./vendor/d3-scale-chromatic-3-0-0.js";
import { color } from "./vendor/d3-color-3-1-0.js";
import { zoom, zoomIdentity } from "./vendor/d3-zoom-3-0-0.js";
import { bech32, base16 } from "./vendor/scure-base-1-1-1.js";

const run = async () => {
  let colors = [];
  const points = [];
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

  context.globalAlpha = 0.75;

  const drawPoint = (scaleX, scaleY, point) => {
    context.beginPath();
    context.fillStyle = colors[point[2]];
    const px = scaleX(point[0]);
    const py = scaleY(point[1]);

    context.arc(px, py, 5, 0, 2 * Math.PI, true);
    context.fill();
  };

  const draw = (transform) => {
    const scaleX = transform.rescaleX(x);
    const scaleY = transform.rescaleY(y);

    context.clearRect(0, 0, width, height);

    points.forEach((point) => {
      drawPoint(scaleX, scaleY, point);
    });
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

  const bechToHex = (npub) =>
    base16.encode(bech32.fromWords(bech32.decode(npub).words)).toLowerCase();

  const hexToBech = (hex) =>
    bech32.encode("npub", bech32.toWords(base16.decode(hex.toUpperCase())));

  const pubkeyValueAsHex = () => {
    const pubkey = input.value.trim().toLowerCase();
    return pubkey.startsWith("npub") ? bechToHex(pubkey) : pubkey;
  };

  const zoomTo = (point) => {
    console.log(`zooming to ${point}`);
  };

  const processPubkey = () => {
    try {
      const pointI = hexs.indexOf(pubkeyValueAsHex());

      if (pointI > -1) {
        zoomTo(points[pointI]);
      }
    } catch (error) {
      console.error(error);
    }
  };
  input.addEventListener("change", processPubkey);
};

run();
