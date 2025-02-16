"use strict";
exports.__esModule = true;
var react_1 = require("react");
var react_native_svg_1 = require("react-native-svg");
var react_native_1 = require("react-native");
var BackgroundPattern = function () {
    return (react_1["default"].createElement(react_native_1.View, { style: styles.container },
        react_1["default"].createElement(react_native_svg_1["default"], { height: "100%", width: "100%", viewBox: "0 0 400 800" },
            react_1["default"].createElement(react_native_svg_1.Rect, { x: "0", y: "0", width: "400", height: "800", fill: "#FFD544" }),
            react_1["default"].createElement(react_native_svg_1.Polygon, { points: "0,100 200,0 400,200 400,400", fill: "#E6B800", opacity: "0.6" }),
            react_1["default"].createElement(react_native_svg_1.Polygon, { points: "0,300 150,100 300,400 0,500", fill: "#E6B800", opacity: "0.5" }),
            react_1["default"].createElement(react_native_svg_1.Polygon, { points: "100,600 300,400 400,700 200,800", fill: "#E6B800", opacity: "0.7" }))));
};
var styles = react_native_1.StyleSheet.create({
    container: {
        position: 'absolute',
        width: '100%',
        height: '100%'
    }
});
exports["default"] = BackgroundPattern;
