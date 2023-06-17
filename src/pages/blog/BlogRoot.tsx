import { ThemeContext } from "@chrisellis/react-carpentry";
import React from "react";
import { Outlet } from "react-router-dom";
import { LightTheme } from "../../consts";
import { Navbar } from "./Navbar";

export const BlogRoot: React.FC = () => {
  return (
    <ThemeContext theme={LightTheme}>
      <Navbar />
      <Outlet />
    </ThemeContext>
  );
};
