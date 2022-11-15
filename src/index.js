import { ThemeContext } from "@yiwmsh/react-carpentry";
import React from "react";
import ReactDOM from "react-dom/client";
import reportWebVitals from "./reportWebVitals";
import { LightTheme } from "./consts/index.ts";
import { Home } from "./pages/index.ts";
import dotenv from "dotenv";

dotenv.config();

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <ThemeContext theme={LightTheme}>
      <Home />
    </ThemeContext>
  </React.StrictMode>
);

reportWebVitals();
