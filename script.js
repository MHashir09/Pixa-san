const gridContainer = document.querySelector(".grid-container");
//gridContainer.style.display = 'none';
const submitBtn = document.querySelector("#submitButton");
const colorPicker = new iro.ColorPicker("#colorPicker");
const randomModeBtn = document.querySelector("#randomMode");

let isDragging = false;
let toggleRandomMode = false;

randomModeBtn.addEventListener('click', (event) => {
  event.preventDefault();

  if (toggleRandomMode == false) {
    toggleRandomMode = true;
    randomModeBtn.style.backgroundColor = '#f2e9e1';
  } else {
    toggleRandomMode = false;
    randomModeBtn.style.backgroundColor = '#e0def4';
  }
});

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

function generateRandomRgbColor() {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return `rgb(${r}, ${g}, ${b})`;
}

function handleMouseDown(event) {
  event.preventDefault();
  // Using prevent default make sure it doesnt try to grab and drag text or anything else causing weird behaviour
  if (event.target.classList.contains("grid-squares")) {
    if (toggleRandomMode == false) {
      isDragging = true;
      event.target.style.backgroundColor = colorPicker.color.hexString;
      // using event.target to access current square on which the event was fired upon (using event delegation)
    } else if (toggleRandomMode == true) {
      isDragging = true;
      event.target.style.backgroundColor = generateRandomRgbColor();
    }
  }
}

function handleMouseOver(event) {
  if (isDragging == true) {
    if (toggleRandomMode == false) {
      event.target.style.backgroundColor = colorPicker.color.hexString;
    } else if (toggleRandomMode == true) {
      event.target.style.backgroundColor = generateRandomRgbColor();
    }
  }
}

function handleMouseUp() {
  isDragging = false;
}
