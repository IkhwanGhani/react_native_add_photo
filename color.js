//rgb => 'rgb(0, 0, 0)'
//rgba => 'rgb(0, 0, 0, 1.0)'

import { Platform } from "react-native";
const platform = Platform.OS;

export const DEFAULT_COLOR = {
    transparent: "transparent",
    background: "#fff",
    text: "#000",
    primary: platform === "ios" ? "#6200ee" : "#6200ee",
    secondary: platform === "ios" ? "#03dac6" : "#03dac6",
    success: platform === "ios" ? "#5cb85c" : "#5cb85c",
    error: platform === "ios" ? "#b00020" : "#b00020",
    dark: platform === "ios" ? "#000" : "#000",
    light: platform === "ios" ? "#f4f4f4" : "#f4f4f4",
}