import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from "reuni-react";
import Frame from "./Frame";

(document as any).getElementById("loadingsStyle").remove();
(document as any).getElementById("app").className = "";

let appDom = document.getElementById("app");

let render = (FrameComponent: typeof Frame) => {
  let AProvider = Provider as any;
  ReactDOM.render(
    <Provider>
      <FrameComponent />
    </Provider>,
    appDom
  );
};

let version = 0;
render(Frame);
if ((module as any).hot) {
  (module as any).hot.accept("./Frame", () => {
    let UpdatedFrame = require("./Frame").default;
    render(UpdatedFrame);
  });
}
