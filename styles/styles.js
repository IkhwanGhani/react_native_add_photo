import { StyleSheet } from "react-native";
import { FONT_WEIGHT } from "../constant";
import { DEFAULT_COLOR } from "../color";

export default StyleSheet.create({
    //default
    text:{fontFamily: "Roboto"},
    container: {flex: 1,backgroundColor: '#eee',},
    content: {flex: 1,padding: 10,backgroundColor: '#fff',marginBottom: 5,borderColor: '#ddd',borderWidth: 1},
    box: {flex: 1,padding: 5,backgroundColor: '#fff',},
    //row
    rowContainer: {flex: 1,flexDirection: 'row',backgroundColor: '#eee',},
    rowContent: {flex: 1,flexDirection: 'row',padding: 10,backgroundColor: '#fff',marginBottom: 5,borderColor: '#ddd',borderWidth: 1},
    rowBox: {flex: 1,flexDirection: 'row',padding: 5,backgroundColor: '#fff',},
    //column
    columnContainer: {flex: 1,flexDirection: 'row',backgroundColor: '#eee',},
    columnContent: {flex: 1,flexDirection: 'row',padding: 10,backgroundColor: '#fff',marginBottom: 5,borderColor: '#ddd',borderWidth: 1},
    columnBox: {flex: 1,flexDirection: 'row',padding: 5,backgroundColor: '#fff',},
    //top
    topLeft: {justifyContent: 'flex-start',alignItems: 'flex-start'},
    topCenter: {justifyContent: 'flex-start',alignItems: 'center'},
    topRight: {justifyContent: 'flex-start',alignItems: 'flex-end'},
    //Middle
    middleLeft: {justifyContent: 'center',alignItems: 'flex-start'},
    middleCenter: {justifyContent: 'center',alignItems: 'center'},
    middleRight: {justifyContent: 'center',alignItems: 'flex-end'},
    //Bottom
    bottomLeft: {justifyContent: 'flex-end',alignItems: 'flex-start'},
    bottomCenter: {justifyContent: 'flex-end',alignItems: 'center'},
    bottomRight: {justifyContent: 'flex-end',alignItems: 'flex-end'},

    //Font defined in the Material Design Guidelines
    display4: {fontWeight: FONT_WEIGHT.Light,fontSize: 112},
    display3: {fontWeight: FONT_WEIGHT.Regular,fontSize: 56},
    display2: {fontWeight: FONT_WEIGHT.Regular,fontSize: 45},
    display1: {fontWeight: FONT_WEIGHT.Regular,fontSize: 34},
    headline: {fontWeight: FONT_WEIGHT.Regular,fontSize: 24},
    title: {fontWeight: FONT_WEIGHT.Medium,fontSize: 20},
    subheading: {fontWeight: FONT_WEIGHT.Regular,fontSize: 16},
    body2: {fontWeight: FONT_WEIGHT.Medium,fontSize: 14},
    body1: {fontWeight: FONT_WEIGHT.Regular,fontSize: 14},
    caption: {fontWeight: FONT_WEIGHT.Regular,fontSize: 12},
    button: {fontWeight: FONT_WEIGHT.Medium,fontSize: 14},

    closeBtn: {position: 'absolute',top: 10,right: 10,zIndex: 2,width: 40,height: 40,borderRadius: 20,backgroundColor: 'rgba(0, 0, 0, 0.3)'},
});