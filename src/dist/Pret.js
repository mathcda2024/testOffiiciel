"use strict";
exports.__esModule = true;
var react_1 = require("react");
var react_native_1 = require("react-native");
var Pret = function (_a) {
    var navigation = _a.navigation;
    var bounceAnim = react_1.useState(new react_native_1.Animated.Value(1))[0]; // Initial scale value
    var handlePress = function () {
        // Animation du bouton PRET
        react_native_1.Animated.sequence([
            react_native_1.Animated.timing(bounceAnim, {
                toValue: 1.2,
                duration: 200,
                easing: react_native_1.Easing.bounce,
                useNativeDriver: true
            }),
            react_native_1.Animated.timing(bounceAnim, {
                toValue: 1,
                duration: 200,
                easing: react_native_1.Easing.bounce,
                useNativeDriver: true
            }),
        ]).start();
        // REDIRECTION VERS LA PAGE DE QUIZ
        setTimeout(function () {
            navigation.navigate('Jeu');
        }, 400); // Délai pour attendre la fin de l'animation avant la navigation 0.4S
    };
    return (react_1["default"].createElement(react_native_1.View, { style: styles.container },
        react_1["default"].createElement(react_native_1.Animated.View, { style: [
                styles.animatedButton,
                { transform: [{ scale: bounceAnim }] },
            ] },
            react_1["default"].createElement(react_native_1.TouchableOpacity, { style: styles.button, onPress: function () { return navigation.navigate('QuizSolo'); } },
                react_1["default"].createElement(react_native_1.Text, { style: styles.buttonText }, "PR\u00CAT !"))),
        react_1["default"].createElement(react_native_1.TouchableOpacity, { style: styles.cancelButton, onPress: function () { return navigation.navigate('ThemeSolo'); } },
            react_1["default"].createElement(react_native_1.Text, { style: styles.cancelText }, "ANNULER"))));
};
var styles = react_native_1.StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFD700'
    },
    animatedButton: {
        borderRadius: 300,
        borderWidth: 5,
        borderColor: '#008000',
        padding: 10
    },
    button: {
        backgroundColor: '#0000FF',
        width: 300,
        height: 300,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 200
    },
    buttonText: {
        color: '#FFA500',
        fontSize: 50,
        fontWeight: 'bold'
    },
    // Bouton Annuler
    cancelButton: {
        marginTop: 30,
        backgroundColor: '#FFFFFF',
        paddingVertical: 15,
        paddingHorizontal: 30,
        borderRadius: 10,
        width: '90%',
        marginTop: 130,
        height: 60
    },
    cancelText: {
        color: '#000000',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
        justifyContent: 'center'
    }
});
exports["default"] = Pret;
