import * as React from "react";
import { storeObserver } from "reuni-react";
import mount from "../mount";
import { Props } from "./types";
import AddStore from "./AddStore";

class AddCard extends React.Component<Props> {
  render() {
    let { addStore, presetNum } = this.props;
    return (
      <div
        style={{
          width: "20rem",
          padding: "1rem",
          marginBottom: "0.5rem",
          border: "1px solid"
        }}
      >
        <div>{addStore.cnt}</div>
        <button onClick={() => addStore.add(presetNum)}>
          {`Add ${presetNum}`}
        </button>
      </div>
    );
  }
}

export default mount(AddCard, storeObserver(({ addStore }) => ({ addStore })))
  .addStore("addStore", AddStore)
  .toHOC();
