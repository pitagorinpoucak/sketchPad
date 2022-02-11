const gridSize = 10; //prompt("How big should the grid be?");
let colorsArray = ["blue", "black", "yellow", "green", "red", "grey", "orange"];

drawGrid();

function drawGrid() {
  const gridContainer = document.getElementById("grid-container");
  gridContainer.style.gridTemplateColumns = `repeat(${gridSize}, 60px)`;

  for (let i = 0; i < gridSize * gridSize; i++) {
    gridContainer.appendChild(document.createElement("div"));
  }
  const gridItems = document.querySelectorAll("#grid-container div");
  gridItems.forEach((item) => {
    item.classList.add("grid-item");
    item.addEventListener("mouseover", changeColor);
  });
}

function changeColor(e) {
  const colour =
    colorsArray[Math.floor(Math.random() * (colorsArray.length - 1))];
  e.target.style.backgroundColor = colour;
}
