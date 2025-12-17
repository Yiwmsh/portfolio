import { ThemeContext } from "@chrisellis/react-carpentry";
import React from "react";
import { Outlet } from "react-router-dom";
import { LightTheme } from "../consts/theme";
import { Navbar } from "./SiteNavbar";

export const SiteOutlet: React.FC = () => {
  return (
    <ThemeContext theme={LightTheme}>
      <Navbar />
      <Outlet />
    </ThemeContext>
  );
};
