const gridWidth = document.querySelector(".bar.main").clientWidth;
let mode = "black";
let colorPicked = false;
let brushColor = "black";
let darken = false;
const gridSizeSlider = document.getElementById("gridSize");
const gridSizeText = document.getElementById("gridSizeText");
let gridSize = gridSizeSlider.value;

drawGrid(gridSize);

//Set brush color with color picker
document.getElementById("colorPicker").addEventListener("change", setColor);

//Event listeners for grid size change
gridSizeSlider.addEventListener("change", (e) => {
  clearGridDivs();
  gridSizeText.value = e.target.valueAsNumber;
  drawGrid(e.target.valueAsNumber);
  document.getElementById("gridStyle").innerText = "Circle";
  console.log(e.target);
});

gridSizeText.addEventListener("change", (e) => {
  clearGridDivs();
  let val = e.target.value;
  if (val < 2) {
    val = 2;
  } else if (val > 100) {
    val = 100;
  }

  gridSizeSlider.value = val;
  drawGrid(val);
  document.getElementById("gridStyle").innerText = "Circle";
});

//DRAWING AND ERASING GRID

function drawGrid(size) {
  const gridContainer = document.getElementById("grid-container");
  gridContainer.removeChild;
  gridContainer.style.gridTemplateColumns = `repeat(${size}, ${size}fr)`;

  for (let i = 0; i < size * size; i++) {
    gridContainer.appendChild(document.createElement("div"));
  }
  const gridItems = document.querySelectorAll("#grid-container div");
  gridItems.forEach((item) => {
    item.classList.add("grid-item");
    item.style.backgroundColor = "#ffffff";
    item.addEventListener("mouseover", changeColor);
    item.style.width = `${gridWidth / size}px`;
    item.style.height = `${gridWidth / size}px`;
  });
}

function clearGridDivs() {
  const grid = document.getElementById("grid-container");
  let element = grid.lastElementChild;
  while (element) {
    grid.removeChild(element);
    element = grid.lastElementChild;
  }
}

//DRAWING IN GRID

function changeColor(e) {
  if (colorPicked) {
    e.target.style.backgroundColor = brushColor;
  } else {
    const colour = () => {
      let n = (Math.random() * 0xffffff * 1000000).toString(16);
      return "#" + n.slice(0, 6);
    };

    switch (mode) {
      case "black":
        e.target.style.backgroundColor = "#000000";
        break;
      case "eraser":
        e.target.style.backgroundColor = "#ffffff";
        break;
      case "rainbow":
        e.target.style.backgroundColor = colour();
        break;
      case "darken":
        e.target.style.backgroundColor = pSBC(
          -0.1,
          e.target.style.backgroundColor,
          false,
          true
        );
        break;
    }
  }
}

//TOOLS AND BUTTONS

function changeGridStyle() {
  const button = document.getElementById("gridStyle");
  const gridParts = document.querySelectorAll(".grid-item");
  if (button.innerText === "Circle") {
    button.innerText = "Square";
    gridParts.forEach((item) => item.classList.add("radius"));
  } else {
    button.innerText = "Circle";

    gridParts.forEach((item) => item.classList.remove("radius"));
  }
}

function changeMode(modeChanged) {
  colorPicked = false;
  mode = modeChanged;
}

function setColor(e) {
  colorPicked = true;
  brushColor = e.target.value;
}

function clean() {
  const gridItems = document.querySelectorAll(".grid-item");
  gridItems.forEach((item) => (item.style.backgroundColor = "white"));
}

/*Function to manipulate color, in this case used only
to darken with input of (-0.1, color, false, true)
but can be used to mix two colors, lighten or darken color, or make it transparent
at least according to stackOverflow from where it's copied*/
const pSBC = (p, c0, c1, l) => {
  let r,
    g,
    b,
    P,
    f,
    t,
    h,
    i = parseInt,
    m = Math.round,
    a = typeof c1 == "string";
  if (
    typeof p != "number" ||
    p < -1 ||
    p > 1 ||
    typeof c0 != "string" ||
    (c0[0] != "r" && c0[0] != "#") ||
    (c1 && !a)
  )
    return null;
  if (!this.pSBCr)
    this.pSBCr = (d) => {
      let n = d.length,
        x = {};
      if (n > 9) {
        ([r, g, b, a] = d = d.split(",")), (n = d.length);
        if (n < 3 || n > 4) return null;
        (x.r = i(r[3] == "a" ? r.slice(5) : r.slice(4))),
          (x.g = i(g)),
          (x.b = i(b)),
          (x.a = a ? parseFloat(a) : -1);
      } else {
        if (n == 8 || n == 6 || n < 4) return null;
        if (n < 6)
          d =
            "#" +
            d[1] +
            d[1] +
            d[2] +
            d[2] +
            d[3] +
            d[3] +
            (n > 4 ? d[4] + d[4] : "");
        d = i(d.slice(1), 16);
        if (n == 9 || n == 5)
          (x.r = (d >> 24) & 255),
            (x.g = (d >> 16) & 255),
            (x.b = (d >> 8) & 255),
            (x.a = m((d & 255) / 0.255) / 1000);
        else
          (x.r = d >> 16), (x.g = (d >> 8) & 255), (x.b = d & 255), (x.a = -1);
      }
      return x;
    };
  (h = c0.length > 9),
    (h = a ? (c1.length > 9 ? true : c1 == "c" ? !h : false) : h),
    (f = this.pSBCr(c0)),
    (P = p < 0),
    (t =
      c1 && c1 != "c"
        ? this.pSBCr(c1)
        : P
        ? { r: 0, g: 0, b: 0, a: -1 }
        : { r: 255, g: 255, b: 255, a: -1 }),
    (p = P ? p * -1 : p),
    (P = 1 - p);
  if (!f || !t) return null;
  if (l)
    (r = m(P * f.r + p * t.r)),
      (g = m(P * f.g + p * t.g)),
      (b = m(P * f.b + p * t.b));
  else
    (r = m((P * f.r ** 2 + p * t.r ** 2) ** 0.5)),
      (g = m((P * f.g ** 2 + p * t.g ** 2) ** 0.5)),
      (b = m((P * f.b ** 2 + p * t.b ** 2) ** 0.5));
  (a = f.a),
    (t = t.a),
    (f = a >= 0 || t >= 0),
    (a = f ? (a < 0 ? t : t < 0 ? a : a * P + t * p) : 0);
  if (h)
    return (
      "rgb" +
      (f ? "a(" : "(") +
      r +
      "," +
      g +
      "," +
      b +
      (f ? "," + m(a * 1000) / 1000 : "") +
      ")"
    );
  else
    return (
      "#" +
      (4294967296 + r * 16777216 + g * 65536 + b * 256 + (f ? m(a * 255) : 0))
        .toString(16)
        .slice(1, f ? undefined : -2)
    );
};
