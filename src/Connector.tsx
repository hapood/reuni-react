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
  reuni: Reuni | null | undefined;
  nodeId: string | null | undefined;
};

export type Context = {
  reuniInfo:
    | {
        isValid: boolean;
        reuni: Reuni;
        parentId: string;
      }
    | null
    | undefined;
};

export default class Connector extends React.Component<Props<any, any>, State> {
  static contextTypes = {
    reuniInfo: PropTypes.any,
    router: PropTypes.any
  };

  static childContextTypes = {
    reuniInfo: PropTypes.any
  };

  constructor(props: Props<any, any>) {
    super(props);
    this.state = {
      childProps: {},
      isValid: false,
      entityDict: null,
      reuni: null,
      nodeId: null
    };
  }

  componentWillMount() {
    let { reuniInfo }: Context = this.context;
    if (reuniInfo != null) {
      let { isValid, reuni, parentId } = reuniInfo;
      if (isValid !== false) {
        this.mountReuniNode(this.props, reuni, parentId);
      }
    } else {
      throw new Error("Node must under Provider Component.");
    }
  }

  mountReuniNode = (
    props: Props<any, any>,
    reuni: Reuni,
    parentId: string | null | undefined
  ) => {
    let { thread, nodeName, id, storeObserver, stores } = props;
    let node = reuni.mountNode({
      id,
      thread,
      name: nodeName,
      parentId
    });
    this.setState({ nodeId: node.getId() }, () => {
      stores.forEach(([storeName, Store, storeOb]) => {
        node.addStore(storeName, Store, storeOb);
      });
      node.observe(storeObserver, (isValid, entityDict) => {
        if (isValid !== false) {
          this.setState({
            isValid: true,
            reuni,
            entityDict
          });
        } else {
          this.setState({
            isValid: false
          });
        }
      });
    });
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
      let { reuniInfo }: Context = nextContext;
      if (reuniInfo != null) {
        let { isValid, reuni, parentId } = reuniInfo;
        if (isValid !== false) {
          let { nodeId } = this.state;
          if (nodeId != null) {
            reuni.unmoutNode(nodeId);
            this.setState({ isValid: false, nodeId: null }, () => {
              this.mountReuniNode(nextProps, reuni, parentId);
            });
          }
        }
      } else {
        this.setState({
          isValid: false
        });
      }
    }
  }

  componentWillUnmount() {
    let { reuniInfo }: Context = this.context;
    let { reuni }: { reuni: Reuni } = reuniInfo as any;
    if (this.state.nodeId != null) {
      reuni.unmoutNode(this.state.nodeId);
    }
  }

  getChildContext() {
    return {
      reuniInfo: {
        isValid: this.state.isValid,
        reuni: this.state.reuni,
        parentId: this.state.nodeId
      }
    };
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
    if (shallowEqual(this.context, nextContext) !== false) {
      return true;
    }
    if (
      this.context.router != null &&
      this.context.router.route.location !== nextContext.router.route.location
    ) {
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
