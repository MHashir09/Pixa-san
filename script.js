const gridContainer = document.querySelector(".grid-container")
const submitBtn = document.querySelector("#submitButton");
const colorPicker = new iro.ColorPicker("#colorPicker");

submitBtn.addEventListener('click', (event) => {
  const gridSizeInput = document.querySelector("#grid-size");
  const gridSize = +gridSizeInput.value;
  gridContainer.innerHTML = "";
  gridSizeInput.value = "";
  if (gridSize >= 0 && gridSize <= 100) createGrid(gridSize);
  event.preventDefault();
})

function createGrid(gridSize) {
  let isDragging = false;

  for (let i = 0; i < gridSize ** 2; i++) {
    let square = document.createElement("div");
    square.classList.add("grid-squares");
    square.style.setProperty('--grid-rows-columns', gridSize);
    gridContainer.appendChild(square);

    square.addEventListener('mousedown', (event) => {
      if (event.type == 'mousedown') {
        isDragging = true;
        square.style.backgroundColor = colorPicker.color.hexString;
      }
    });

    square.addEventListener('mouseenter', () => {
      if (isDragging == true) {
        square.style.backgroundColor = colorPicker.color.hexString;
      }
    });

    document.addEventListener('mouseup', () => {
        isDragging = false;
    })
  }
}
