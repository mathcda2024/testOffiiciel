"use strict";
exports.__esModule = true;
var react_1 = require("react");
var react_native_1 = require("react-native");
//import Icon from 'react-native-vector-icons/FontAwesome';  // Import de l'icône
//import AntDesign from 'react-native-vector-icons/AntDesign';  // Utilisation d'AntDesign
//import Ionicons from 'react-native-vector-icons/Ionicons';
var MaterialIcons_1 = require("react-native-vector-icons/MaterialIcons");
var NiveauSolo = function (_a) {
    var navigation = _a.navigation;
    var _b = react_1.useState(null), selectedCount = _b[0], setSelectedCount = _b[1]; // Nombre de questions sélectionné
    var _c = react_1.useState(null), selectedLevel = _c[0], setSelectedLevel = _c[1]; // Niveau sélectionné
    var _d = react_1.useState(false), modalVisible = _d[0], setModalVisible = _d[1]; // Contrôle du modal
    var handleSelectCount = function (count) {
        setSelectedCount(count);
        setModalVisible(false); // Fermer le modal après sélection
    };
    var handleSelectLevel = function (level) {
        setSelectedLevel(level);
    };
    var isFormValid = selectedCount !== null && selectedLevel !== null; // Vérifier si tout est sélectionné
    return (react_1["default"].createElement(react_native_1.View, { style: styles.container },
        react_1["default"].createElement(react_native_1.View, { style: styles.titleContainer },
            react_1["default"].createElement(react_native_1.Text, { style: styles.title }, "Choisis ton niveau")),
        react_1["default"].createElement(react_native_1.TouchableOpacity, { style: styles.buttonNbQuest, onPress: function () { return setModalVisible(true); } },
            react_1["default"].createElement(react_native_1.Text, { style: styles.buttonText }, selectedCount !== null ? selectedCount + " QUESTIONS" : "NOMBRE DE QUESTIONS")),
        react_1["default"].createElement(react_native_1.Modal, { animationType: "fade", transparent: true, visible: modalVisible, onRequestClose: function () { return setModalVisible(false); } },
            react_1["default"].createElement(react_native_1.View, { style: styles.modalOverlay },
                react_1["default"].createElement(react_native_1.View, { style: styles.modalContainer },
                    react_1["default"].createElement(react_native_1.Text, { style: styles.modalTitle }, "Choisissez le nombre de questions"),
                    react_1["default"].createElement(react_native_1.TouchableOpacity, { style: styles.modalButton, onPress: function () { return handleSelectCount(10); } },
                        react_1["default"].createElement(react_native_1.Text, { style: styles.modalButtonText }, "10")),
                    react_1["default"].createElement(react_native_1.TouchableOpacity, { style: styles.modalButton, onPress: function () { return handleSelectCount(20); } },
                        react_1["default"].createElement(react_native_1.Text, { style: styles.modalButtonText }, "20")),
                    react_1["default"].createElement(react_native_1.TouchableOpacity, { style: styles.modalButton, onPress: function () { return handleSelectCount(30); } },
                        react_1["default"].createElement(react_native_1.Text, { style: styles.modalButtonText }, "30")),
                    react_1["default"].createElement(react_native_1.TouchableOpacity, { style: styles.closeButton, onPress: function () { return setModalVisible(false); } },
                        react_1["default"].createElement(react_native_1.Text, { style: styles.closeButtonText }, "Fermer"))))),
        ['FACILE', 'STANDARD', 'DIFFICILE'].map(function (level) { return (react_1["default"].createElement(react_native_1.TouchableOpacity, { key: level, style: [
                styles.button,
                selectedLevel === level && styles.selectedButton,
                level === 'DIFFICILE' && styles.lastLevelButton // Applique une marge en bas uniquement au dernier bouton
            ], onPress: function () { return handleSelectLevel(level); } },
            react_1["default"].createElement(react_native_1.Text, { style: styles.buttonText }, level),
            selectedLevel === level && (react_1["default"].createElement(MaterialIcons_1["default"], { name: "check-circle", size: 20, color: "black", style: styles.icon })))); }),
        react_1["default"].createElement(react_native_1.TouchableOpacity, { style: [styles.ok, !isFormValid ? styles.disabledButton : null], onPress: function () { return isFormValid && navigation.navigate('ThemeSolo'); }, disabled: !isFormValid },
            react_1["default"].createElement(react_native_1.Text, { style: [styles.backButtonText, !isFormValid && styles.disabledText] }, "OK"),
            " "),
        react_1["default"].createElement(react_native_1.TouchableOpacity, { style: styles.backButton, onPress: function () { return navigation.navigate('Home'); } },
            react_1["default"].createElement(react_native_1.Text, { style: styles.backButtonText }, "RETOUR"))));
};
var styles = react_native_1.StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFD700',
        alignItems: 'center',
        justifyContent: 'center'
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
        marginBottom: 30,
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
    buttonNbQuest: {
        backgroundColor: '#5A3A1B',
        padding: 15,
        marginVertical: 5,
        width: '90%',
        alignItems: 'center',
        borderRadius: 5,
        marginBottom: 50,
        marginTop: 50
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
    },
    lastLevelButton: {
        marginBottom: 70
    }
});
exports["default"] = NiveauSolo;
