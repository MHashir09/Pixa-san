const gridContainer = document.querySelector(".grid-container");
const submitBtn = document.querySelector("#submitButton");
const colorPicker = new iro.ColorPicker("#colorPicker");
let isDragging = false;

submitBtn.addEventListener("click", (event) => {
  const inputBox = document.querySelector("#grid-size");
  const gridSize = +inputBox.value;

  gridContainer.innerHTML = "";
  inputBox.value = "";
  if (gridSize >= 0 && gridSize <= 100) createGrid(gridSize);
  event.preventDefault();
});

function createGrid(gridSize) {

  gridContainer.removeEventListener("mousedown", handleMouseDown); //
  gridContainer.removeEventListener("mouseover", handleMouseOver); //   To make sure event listeners dont accumulate after new grid creation
  window.removeEventListener("mouseup", handleMouseUp);           //

  for (let i = 0; i < gridSize ** 2; i++) {
    var square = document.createElement("div");
    square.classList.add("grid-squares");
    square.style.setProperty("--grid-rows-columns", gridSize);
    gridContainer.appendChild(square);
  }

  gridContainer.addEventListener("mousedown", handleMouseDown);
  gridContainer.addEventListener("mouseover", handleMouseOver);
  window.addEventListener("mouseup", handleMouseUp);
}

function handleMouseDown(event) {
  event.preventDefault(); // To make sure it doesnt try to grab and drag text or anything else causing weird behaviour
  if (event.target.classList.contains("grid-squares")) {
    isDragging = true;
    event.target.style.backgroundColor = colorPicker.color.hexString; // using event.target to access current square on which the event was fired upon (using event delegation)
  }
}

function handleMouseOver(event) {
  if (isDragging == true) {
    event.target.style.backgroundColor = colorPicker.color.hexString;
  }
}

function handleMouseUp() {
  isDragging = false;
}
