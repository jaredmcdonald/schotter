import schotter from "./schotter";
import randomPolygon from "./randomPolygon";
import gridDistortion from "./gridDistortion";

const dispatcher = {
  schotter,
  randomPolygon,
  gridDistortion
};

const references = {
  schotter:
    "http://collections.vam.ac.uk/item/O221321/schotter-print-nees-georg/",
  randomPolygon:
    "http://collections.vam.ac.uk/item/O239558/random-polygons-photograph-nake-frieder/",
  gridDistortion: ""
};

const select = document.querySelector("select");

function draw() {
  dispatcher[select.value]();
}

function updateReference() {
  document.querySelector("#controls a").href = references[select.value];
}

select.addEventListener("change", () => {
  draw();
  updateReference();
});
document.querySelector("button").addEventListener("click", draw);

updateReference();
draw();
