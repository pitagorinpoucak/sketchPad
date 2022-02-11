let gridSize = 16;
const gridWidth = document.querySelector(".bar.main").clientWidth;
let mode = "black";
let colorPicked = false;
let brushColor = "black";

drawGrid(gridSize);

document.getElementById("gridSize").addEventListener("change", (e) => {
  clearGridDivs();
  drawGrid(e.target.valueAsNumber);
});

function clearGridDivs() {
  const grid = document.getElementById("grid-container");
  let element = grid.lastElementChild;
  while (element) {
    grid.removeChild(element);
    element = grid.lastElementChild;
  }
}

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
    item.addEventListener("mouseover", changeColor);
    item.style.width = `${gridWidth / size}px`;
    item.style.height = `${gridWidth / size}px`;
  });
}

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
        e.target.style.backgroundColor = "black";
        break;
      case "eraser":
        e.target.style.backgroundColor = "white";
        break;
      case "shade":
      //TODO
      case "rainbow":
        e.target.style.backgroundColor = colour();
        break;
    }

    // e.target.style.backgroundColor = colour();
  }
}
function clean() {
  console.log("click");
  const gridItems = document.querySelectorAll(".grid-item");
  gridItems.forEach((item) => (item.style.backgroundColor = "white"));
}

function changeMode(modeChanged) {
  colorPicked = false;
  mode = modeChanged;
}

document.getElementById("colorPicker").addEventListener("change", setColor);

function setColor(e) {
  colorPicked = true;
  brushColor = e.target.value;
}
