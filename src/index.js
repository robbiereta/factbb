import React from "react";
import ReactDOM from "react-dom";
import { useForm } from "react-hook-form";
import Navbar from "./header.js";
import Fact from "./form_fact.js";
import "mdb-react-ui-kit/dist/css/mdb.min.css";
function App() {
  return (
    <div>
      <Navbar />
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
