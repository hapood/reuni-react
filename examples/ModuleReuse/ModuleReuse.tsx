import * as React from "react";
import AddCard from "./AddCard";

export default class ModuleReuse extends React.Component<{}, { cardCnt }> {
  constructor(props) {
    super(props);
    this.state = { cardCnt: 1 };
  }

  render() {
    let { cardCnt } = this.state;
    return (
      <div style={{ width: "20rem", padding: "1rem" }}>
        <button onClick={() => this.setState({ cardCnt: cardCnt + 1 })}>
          Add Card
        </button>
        <div style={{ marginTop: "0.5rem" }}>
          {Array(cardCnt)
            .fill(null)
            .map((_, i) => <AddCard key={i} presetNum={i + 1} />)}
        </div>
      </div>
    );
  }
}
