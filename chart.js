import { text } from "./vendor/d3-fetch-3-0-1.js";
import { csvParseRows } from "./vendor/d3-dsv-3-0-1.js";
import { interpolateRainbow } from "./vendor/d3-scale-chromatic-3-0-0.js";
import createScatterplot from "./vendor/regl-scatterplot-1-7-1.js";
import { color } from "./vendor/d3-color-3-1-0.js";
import { bech32, base16 } from "./vendor/scure-base-1-1-1.js";

const run = async () => {
  const points = [];
  const hexs = [];
  const canvas = document.getElementById("canvas");
  const href = document.getElementById("href");
  const input = document.getElementById("pubkey");
  const notsupported = document.getElementById("notsupported");

  const colors = (n) =>
    new Array(n).fill().map((v, i) => color(interpolateRainbow(i / n)).hex());

  const bechToHex = (npub) =>
    base16.encode(bech32.fromWords(bech32.decode(npub).words)).toLowerCase();

  const hexToBech = (hex) =>
    bech32.encode("npub", bech32.toWords(base16.decode(hex.toUpperCase())));

  const pubkeyValueAsHex = () => {
    const pubkey = input.value.trim().toLowerCase();
    return pubkey.startsWith("npub") ? bechToHex(pubkey) : pubkey;
  };

  const showUser = (idx) => {
    const hex = hexs[idx];
    if (hex === pubkeyValueAsHex()) return;

    href.setAttribute("href", `nostr:${hexToBech(hex)}`);
    href.click();
  };

  const { width, height } = canvas.getBoundingClientRect();

  const scatterplot = createScatterplot({
    canvas,
    width,
    height,
    pointSize: 5,
    colorBy: "valueA",
    opacity: 0.75,
  });

  if (!scatterplot.isSupported) {
    notsupported.style.display = "block";
    return;
  }

  const csv = await text("nostr_graph.csv");
  let labelsN = 0;

  csvParseRows(csv, (row, i) => {
    const label = parseInt(row[2]);
    if (label > labelsN) labelsN = label;
    points.push([parseFloat(row[0]), parseFloat(row[1]), label]);
    hexs.push(row[3]);
  });

  scatterplot.set({
    pointColor: colors(labelsN + 1),
  });

  scatterplot.subscribe("select", (ev) => showUser(ev.points[0]));

  await scatterplot.draw(points);

  const processPubkey = () => {
    try {
      const pointI = hexs.indexOf(pubkeyValueAsHex());

      if (pointI > -1) {
        scatterplot.select([pointI]);
        scatterplot.zoomToPoints([pointI], { transition: true });
      }
    } catch (error) {
      console.error(error);
    }
  };
  input.addEventListener("change", processPubkey);
};

run();
