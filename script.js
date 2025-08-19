const container = document.querySelector(".container")
for (let i = 0; i < 256; i++) {
  let square = document.createElement("div");
  square.classList.add("grid-squares")
  container.appendChild(square);
}
