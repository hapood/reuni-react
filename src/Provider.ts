import * as React from "react";
import * as PropTypes from "prop-types";
import { Reuni, createReuni } from "reuni";

export type Props = {};

export default class Provider extends React.Component<Props, { reuni: Reuni }> {
  static contextTypes = {
    reuniInfo: PropTypes.any
  };

  static childContextTypes = {
    reuniInfo: PropTypes.any
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
      reuniInfo: {
        reuni: this.state.reuni,
        isValid: true,
        parentId: null
      }
    };
  }
}
