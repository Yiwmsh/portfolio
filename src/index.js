import { ThemeContext } from "@chrisellis/react-carpentry";
import React from "react";
import ReactDOM from "react-dom/client";
import reportWebVitals from "./reportWebVitals";
import { LightTheme } from "./consts/index";
import { routs } from "./router";
import { Router, Outlet, ReactLocation } from "@tanstack/react-location";
import { Site } from "./pages/site";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const root = ReactDOM.createRoot(document.getElementById("root"));

const firebaseConfig = {
  apiKey: "AIzaSyDXX6WLI8oN-Hn43xaschu-UmkecWWDVhY",

  authDomain: "portfolio-a1fa7.firebaseapp.com",

  projectId: "portfolio-a1fa7",

  storageBucket: "portfolio-a1fa7.appspot.com",

  messagingSenderId: "640185037414",

  appId: "1:640185037414:web:7ebe892c40a10813f7f3a7",

  measurementId: "G-8GFQW9P3F4",
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

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
