"use strict";
exports.__esModule = true;
var react_1 = require("react");
var react_native_1 = require("react-native");
var BilanQuiz = function (_a) {
    var navigation = _a.navigation, route = _a.route;
    var _b = route.params, score = _b.score, totalQuestions = _b.totalQuestions, playerName = _b.playerName;
    // Formater la date actuelle (17 mars 2025 dans l'exemple)
    var today = new Date();
    var months = [
        'janvier', 'février', 'mars', 'avril', 'mai', 'juin',
        'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'
    ];
    var formattedDate = today.getDate() + " " + months[today.getMonth()] + " " + today.getFullYear();
    return (react_1["default"].createElement(react_native_1.SafeAreaView, { style: styles.container },
        react_1["default"].createElement(react_native_1.View, { style: styles.scoreCircle },
            react_1["default"].createElement(react_native_1.Text, { style: styles.scoreNumber }, score)),
        react_1["default"].createElement(react_native_1.Text, { style: styles.bilanTitle }, "BILAN DU QUIZ"),
        react_1["default"].createElement(react_native_1.View, { style: styles.infoContainer },
            react_1["default"].createElement(react_native_1.View, { style: styles.infoRow },
                react_1["default"].createElement(react_native_1.Text, { style: styles.infoLabel }, "Pseudo:"),
                react_1["default"].createElement(react_native_1.Text, { style: styles.infoValueHighlight }, playerName)),
            react_1["default"].createElement(react_native_1.View, { style: styles.infoRow },
                react_1["default"].createElement(react_native_1.Text, { style: styles.infoLabel }, "Score:"),
                react_1["default"].createElement(react_native_1.Text, { style: styles.infoValueHighlight },
                    score,
                    "/",
                    totalQuestions)),
            react_1["default"].createElement(react_native_1.View, { style: styles.infoRow },
                react_1["default"].createElement(react_native_1.Text, { style: styles.infoLabel }, "Date:"),
                react_1["default"].createElement(react_native_1.Text, { style: styles.infoValueHighlight }, formattedDate))),
        react_1["default"].createElement(react_native_1.View, { style: styles.separator }),
        react_1["default"].createElement(react_native_1.View, { style: styles.buttonContainer },
            react_1["default"].createElement(react_native_1.TouchableOpacity, { style: styles.restartButton, onPress: function () { return navigation.navigate('QuizSolo'); } },
                react_1["default"].createElement(react_native_1.Text, { style: styles.restartButtonText }, "Recommencer une partie")),
            react_1["default"].createElement(react_native_1.TouchableOpacity, { style: styles.quitButton, onPress: function () { return navigation.navigate('Home'); } },
                react_1["default"].createElement(react_native_1.Text, { style: styles.quitButtonText }, "Quitter")))));
};
var styles = react_native_1.StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        padding: 20
    },
    scoreCircle: {
        width: 100,
        height: 100,
        borderRadius: 50,
        borderWidth: 2,
        borderColor: '#FF6B6B',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 40,
        marginBottom: 20
    },
    scoreNumber: {
        fontSize: 36,
        fontWeight: 'bold',
        color: '#FF6B6B'
    },
    bilanTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#555555',
        marginBottom: 40
    },
    infoContainer: {
        width: '100%',
        paddingHorizontal: 10
    },
    infoRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20
    },
    infoLabel: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#555555'
    },
    infoValueHighlight: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#FF6B6B'
    },
    separator: {
        height: 1,
        width: '100%',
        backgroundColor: '#EEEEEE',
        marginVertical: 20
    },
    buttonContainer: {
        width: '100%',
        marginTop: 20
    },
    restartButton: {
        backgroundColor: '#4ECDC4',
        padding: 15,
        borderRadius: 25,
        alignItems: 'center',
        marginBottom: 15
    },
    restartButtonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold'
    },
    quitButton: {
        backgroundColor: '#FF6B6B',
        padding: 15,
        borderRadius: 25,
        alignItems: 'center'
    },
    quitButtonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold'
    }
});
exports["default"] = BilanQuiz;
