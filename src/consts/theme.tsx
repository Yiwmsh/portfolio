import { SemanticColors, Theme } from "@chrisellis/react-carpentry";

export const defaultBoxShadow = `0.125em 0.25em 1.25em var(${SemanticColors.shadow});`;

export const TransparentTheme = new Theme({
  background: "#FFFFFF",
  foreground: "rgba(255, 255, 255, 0.1)",
  shadow: "rgba(0, 0, 0, 0.15)",
  primary: "#b05251",
  primaryActive: "#c44a3d",
  primaryDisabled: "#683939",
  secondary: "#87CEEB",
  secondaryActive: "#99d5ee",
  secondaryDisabled: "#3d5d6a",
  text: "#FFFFFF",
  altText: "#FFFFFF",
  error: "#ED6767",
});

export const LightTheme = new Theme({
  background: "#FFFFFF",
  shadow: "rgba(0, 0, 0, 0.15)",
  primary: "#b05251",
  primaryActive: "#c44a3d",
  primaryDisabled: "#683939",
  secondary: "#0047AB",
  secondaryActive: "#0047d9",
  secondaryDisabled: "#002e6f",
  text: "#000000",
  altText: "#FFFFFF",
  error: "#ED6767",
});

export const DarkTheme = new Theme({
  background: "#2B2B2B",
  midground: "#363636",
  foreground: "#404040",
  shadow: "rgba(0, 0, 0, 0.08)",
  primary: "#b05251",
  primaryActive: "#c44a3d",
  primaryDisabled: "#683939",
  secondary: "#0047AB",
  secondaryActive: "#0047d9",
  secondaryDisabled: "#002e6f",
  text: "#FFFFFF",
  altText: "#FFFFFF",
  error: "#ED6767",
});
