import { ThemeContext } from "@chrisellis/react-carpentry";
import { Outlet } from "react-router-dom";
import { Navbar } from "../../components/Navbar";
import { LightTheme } from "../../consts/theme";

export const GuitarPageOutlet: React.FC = () => {
  return (
    <ThemeContext theme={LightTheme}>
      <Navbar />
      <Outlet />
    </ThemeContext>
  );
};
