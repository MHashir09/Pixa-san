const grid = document.querySelector(".grid");
const submitBtn = document.querySelector("#submitButton");
const colorPicker = new iro.ColorPicker("#colorPicker");
const randomModeBtns = document.querySelectorAll(".randomMode");
const trailingEffectBtns = document.querySelectorAll(".trailingEffect");
const aboutSection = document.querySelector(".about-page-section");
const presetsSection = document.querySelector(".presetsSection");
const sketchboardSection = document.querySelector(".sketchboard-section");
const pageTitle = document.querySelector("title");
const redirectToPreferencesBtns = document.querySelectorAll(
  ".redirectToPreferences"
);
const redirectToAboutPageBtn = document.querySelector("#redirectToAboutPage");
const controls = document.querySelector(".controls");
const toggleCtrlBtn = document.querySelector("#toggleCtrlBtn");
const clearGridBtn = document.querySelector("#clearGrid");

let currentSection = "about";
let gridSize = "";
let isDragging = false;
let toggleRandomMode = false;
let toggleTrailingEffect = false;
let opacityValue = 0;

redirectToPreferencesBtns.forEach((button) => {
  button.addEventListener("click", () => {
    if (currentSection == "about") {
      aboutSection.classList.add("hidden");
      presetsSection.classList.remove("hidden");
      pageTitle.textContent = "";
      pageTitle.textContent = "Preferences";
      currentSection = "preferences";
    } else if (currentSection == "sketchboard") {
      sketchboardSection.classList.add("hidden");
      presetsSection.classList.remove("hidden");
      controls.classList.add("hidden");
      pageTitle.textContent = "";
      pageTitle.textContent = "Preferences";
      currentSection = "preferences";
    }
  });
});

redirectToAboutPageBtn.addEventListener("click", () => {
  sketchboardSection.classList.add("hidden");
  aboutSection.classList.remove("hidden");
  controls.classList.add("hidden");
  pageTitle.textContent = "";
  pageTitle.textContent = "Welcome !!";
  currentSection = "about";
});

toggleCtrlBtn.addEventListener("click", () =>
  controls.classList.toggle("hidden"),
);

submitBtn.addEventListener("click", (event) => {
  event.preventDefault();
  const inputBox = document.querySelector("#grid-size");
  gridSize = +inputBox.value;

  grid.innerHTML = "";
  inputBox.value = "";

  if (gridSize >= 0 && gridSize <= 100) createGrid(gridSize);

  if (currentSection == "preferences") {
    presetsSection.classList.add("hidden");
    aboutSection.classList.add("hidden");
    sketchboardSection.classList.remove("hidden");
    currentSection = "sketchboard";
    pageTitle.textContent = "";
    pageTitle.textContent = "Pixa San";
  }
});

clearGridBtn.addEventListener('click', () => {
  createGrid(gridSize);
});

randomModeBtns.forEach((button) => {
  button.addEventListener("click", (event) => {
    event.preventDefault();

    if (toggleRandomMode == false) {
      toggleRandomMode = true;
      button.style.backgroundColor = "#f2e9e1";
      button.textContent = "Random Mode Enabled";
    } else {
      toggleRandomMode = false;
      button.style.backgroundColor = "#e0def4";
      button.textContent = "Enable Random Mode";
    }
  });
});

trailingEffectBtns.forEach((button) => {
  button.addEventListener("click", (event) => {
    event.preventDefault();

    if (toggleTrailingEffect == false) {
      toggleTrailingEffect = true;
      button.style.backgroundColor = "#f2e9e1";
      button.textContent = "Trailing Effect Enabled";
    } else {
      toggleTrailingEffect = false;
      button.style.backgroundColor = "#e0def4";
      button.textContent = "Enable Trailing Effect";
    }
  });
});

function createGrid(gridSize) {
  grid.removeEventListener("mousedown", handleMouseDown); //
  grid.removeEventListener("mouseover", handleMouseOver); //   To make sure event listeners dont accumulate after new grid creation
  window.removeEventListener("mouseup", handleMouseUp); //

  for (let i = 0; i < gridSize ** 2; i++) {
    var square = document.createElement("div");
    square.classList.add("grid-squares");
    square.style.setProperty("--grid-rows-columns", gridSize);
    grid.appendChild(square);
  }

  grid.addEventListener("mousedown", handleMouseDown);
  grid.addEventListener("mouseover", handleMouseOver);
  window.addEventListener("mouseup", handleMouseUp);
}

function generateRandomRgbColor() {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return `rgb(${r}, ${g}, ${b})`;
}

function generateTrailingEffect() {
  if (opacityValue >= 0 && opacityValue < 100) {
    let currentValue = opacityValue;
    // Used a second variable to seamlessly increment opacity value from 0 to 100, if we dont then it will increment weirdly like it will start from 10 instead of 0 but when currentValue variable is used to store opacity value and then we increment the opacity value, returning the currentValue it works. lets say opacity value is 0, its then stored inside currentValue variable and then incremented now being 10, we return currentValue which is 0, the opacity value we wanted, so when mouse enters next square the value 10 is returned and the process continues.
    opacityValue += 10;
    return `${currentValue}%`;
  } else {
    opacityValue = 0;
  }
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

    if (toggleTrailingEffect == true)
      event.target.style.opacity = generateTrailingEffect();
  }
}

function handleMouseOver(event) {
  if (isDragging == true) {
    if (toggleRandomMode == false) {
      event.target.style.backgroundColor = colorPicker.color.hexString;
    } else if (toggleRandomMode == true) {
      event.target.style.backgroundColor = generateRandomRgbColor();
    }

    if (toggleTrailingEffect == true)
      event.target.style.opacity = generateTrailingEffect();
  }
}

function handleMouseUp() {
  isDragging = false;
  opacityValue = 0;
}
