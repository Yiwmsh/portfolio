import { ThemeContext } from "@chrisellis/react-carpentry";
import React from "react";
import { Outlet } from "react-router-dom";
import { LightTheme } from "../../consts/theme";
import { Navbar } from "./BlogNavbar";

export const BlogOutlet: React.FC = () => {
  return (
    <ThemeContext theme={LightTheme}>
      <Navbar />
      <Outlet />
    </ThemeContext>
  );
};
