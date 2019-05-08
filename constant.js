import { Platform, Dimensions } from "react-native";
const platform = Platform.OS;

export const DEVICE_HEIGHT = Dimensions.get("window").height;
export const DEVICE_WIDTH = Dimensions.get("window").width;

export const FONT_WEIGHT = {
    Thin: "100",
    UltraLight: "200",  
    Light: "300",
    Regular: "400",
    Medium: "500",
    Semibold: "600",
    Bold: "700",
    Heavy: "800",
    Black: "900"
}