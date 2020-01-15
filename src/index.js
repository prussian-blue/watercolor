import * as d3 from "d3";
import "./css/reset.css";
import "./css/style.css";

// Dani Vicario - index experiment (canvas)- Tue 14 Jan 2020 21:49:56 CET

// eslint-disable-next-line no-unused-vars
const globalCompositeOperationModes = {
  "normal": "source-over",
  "source-in": "source-in",
  "source-out": "source-out",
  "source-atop": "source-atop",
  "destination-over": "destination-over",
  "destination-in": "destination-in",
  "destination-out": "destination-out",
  "destination-atop": "destination-atop",
  "lighter": "lighter",
  "copy": "copy",
  "xor": "xor",
  "multiply": "multiply",
  "screen": "screen",
  "overlay": "overlay",
  "darken": "darken",
  "lighten": "lighten",
  "color-dodge": "color-dodge",
  "color-burn": "color-burn",
  "hard-light": "hard-light",
  "soft-light": "soft-light",
  "difference": "difference",
  "exclusion": "exclusion",
  "hue": "hue",
  "saturation": "saturation",
  "color": "color",
  "luminosity": "luminosity"
};

const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);

// eslint-disable-next-line func-names
CanvasRenderingContext2D.prototype.rotateImageFromCenter = function(
  imageCanvas,
  angleInDegrees,
  placeImageInX,
  placeImageInY,
  width,
  height
) {
  this.save();

  if (width === undefined && height === undefined) {
    this.translate(placeImageInX, placeImageInY);
    this.rotate((angleInDegrees * Math.PI) / 180);
    this.drawImage(imageCanvas, -imageCanvas.width / 2, -imageCanvas.height / 2);
  } else {
    this.translate(placeImageInX, placeImageInY);
    this.rotate((angleInDegrees * Math.PI) / 180);
    this.drawImage(imageCanvas, -width / 2, -height / 2, width, height);
  }

  this.restore();
};

// eslint-disable-next-line no-unused-vars
Math.randomFloat = (min, max) => Math.random() * (max - min) + min;
// eslint-disable-next-line no-unused-vars
Math.randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);
// eslint-disable-next-line no-unused-vars
Math.shuffle = (array, _) => array.sort(() => Math.random() - 0.5);

// eslint-disable-next-line no-unused-vars
function getGlobalCompositeOperationMode() {
  const keys = Object.keys(globalCompositeOperationModes);
  let mode = 0;
  let consoleDone = false;

  // eslint-disable-next-line arrow-parens
  window.onkeydown = e => {
    if (e.keyCode === 39) {
      mode++;
      consoleDone = false;

      if (mode === keys.length) mode = 0;
    }

    if (e.keyCode === 37) {
      mode--;
      consoleDone = false;

      if (mode < 0) mode = keys.length - 1;
    }
  };

  // eslint-disable-next-line no-func-assign
  getGlobalCompositeOperationMode = () => {
    const modeFinal = globalCompositeOperationModes[keys[mode]];

    if (!consoleDone) {
      // eslint-disable-next-line no-console
      console.log("exposure mode to", modeFinal);

      consoleDone = true;
    }

    return modeFinal;
  };

  return getGlobalCompositeOperationMode;
}

// eslint-disable-next-line func-names
CanvasRenderingContext2D.prototype.rotateImageFromCenter = function(
  imageCanvas,
  angleInDegrees,
  placeImageInX,
  placeImageInY,
  width,
  height
) {
  this.save();

  if (width === undefined && height === undefined) {
    this.translate(placeImageInX, placeImageInY);
    this.rotate((angleInDegrees * Math.PI) / 180);
    this.drawImage(imageCanvas, -imageCanvas.width / 2, -imageCanvas.height / 2);
  } else {
    this.translate(placeImageInX, placeImageInY);
    this.rotate((angleInDegrees * Math.PI) / 180);
    this.drawImage(imageCanvas, -width / 2, -height / 2, width, height);
  }

  this.restore();
};

/** @type HTMLCanvasElement */
const canvasDOMEl = document.getElementById("canvas");

/** @type CanvasRenderingContext2D */
const ctx = canvasDOMEl.getContext("2d");

const w = window.innerWidth;
const h = window.innerHeight;
// eslint-disable-next-line no-unused-vars
const w2 = w / 2;
// eslint-disable-next-line no-unused-vars
const h2 = h / 2;

// eslint-disable-next-line no-unused-vars
const { PI } = Math;
// eslint-disable-next-line no-unused-vars
const PI_DOUBLE = 2 * Math.PI;
// eslint-disable-next-line no-unused-vars
const PI_HALF = Math.PI / 2;

canvasDOMEl.setAttribute("height", window.innerHeight);
canvasDOMEl.setAttribute("width", window.innerWidth);

ctx.save();

const img = new Image();

const design = randomInt(1,3)
img.src = `img/f${design}.jpg`;

if (design === 1) {
  canvasDOMEl.style.background = `linear-gradient(#820031, #fe0032)`
  
}
if (design === 2) {
  canvasDOMEl.style.background = `linear-gradient(#8cd4d2, #82b9cd)`
}

if (design === 3) {
  canvasDOMEl.style.background = `linear-gradient(#ffa5fc, #ca3ec5)`
}


img.onload = draw;

function draw() {
  var canvas = document.querySelector("canvas"),
    context = canvas.getContext("2d"),
    width = canvas.width,
    height = canvas.height,
    tau = 2 * Math.PI;

  var nodes = d3.range(1200).map(function(i) {
    return {
      r: Math.random() * 12 + 4
    };
  });

  d3
    .forceSimulation(nodes)
    .velocityDecay(0.98)
    .force("x", d3.forceX().strength(0.002))
    .force("y", d3.forceY().strength(0.002))
    .force(
      "collide",
      d3
        .forceCollide()
        .radius(function(d) {
          return d.r + 1.5;
        })
        .iterations(2)
    )
    .on("tick", ticked);

  function ticked() {
    context.clearRect(0, 0, width, height);
    context.drawImage(img, w / 2 - img.width / 2, h / 2 - img.height / 2);
    context.globalCompositeOperation = globalCompositeOperationModes["destination-in"];
    context.save();
    context.translate(width / 2, height / 2);

    context.beginPath();
    nodes.forEach(function(d) {
      context.moveTo(d.x + d.r, d.y);
      context.arc(d.x, d.y, d.r, 0, tau);
    });
    context.fillStyle = "#ddd";
    context.fill();
    // context.strokeStyle = "#000";
    // context.stroke();

    context.restore();
    context.globalCompositeOperation = globalCompositeOperationModes.normal;
  }
}
