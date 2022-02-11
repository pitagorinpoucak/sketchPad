let gridSize = 16;
let gridWidth = document.querySelector(".bar.main").clientWidth;

drawGrid(gridSize);

document.getElementById("gridSize").addEventListener("change", (e) => {
  clearGridDivs();
  drawGrid(e.target.valueAsNumber);
});

//drawGrid();

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
  const colour = () => {
    let n = (Math.random() * 0xffffff * 1000000).toString(16);
    return "#" + n.slice(0, 6);
  };

  e.target.style.backgroundColor = colour();
}
