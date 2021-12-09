import React from "react";
import ReactDOM from "react-dom";
import "antd/dist/antd.css";
import VirtualList from "./virtual-list";
import VirtualListAutoHeight from "./virtual-list-autoheight";

ReactDOM.render(
  <div className="App">
    <VirtualList />
    <VirtualListAutoHeight />
  </div>,
  document.getElementById("root")
);
