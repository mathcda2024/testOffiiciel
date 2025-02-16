"use strict";
exports.__esModule = true;
var react_1 = require("react");
var react_native_1 = require("react-native");
var Home = function (_a) {
    var navigation = _a.navigation;
    return (react_1["default"].createElement(react_native_1.View, { style: styles.container },
        react_1["default"].createElement(react_native_1.View, { style: styles.container },
            react_1["default"].createElement(react_native_1.Image, { source: require('./logoHome.png'), style: styles.image })),
        react_1["default"].createElement(react_native_1.TouchableOpacity, { style: styles.button, onPress: function () { return navigation.navigate('NiveauSolo'); } },
            react_1["default"].createElement(react_native_1.Text, { style: styles.buttonText }, "SOLO")),
        react_1["default"].createElement(react_native_1.TouchableOpacity, { style: styles.button, onPress: function () { return navigation.navigate('ChoixJeu'); } },
            react_1["default"].createElement(react_native_1.Text, { style: styles.buttonText }, "MULTIJOUEUR"))));
};
var styles = react_native_1.StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFD544',
        justifyContent: 'center',
        alignItems: 'center'
    },
    /* logoContainer: {
       marginBottom: 50,
       justifyContent: 'center',
       alignItems: 'center',
     },*/
    circle: {
        width: 150,
        height: 150,
        borderRadius: 75,
        backgroundColor: '#A0522D',
        justifyContent: 'center',
        alignItems: 'center'
    },
    logoText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#FFD544'
    },
    button: {
        backgroundColor: '#5D4037',
        width: 350,
        padding: 15,
        borderRadius: 10,
        marginBottom: 20,
        bottom: 100,
        alignItems: 'center'
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: 'bold'
    },
    image: {
        width: 250,
        height: 250,
        resizeMode: "contain"
    }
});
exports["default"] = Home;
