import * as React from "react";
import * as PropTypes from "prop-types";
import { Reuni } from "reuni";

export type Props = { reuni: Reuni };

export default class Provider extends React.Component<Props> {
  static contextTypes = {
    reuni: PropTypes.object
  };

  static childContextTypes = {
    reuni: PropTypes.object
  };

  render() {
    return React.Children.only(this.props.children);
  }

  getChildContext() {
    return {
      reuni: this.props.reuni
    };
  }
}
