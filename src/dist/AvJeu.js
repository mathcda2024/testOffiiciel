"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
var react_1 = require("react");
var react_native_1 = require("react-native");
var MaterialIcons_1 = require("react-native-vector-icons/MaterialIcons");
var AvJeu = function (_a) {
    var navigation = _a.navigation;
    var _b = react_1.useState(null), selectedPlayers = _b[0], setSelectedPlayers = _b[1];
    var _c = react_1.useState(null), selectedLevel = _c[0], setSelectedLevel = _c[1];
    var _d = react_1.useState(false), playerModalVisible = _d[0], setPlayerModalVisible = _d[1]; // Modal pour le nombre de joueurs
    var handleSelectPlayers = function (players) {
        setSelectedPlayers(players);
        setPlayerModalVisible(false); // Ferme le modal une fois qu'un choix est fait
    };
    var handleSelectLevel = function (level) {
        setSelectedLevel(level);
    };
    var isFormValid = selectedPlayers !== null && selectedLevel !== null;
    return (react_1["default"].createElement(react_native_1.View, { style: styles.container },
        react_1["default"].createElement(react_native_1.View, { style: styles.titleContainer },
            react_1["default"].createElement(react_native_1.Text, { style: styles.title }, "Pr\u00EAts pour l'aventure ?")),
        react_1["default"].createElement(react_native_1.TouchableOpacity, { style: styles.button, onPress: function () { return setPlayerModalVisible(true); } },
            react_1["default"].createElement(react_native_1.Text, { style: styles.buttonText }, selectedPlayers !== null ? selectedPlayers + " JOUEURS" : "CHOISIR LE NOMBRE DE JOUEURS")),
        react_1["default"].createElement(react_native_1.Modal, { animationType: "fade", transparent: true, visible: playerModalVisible, onRequestClose: function () { return setPlayerModalVisible(false); } },
            react_1["default"].createElement(react_native_1.View, { style: styles.modalOverlay },
                react_1["default"].createElement(react_native_1.View, { style: styles.modalContainer },
                    react_1["default"].createElement(react_native_1.Text, { style: styles.modalTitle }, "Choisissez le nombre de joueurs"),
                    __spreadArrays(Array(9)).map(function (_, i) {
                        var players = i + 2; // Crée un nombre de joueurs de 2 à 10
                        return (react_1["default"].createElement(react_native_1.TouchableOpacity, { key: players, style: styles.modalButton, onPress: function () { return handleSelectPlayers(players); } },
                            react_1["default"].createElement(react_native_1.Text, { style: styles.modalButtonText }, players)));
                    }),
                    react_1["default"].createElement(react_native_1.TouchableOpacity, { style: styles.closeButton, onPress: function () { return setPlayerModalVisible(false); } },
                        react_1["default"].createElement(react_native_1.Text, { style: styles.closeButtonText }, "Fermer"))))),
        ['SOFT', 'NORMAL', 'HARDCORE'].map(function (level) { return (react_1["default"].createElement(react_native_1.TouchableOpacity, { key: level, style: [styles.button, selectedLevel === level && styles.selectedButton, level === 'HARDCORE' && styles.lastLevelButton], onPress: function () { return handleSelectLevel(level); } },
            react_1["default"].createElement(react_native_1.Text, { style: styles.buttonText }, level),
            selectedLevel === level && (react_1["default"].createElement(MaterialIcons_1["default"], { name: "check-circle", size: 20, color: "black", style: styles.icon })))); }),
        react_1["default"].createElement(react_native_1.TouchableOpacity, { style: [styles.ok, !isFormValid && styles.disabledButton], onPress: function () { return isFormValid && navigation.navigate('Partie'); }, disabled: !isFormValid },
            react_1["default"].createElement(react_native_1.Text, { style: [styles.buttonText, !isFormValid && styles.disabledText] }, "OK")),
        react_1["default"].createElement(react_native_1.TouchableOpacity, { style: styles.backButton, onPress: function () { return navigation.navigate('ChoixJeu'); } },
            react_1["default"].createElement(react_native_1.Text, { style: styles.backButtonText }, "RETOUR"))));
};
var styles = react_native_1.StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFD700',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 60
    },
    titleContainer: {
        backgroundColor: "white",
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 10,
        shadowColor: "#000",
        shadowOpacity: 0.2,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
        elevation: 3,
        marginBottom: 70,
        width: '90%'
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#333",
        textAlign: "center"
    },
    button: {
        backgroundColor: '#5A3A1B',
        padding: 15,
        marginVertical: 10,
        width: '90%',
        alignItems: 'center',
        borderRadius: 5,
        flexDirection: 'row',
        justifyContent: 'center'
    },
    selectedButton: {
        backgroundColor: '#28a745'
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold'
    },
    icon: {
        marginLeft: 10
    },
    ok: {
        backgroundColor: '#FFFFFF',
        padding: 15,
        marginVertical: 10,
        width: '90%',
        alignItems: 'center',
        borderRadius: 5,
        flexDirection: 'row',
        justifyContent: 'center',
        borderColor: '#FFFFFF',
        borderWidth: 1
    },
    disabledButton: {
        backgroundColor: '#FFFFFF',
        borderColor: '#FFFFFF'
    },
    disabledText: {
        color: '#000000'
    },
    backButtonText: {
        color: '#000000',
        fontSize: 16,
        fontWeight: 'bold'
    },
    backButton: {
        backgroundColor: '#FFFFFF',
        padding: 15,
        marginVertical: 10,
        width: '90%',
        alignItems: 'center',
        borderRadius: 5
    },
    lastLevelButton: {
        marginBottom: 90
    },
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)'
    },
    modalContainer: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        width: '80%',
        alignItems: 'center'
    },
    modalTitle: {
        fontSize: 20,
        marginBottom: 20
    },
    modalButton: {
        backgroundColor: '#5A3A1B',
        paddingVertical: 10,
        paddingHorizontal: 30,
        margin: 5,
        borderRadius: 5
    },
    modalButtonText: {
        color: 'white',
        fontSize: 16
    },
    closeButton: {
        backgroundColor: '#dc3545',
        paddingVertical: 10,
        paddingHorizontal: 30,
        marginTop: 20,
        borderRadius: 5
    },
    closeButtonText: {
        color: 'white',
        fontSize: 16
    }
});
exports["default"] = AvJeu;
