/* 
Original inspiration: 
https://codepen.io/MathiasBerwig/pen/GopGVq
*/

const activeIntervals = [];

class Dot {
  constructor(canvas, ctx) {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;

    this.vx = -0.5 + Math.random();
    this.vy = -0.5 + Math.random();

    this.radius = Math.random();
    this.ctx = ctx;
    this.canvas = canvas;
  }

  create = () => {
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    this.ctx.fill();
  };

  animate = () => {
    if (this.y < 0 || this.y > this.canvas.height) {
      this.vx = this.vx;
      this.vy = -this.vy;
    } else if (this.x < 0 || this.x > this.canvas.width) {
      this.vx = -this.vx;
      this.vy = this.vy;
    }
    this.x += this.vx;
    this.y += this.vy;
  };
}

const setupLines = (ctx, dots, mousePosition) => {
  // Connects the dots that are in the given radius of eachother.
  for (let i = 0; i < dots.nb; i++) {
    for (let j = 0; j < dots.nb; j++) {
      let i_dot = dots.array[i];
      let j_dot = dots.array[j];

      if (
        i_dot.x - j_dot.x < dots.distance &&
        i_dot.y - j_dot.y < dots.distance &&
        i_dot.x - j_dot.x > -dots.distance &&
        i_dot.y - j_dot.y > -dots.distance
      ) {
        if (
          i_dot.x - mousePosition.x < dots.d_radius &&
          i_dot.y - mousePosition.y < dots.d_radius &&
          i_dot.x - mousePosition.x > -dots.d_radius &&
          i_dot.y - mousePosition.y > -dots.d_radius
        ) {
          ctx.beginPath();
          ctx.moveTo(i_dot.x, i_dot.y);
          ctx.lineTo(j_dot.x, j_dot.y);
          ctx.stroke();
          ctx.closePath();
        }
      }
    }
  }

  return ctx;
};

const createDots = (dots, canvas, ctx) => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (i = 0; i < dots.nb; i++) {
    dots.array.push(new Dot(canvas, ctx));
    dot = dots.array[i];

    dot.create();
    dot.animate();
  }

  return dots;
};

const setupCanvas = (elementId, colorDots, colorLine, lineWidth) => {
  let canvas = document.getElementById(elementId);
  let ctx = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  canvas.style.display = "block";
  ctx.fillStyle = colorDots;
  ctx.lineWidth = lineWidth;
  ctx.strokeStyle = colorLine;

  return { canvas, ctx };
};

const initDots = ({
  elementId,
  dotDensity = 80,
  colorDots = "#CECECE",
  colorLine = "rgba(0, 181, 255, 1)",
  widthLine = 0.2,
  maxDistanceLink = 90,
  mouseRadiusDistanceLink = 240,
  mouseActive = false,
}) => {
  const { canvas, ctx } = setupCanvas(
    elementId,
    colorDots,
    colorLine,
    widthLine
  );

  noDots = Math.round(
    (window.innerWidth * window.innerHeight * dotDensity) / 300000
  );
  console.log("noDots ", noDots);

  let dots = {
    nb: noDots,
    distance: maxDistanceLink,
    d_radius: mouseRadiusDistanceLink,
    array: [],
  };

  let mousePosition = {
    x: (30 * canvas.width) / 100,
    y: (30 * canvas.height) / 100,
  };

  dots = createDots(dots, canvas, ctx);

  if (mouseActive) {
    window.onmousemove = function (parameter) {
      mousePosition.x = parameter.pageX;
      mousePosition.y = parameter.pageY;
      dots.array[0].x = mousePosition.x;
      dots.array[0].y = mousePosition.y;
    };

    mousePosition.x = window.innerWidth / 2;
    mousePosition.y = window.innerHeight / 2;
  }

  // Skip setting up lines, if they won't be shown anyways.
  const intervalFn = mouseActive
    ? () => {
        createDots(dots, canvas, ctx);
        setupLines(ctx, dots, mousePosition);
      }
    : () => {
        createDots(dots, canvas, ctx);
      };

  return setInterval(intervalFn, 1000 / 30);
};

const reloadDots = () => {
  // Clear every interval, and create new canvases with
  // the appropriate amount of dots, and correct displacement.
  activeIntervals.forEach((interval) => clearInterval(interval));

  activeIntervals.push(
    initDots({ elementId: "hero-canvas", mouseActive: true })
  );

  activeIntervals.push(
    initDots({ elementId: "background-canvas", mouseActive: false })
  );
};

window.addEventListener("resize", reloadDots);
reloadDots();
