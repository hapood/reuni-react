import * as React from "react";
import * as PropTypes from "prop-types";
import { Reuni, createReuni } from "reuni";

export type Props = {};

export default class Provider extends React.Component<Props, { reuni: Reuni }> {
  static contextTypes = {
    reuni: PropTypes.object
  };

  static childContextTypes = {
    reuni: PropTypes.object.isRequired
  };

  constructor(props: Props) {
    super(props);
    this.state = { reuni: createReuni() };
  }

  render() {
    return React.Children.only(this.props.children);
  }

  getChildContext() {
    return {
      reuni: this.state.reuni
    };
  }
}
