import { useState } from "react";
import Header from "./component/Header";
import Editor from "./component/Editor";
import List from "./component/List";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Header />
      <Editor />
      <List />
    </div>
  );
}

export default App;
