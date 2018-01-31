import * as React from "react";
import TestStore from "./TestStore";

export type Props = {
  testStore: TestStore;
  onCntAdded: () => void;
};

export default class TestComponent extends React.Component<Props> {
  componentDidMount() {
    this.props.testStore.addAsync(10);
  }

  componentDidUpdate() {
    let { onCntAdded, testStore } = this.props;
    if (testStore.cnt === 10) {
      onCntAdded();
    }
  }

  render() {
    let { testStore } = this.props;
    return <div>{testStore.cnt}</div>;
  }
}
