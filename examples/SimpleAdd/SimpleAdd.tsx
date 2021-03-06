import * as React from "react";
import { Props } from "./types";

export default class SimpleAdd extends React.Component<Props> {
  render() {
    let { addStore } = this.props;
    return (
      <div
        style={{
          width: "20rem",
          padding: "1rem",
          margin: "0.5rem",
          border: "1px solid"
        }}
      >
        <div>{addStore.cnt}</div>
        <button onClick={addStore.addOne}>Add One</button>
        <button style={{ marginLeft: "0.5rem" }} onClick={addStore.addOneAsync}>
          Add One With Delay
        </button>
      </div>
    );
  }
}
