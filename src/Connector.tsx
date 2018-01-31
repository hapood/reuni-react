import * as React from "react";
import * as PropTypes from "prop-types";
import { StoreObserver, Reuni, NodeAPI } from "reuni";
import { shallowEqual } from "./utils";

export type Props<P extends PP, PP extends string> = {
  Component: React.ComponentType<P>;
  childProps: P;
  storeObserver: StoreObserver<PP>;
  nodeName?: string | null | undefined;
  thread: symbol;
  stores: [string, new () => any, StoreObserver<any> | null | undefined][];
  id?: string | null | undefined;
};

export type State = {
  childProps: any;
  isValid: boolean;
  entityDict: any;
};

export default class Connector extends React.Component<Props<any, any>, State> {
  private _node: NodeAPI | null | undefined;

  static contextTypes = {
    reuni: PropTypes.any
  };

  static childContextTypes = {
    reuni: PropTypes.object.isRequired,
    reuniNode: PropTypes.string.isRequired
  };

  constructor(props: Props<any, any>) {
    super(props);
    this.state = {
      childProps: {},
      isValid: false,
      entityDict: null
    };
  }

  componentWillMount() {
    this.remountNode(this.props, this.context);
  }

  remountNode = (props: Props<any, any>, context: any) => {
    let { reuni, reuniNode }: { reuni: Reuni; reuniNode: string } = context;
    let { thread, nodeName, id, storeObserver, stores } = props;
    let node = reuni.mountNode({
      id,
      thread,
      name: nodeName,
      parentId: reuniNode
    });
    stores.forEach(([storeName, Store, storeOb]) => {
      node.addStore(storeName, Store, storeOb);
    });
    node.observe(storeObserver, (isValid, entityDict) => {
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
    this._node = node;
  };

  componentWillReceiveProps(nextProps: Props<any, any>, nextContext: any) {
    let { id, stores, thread, storeObserver, nodeName, Component } = this.props;
    if (
      storeObserver !== nextProps.storeObserver ||
      stores !== nextProps.stores ||
      thread !== nextProps.thread ||
      id !== nextProps.id ||
      nodeName !== nextProps.nodeName
    ) {
      let node = this._node as NodeAPI;
      this._node = null;
      let {
        reuni,
        reuniNode
      }: { reuni: Reuni; reuniNode: string } = nextContext;
      reuni.unmoutNode(node.getId());
      this.remountNode(nextProps, nextContext);
    }
  }

  componentWillUnmount() {
    let {
      reuni,
      reuniNode
    }: { reuni: Reuni; reuniNode: string } = this.context;
    reuni.unmoutNode(reuniNode);
  }

  shouldComponentUpdate(
    nextProps: Props<any, any>,
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
    return <Component {...Object.assign({}, entityDict, childProps)} />;
  }
}
