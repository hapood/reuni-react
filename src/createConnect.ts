import { StoreObserver } from "reuni";
import * as React from "react";
import Connect from "./Connect";

export default function createConnect(thread: symbol = Symbol("thread")) {
  return <P>(
    Component: React.ComponentType<P>,
    storeObserver: StoreObserver,
    nodeName?: string
  ) => {
    (props: P) =>
      React.createElement(Connect, {
        Component,
        childProps: props,
        storeObserver,
        nodeName,
        thread
      });
  };
}
