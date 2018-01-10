import reactDom from "react-dom";
import React, { Component } from "react";
import schotter from "./schotter";
import randomPolygon from "./randomPolygon";
import gridDistortion from "./gridDistortion";

const dispatcher = {
  schotter,
  randomPolygon,
  gridDistortion
};
//
// const references = {
//   schotter:
//     "http://collections.vam.ac.uk/item/O221321/schotter-print-nees-georg/",
//   randomPolygon:
//     "http://collections.vam.ac.uk/item/O239558/random-polygons-photograph-nake-frieder/",
//   gridDistortion: ""
// };

// const select = document.querySelector("select");

// let teardownFn = () => {};
function draw() {
  teardownFn(); // teardown previous
  setupDispatcher[select.value]();
}
//
// function updateReference() {
//   document.querySelector("#controls a").href = references[select.value];
// }

// document.querySelector("button").addEventListener("click", () => {
//   draw();
// });
//
// updateTeardown();
// updateReference();
// draw();

class Controls extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: "gridDistortion",
      teardown: () => {}
    };
  }

  drawSelectionToCanvas() {
    this.state.teardown();
    const { teardown } = dispatcher[this.state.selected]();
    this.setState({ teardown });
  }

  componentDidMount() {
    this.drawSelectionToCanvas();
  }

  render() {
    return [
      <select
        onChange={({ target }) => {
          this.setState({ selected: target.value }, () =>
            this.drawSelectionToCanvas()
          );
        }}
        value={this.state.selected}
      >
        {Object.keys(dispatcher).map(key => (
          <option key={key} value={key}>
            {key}
          </option>
        ))}
      </select>,
      <button>regenerate</button>,
      <a href="#" target="_blank">
        ?
      </a>
    ];
  }
}

reactDom.render(<Controls />, document.getElementById("controls"));
