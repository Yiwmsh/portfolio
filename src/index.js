import styled from "@emotion/styled";
import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "react-query";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";
import { routes } from "./routing/router";

const root = ReactDOM.createRoot(document.getElementById("root"));

const queryClient = new QueryClient();

const FontContext = styled.div`
  font-family: "Arima", cursive;
  font-size: 14px;
`;

root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <FontContext>
        <RouterProvider router={createBrowserRouter(routes)} />
      </FontContext>
    </QueryClientProvider>
  </React.StrictMode>
);

reportWebVitals();
