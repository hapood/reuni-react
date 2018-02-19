import * as React from "react";
import * as renderer from "react-test-renderer";
import { storeObserver, Provider, createMount } from "src";
import TestStore from "./TestStore";
import TestComponent from "./TestComponent";

it("works with store observing", done => {
  let mount = createMount();
  let TestHOC = mount(
    TestComponent,
    storeObserver(({ testStore }) => ({
      testStore
    }))
  )
    .addStore("testStore", TestStore)
    .toHOC();
  let component = renderer.create(
    <Provider>
      <TestHOC
        onCntAdded={() => {
          let tree = component.toJSON();
          expect(tree).toMatchSnapshot();
          done();
        }}
      />
    </Provider>
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
