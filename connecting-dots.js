/* 
Original inspiration: 
https://codepen.io/MathiasBerwig/pen/GopGVq
*/

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

const createDots = (dots, canvas, ctx) => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (i = 0; i < dots.nb; i++) {
    dots.array.push(new Dot(canvas, ctx));
    dot = dots.array[i];

    dot.create();
  }

  //dot.line();
  dots.array.forEach((dot) => dot.animate());

  return dots;
};

const setupCanvas = (elementId) => {
  var canvas = document.getElementById(elementId),
    ctx = canvas.getContext("2d"),
    colorDot = "#CECECE",
    color = "rgba(0, 181, 255, 1)";
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  canvas.style.display = "block";
  ctx.fillStyle = colorDot;
  ctx.lineWidth = 0.2;
  ctx.strokeStyle = color;

  return { canvas, ctx };
};

const initDots = ({
  elementId,
  noDots = 400,
  maxDistanceLink = 90,
  mouseRadiusDistanceLink = 240,
  mouseActive = false,
}) => {
  const { canvas, ctx } = setupCanvas(elementId);

  let dots = {
    nb: noDots,
    distance: maxDistanceLink,
    d_radius: mouseRadiusDistanceLink,
    array: [],
  };

  var mousePosition = {
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

  return setInterval(() => {
    createDots(dots, canvas, ctx);
  }, 1000 / 30);
};

initDots({ elementId: "hero-canvas", mouseActive: true });

/* 

line() {
    for (i = 0; i < dots.nb; i++) {
      for (j = 0; j < dots.nb; j++) {
        i_dot = dots.array[i];
        j_dot = dots.array[j];
      }
    }
  }


*/
