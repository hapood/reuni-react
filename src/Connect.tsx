import * as React from "react";
import * as PropTypes from "prop-types";
import { StoreObserver, Reuni } from "reuni";
import { shallowEqual } from "./utils";

export type Props<P> = {
  Component: React.ComponentType<P>;
  childProps: P;
  storeObserver: StoreObserver;
  nodeName?: string | null | undefined;
  thread: symbol;
  id?: string | null | undefined;
};

export type State = { childProps: any; isValid: boolean; entityDict: any };

export default class Connect extends React.Component<Props<any>, State> {
  static contextTypes = {
    reuni: PropTypes.any
  };

  static childContextTypes = {
    reuni: PropTypes.object.isRequired,
    reuniNode: PropTypes.string.isRequired
  };

  constructor(props: Props<any>) {
    super(props);
    this.state = { childProps: {}, isValid: false, entityDict: null };
  }

  componentWillMount() {
    let {
      reuni,
      reuniNode
    }: { reuni: Reuni; reuniNode: string } = this.context;
    let { thread, nodeName, id, storeObserver } = this.props;
    reuni
      .mountNode({
        id,
        thread,
        name: nodeName,
        parentId: reuniNode
      })
      .observe(storeObserver, (isValid, entityDict) => {
        if (isValid !== false) {
          this.setState({
            isValid: true,
            entityDict
          });
        } else {
          this.setState({
            isValid: false
          });
        }
      });
  }

  shouldComponentUpdate(
    nextProps: Props<any>,
    nextState: State,
    nextContext: any
  ) {
    if (this.state !== nextState) {
      return true;
    }
    if (shallowEqual(this.props, nextProps) !== false) {
      return true;
    }
    if (shallowEqual(this.context, nextContext.context) !== false) {
      return true;
    }
    return false;
  }

  render() {
    let { isValid, entityDict } = this.state;
    if (isValid !== true) return null;
    let { Component, childProps } = this.props;
    return <Component props={Object.assign({}, entityDict, childProps)} />;
  }
}
