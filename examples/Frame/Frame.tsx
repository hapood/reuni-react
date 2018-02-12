import * as React from "react";

import ModuleReUse from "../ModuleReUse";
import PassDownState from "../passDownState";
import { Props } from "./types";

const linkStyle = {
  textDecoration: "underline",
  color: "blue",
  cursor: "pointer"
};

class Frame extends React.Component<Props, { page: string }> {
  componentWillMount() {
    this.setState({
      page: "emptyPage"
    });
  }

  render() {
    let { cnt, addCnt, clearCnt } = this.props;
    return (
      <div>
        <div>
          <ul>
            <li>
              <a
                style={linkStyle}
                onClick={() =>
                  this.setState({ page: "passDownStateAndActions" })
                }
              >
                Pass Down State And Actions
              </a>
            </li>
            <li>
              <a
                style={linkStyle}
                onClick={() => this.setState({ page: "moduleReUse" })}
              >
                Module Re-Use
              </a>
            </li>
          </ul>
          <hr />
          <div>
            <div style={{ marginTop: "1rem" }}>
              {this.state.page === "passDownStateAndActions" ? (
                <PassDownState />
              ) : this.state.page === "moduleReUse" ? (
                <ModuleReUse />
              ) : null}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
