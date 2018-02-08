import reactDom from "react-dom";
import React, { Component } from "react";
import schotter from "./schotter";
import randomPolygon from "./randomPolygon";
import gridDistortion from "./gridDistortion";
import nestedSquares from "./nestedSquares";

const dispatcher = {
  schotter,
  randomPolygon,
  gridDistortion,
  nestedSquares
};

class Controls extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: "schotter",
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
      <button onClick={() => this.drawSelectionToCanvas()}>regenerate</button>
    ];
  }
}

reactDom.render(<Controls />, document.getElementById("controls"));
