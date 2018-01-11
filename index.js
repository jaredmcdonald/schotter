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

//
// function updateReference() {
//   document.querySelector("#controls a").href = references[select.value];
// }

class Controls extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: "gridDistortion",
      teardown: () => {},
      UI: null
    };
  }

  drawSelectionToCanvas() {
    this.state.teardown();
    const { teardown, UI } = dispatcher[this.state.selected]();
    this.setState({ teardown, UI });
  }

  componentDidMount() {
    this.drawSelectionToCanvas();
  }

  render() {
    const { UI } = this.state;
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
      <button onClick={() => this.drawSelectionToCanvas()}>regenerate</button>,
      <a href="#" target="_blank">
        ?
      </a>,
      UI && <UI />
    ];
  }
}

reactDom.render(<Controls />, document.getElementById("controls"));
