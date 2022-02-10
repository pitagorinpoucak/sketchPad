const gridSize = prompt("How big should the grid be?");

drawGrid();

function drawGrid() {
  const gridContainer = document.getElementById("grid-container");
  gridContainer.style.gridTemplateColumns = `repeat(${gridSize}, 20px)`;

  for (let i = 0; i < gridSize * gridSize; i++) {
    gridContainer.appendChild(document.createElement("div"));
  }
  const gridItems = document.querySelectorAll("#grid-container div");
  gridItems.forEach((item) => {
    item.classList.add("grid-item");
  });
}
