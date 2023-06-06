import styled from "@emotion/styled";
import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";
import { routes } from "./router";

const root = ReactDOM.createRoot(document.getElementById("root"));

const FontContext = styled.div`
  font-family: "Arima", cursive;
  font-size: 14px;
`;

root.render(
  <React.StrictMode>
    <FontContext>
      <RouterProvider router={createBrowserRouter(routes)} />
    </FontContext>
  </React.StrictMode>
);

reportWebVitals();
