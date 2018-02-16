import * as React from "react";
import SimpleAdd from "../SimpleAdd";
import ModuleReuse from "../ModuleReuse";
import { Props } from "./types";

const linkStyle = {
  textDecoration: "underline",
  color: "blue",
  cursor: "pointer"
};

export default class Frame extends React.Component<Props, { page: string }> {
  componentWillMount() {
    this.setState({
      page: "emptyPage"
    });
  }

  render() {
    return (
      <div>
        <div>
          <ul>
            <li>
              <a
                style={linkStyle}
                onClick={() => this.setState({ page: "simpleAdd" })}
              >
                Simple Add
              </a>
            </li>
            <li>
              <a
                style={linkStyle}
                onClick={() => this.setState({ page: "moduleReuse" })}
              >
                Module Reuse
              </a>
            </li>
          </ul>
          <hr />
          <div>
            <div style={{ marginTop: "1rem" }}>
              {this.state.page === "simpleAdd" ? (
                <SimpleAdd />
              ) : this.state.page === "moduleReuse" ? (
                <ModuleReuse />
              ) : null}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
