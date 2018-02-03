import { StoreObserver } from "reuni";
import * as React from "react";
import Connector from "./Connector";
import { Omit } from "./types";

export class Mount<P extends PP, PP> {
  _Component: React.ComponentType<P>;
  _name: string | null | undefined;
  _stores: [string, new () => any, StoreObserver<any> | null | undefined][];
  _storeObserver: StoreObserver<any>;
  _thread: symbol;

  constructor(
    Component: React.ComponentType<P>,
    thread: symbol,
    storeObserver: StoreObserver<PP>
  ) {
    this._Component = Component;
    this._stores = [];
    this._storeObserver = storeObserver;
    this._thread = thread;
  }

  setName(name: string) {
    this._name = name;
  }

  setThread(thread: symbol) {
    this._thread = thread;
  }

  addStore(
    storeName: string,
    RawStore: new () => any,
    storeOb?: StoreObserver<any>
  ) {
    this._stores.push([storeName, RawStore, storeOb]);
    return this;
  }

  toHOC(): React.StatelessComponent<Omit<P, keyof PP>> {
    return (props: any) =>
      React.createElement(Connector, {
        Component: this._Component,
        childProps: props,
        storeObserver: this._storeObserver,
        nodeName: this._name,
        stores: this._stores,
        thread: this._thread
      });
  }
}

export default function createMount(thread: symbol = Symbol("thread")) {
  return <P extends PP, PP>(
    Component: React.ComponentType<P>,
    storeObserver: StoreObserver<PP>
  ) => new Mount<P, PP>(Component, thread, storeObserver);
}
