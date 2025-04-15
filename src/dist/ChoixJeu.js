"use strict";
exports.__esModule = true;
var react_1 = require("react");
var react_native_1 = require("react-native");
var ChoixJeu = function (_a) {
    var navigation = _a.navigation;
    return (react_1["default"].createElement(react_native_1.View, { style: styles.container },
        react_1["default"].createElement(react_native_1.Text, { style: styles.title }, "Choisissez un jeu"),
        react_1["default"].createElement(react_native_1.View, { style: styles.cardContainer },
            react_1["default"].createElement(react_native_1.TouchableOpacity, { style: styles.card, onPress: function () { return navigation.navigate("ActionVerite"); } },
                react_1["default"].createElement(react_native_1.Image, { source: require("./image/av.jpg"), style: styles.cardImage }),
                react_1["default"].createElement(react_native_1.Text, { style: styles.cardText }, "ACTION V\u00C9RIT\u00C9")),
            react_1["default"].createElement(react_native_1.TouchableOpacity, { style: styles.card, onPress: function () { return navigation.navigate("NiveauMulti"); } },
                react_1["default"].createElement(react_native_1.Image, { source: require("./image/quiz.jpg"), style: styles.cardImage }),
                react_1["default"].createElement(react_native_1.Text, { style: styles.cardText }, "QUIZ")))));
};
// 🔹 **Styles ajustés pour un meilleur équilibre**
var styles = react_native_1.StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFD544",
        alignItems: "center",
        paddingTop: 50
    },
    title: {
        fontSize: 28,
        fontWeight: "bold",
        color: "#333",
        textAlign: "center",
        marginBottom: 30,
        backgroundColor: "white",
        paddingVertical: 12,
        paddingHorizontal: 35,
        borderRadius: 10,
        shadowColor: "#000",
        shadowOpacity: 0.2,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
        elevation: 3,
        width: "90%"
    },
    cardContainer: {
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
        gap: 25
    },
    card: {
        width: "90%",
        height: 270,
        backgroundColor: "#5D4037",
        borderRadius: 15,
        shadowColor: "#000",
        shadowOpacity: 0.3,
        shadowOffset: { width: 0, height: 3 },
        shadowRadius: 5,
        elevation: 5,
        alignItems: "center",
        justifyContent: "flex-end"
    },
    cardImage: {
        width: "100%",
        height: "80%",
        borderTopLeftRadius: 100,
        borderTopRightRadius: 15
    },
    cardText: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#FFFFFF",
        paddingVertical: 12,
        textAlign: "center"
    }
});
exports["default"] = ChoixJeu;
