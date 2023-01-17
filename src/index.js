import styled from "@emotion/styled";
import { Outlet, ReactLocation, Router } from "@tanstack/react-location";
import React from "react";
import ReactDOM from "react-dom/client";
import reportWebVitals from "./reportWebVitals";
import { routs } from "./router";

const root = ReactDOM.createRoot(document.getElementById("root"));

const location = new ReactLocation();

const FontContext = styled.div`
  font-family: "Arima", cursive;
  font-size: 14px;
`;

root.render(
  <React.StrictMode>
    <FontContext>
      <Router
        routes={routs}
        location={location}
      >
        <Outlet />
      </Router>
    </FontContext>
  </React.StrictMode>
);

reportWebVitals();
