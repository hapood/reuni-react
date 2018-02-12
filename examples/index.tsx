import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from "reuni-react";
import Frame from "./Frame";

(document as any).getElementById("loadingsStyle").remove();
(document as any).getElementById("app").className = "";

let appDom = document.getElementById("app");

let render = (FrameComponent: React.ComponentType, version: number) => {
  let AProvider = Provider as any;
  ReactDOM.render(
    <Provider>
      <FrameComponent version={version} />
    </Provider>,
    appDom
  );
};

let version = 0;
render(Frame, version);
if ((module as any).hot) {
  (module as any).hot.accept("./frame/Frame", () => {
    let UpdatedFrame = require("./frame/Frame").default;
    render(UpdatedFrame, ++version);
  });
}
