import { ThemeContext } from "@chrisellis/react-carpentry";
import React from "react";
import ReactDOM from "react-dom/client";
import reportWebVitals from "./reportWebVitals";
import { LightTheme } from "./consts/index";
import { routs } from "./router";
import { Router, Outlet, ReactLocation } from "@tanstack/react-location";
import { Site } from "./pages/site";

const root = ReactDOM.createRoot(document.getElementById("root"));

const location = new ReactLocation();

root.render(
  <React.StrictMode>
    <ThemeContext theme={LightTheme}>
      <Site>
        <Router routes={routs} location={location}>
          <Outlet />
        </Router>
      </Site>
    </ThemeContext>
  </React.StrictMode>
);

reportWebVitals();
