const container = document.querySelector(".grid-container")
const submitBtn = document.querySelector("#submitButton");
submitBtn.addEventListener('click', (event) => {
  const gridSizeInput = document.querySelector("#grid-size");
  const gridSize = +gridSizeInput.value;
  container.innerHTML = "";
  gridSizeInput.value = "";
 if (gridSize >= 0 && gridSize <= 100) createGrid(gridSize);
  event.preventDefault();
})

function createGrid(gridSize) {
  for (let i = 0; i < gridSize**2; i++) {
    let square = document.createElement("div");
    square.classList.add("grid-squares");
    square.style.setProperty('--grid-rows-columns', gridSize);
    container.appendChild(square);
  }
}
