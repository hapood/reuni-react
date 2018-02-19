import { storeObserver } from "reuni-react";
import mount from "../mount";
import SimpleAdd from "./SimpleAdd";
import AddStore from "./AddStore";

export default mount(SimpleAdd, storeObserver(({ addStore }) => ({ addStore })))
  .addStore("addStore", AddStore)
  .toHOC();
