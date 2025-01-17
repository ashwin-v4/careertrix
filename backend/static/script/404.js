const wrapper = document.getElementById("tiles");
const homeBtn = document.getElementById("home-btn");
const homeIcon = document.getElementById("icon");

let columns = 0,
  rows = 0,
  toggled = false;

const toggle = () => {
  toggled = !toggled;
  document.body.classList.toggle("toggled");
  homeBtn.style.transition = toggled ? "opacity 0.5s, transform 0.5s" : "none";
};

const handleOnClick = (index) => {
  toggle();

  anime({
    targets: ".tile",
    opacity: toggled ? 0 : 1,
    delay: anime.stagger(50, {
      grid: [columns, rows],
      from: index,
    }),
  });
};

const createTile = (index) => {
  const tile = document.createElement("div");
  tile.classList.add("tile");
  tile.style.opacity = toggled ? 0 : 1;
  tile.onclick = () => handleOnClick(index);
  return tile;
};

const createTiles = (quantity) => {
  Array.from(Array(quantity)).map((_, index) => {
    wrapper.appendChild(createTile(index));
  });
};

const createGrid = () => {
  wrapper.innerHTML = "";
  const size = document.body.clientWidth > 800 ? 100 : 50;
  columns = Math.floor(document.body.clientWidth / size);
  rows = Math.floor(document.body.clientHeight / size);

  wrapper.style.setProperty("--columns", columns);
  wrapper.style.setProperty("--rows", rows);

  createTiles(columns * rows);
};

createGrid();
window.onresize = () => createGrid();
