# reuni-react &middot; [![npm version](https://img.shields.io/npm/v/reuni-react.svg?style=flat-square)](https://www.npmjs.com/package/reuni-react) [![Coverage Status](https://codecov.io/gh/hapood/reuni-react/branch/master/graphs/badge.svg)](https://codecov.io/gh/hapood/reuni-react) [![CI Status](https://circleci.com/gh/hapood/reuni-react/tree/master.svg?style=shield)](https://circleci.com/gh/hapood/reuni-react)

React bindings for Reuni

## Install

```
npm install reuni-react --save
```

## [Example](https://hapood.github.io/reuni-react/)

A complete example is under `/example` directory.
Online example can be found here: [Here](https://hapood.github.io/reuni-react/).

## Quick Start

1. Design a suitable store for react component.

```typescript
import { value, task, delay } from "reuni-react";

export default class ExampleStore {
  @value name = "test";
  @value cnt = 0;

  @task
  add(num: number) {
    this.cnt += num;
  }

  @task.async
  async addAsync(num: number) {
    await delay(100);
    this.cnt += num;
  }
}
```

2. Using this store in react component.

```typescript
import * as React from "react";
import ExampleStore from "./ExampleStore";

export type Props = {
  exampleStore: ExampleStore;
};

export default class ExampleComponent extends React.Component<Props> {
  render() {
    let { exampleStore } = this.props;
    return (
      <div>
        <div>{exampleStore.cnt}</div>
        <button onClick={()=>exampleStore.add(1)}>Add</button>
        <button onClick={()=>exampleStore.addAsync(1)}>Add Async</button>
      <div>
    );
  }
}
```

2. Export react component with store as HOC.

```javascript
import { storeObserver, Provider, createMount } from "src";
import ExampleStore from "./ExampleStore";
import ExampleComponent from "./ExampleComponent";

const HOC = mount(
    ExampleComponent,
    storeObserver(({ exampleStore }) => ({
      exampleStore
    }))
  )
    .addStore("exampleStore", ExampleStore)
    .toHOC();

export default HOC
```