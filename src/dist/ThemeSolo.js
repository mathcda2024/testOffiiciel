"use strict";
exports.__esModule = true;
var react_1 = require("react");
var react_native_1 = require("react-native");
//card des themes avec leur nom et leur photos
var sportImage = require('./image/sport.png'); // Chemin correct pour une image locale
var musiqueImage = require('./image/musique.jpg'); // Chemin correct pour une image locale
var scienceImage = require('./image/science.png'); // Chemin correct pour une image locale
var geoImage = require('./image/geo.jpg'); // Chemin correct pour une image locale
var histoireImage = require('./image/histoire.jpg'); // Chemin correct pour une image locale
var starImage = require('./image/star.jpg'); // Chemin correct pour une image locale
var corpsImage = require('./image/corps.jpg'); // Chemin correct pour une image locale
var cultureImage = require('./image/culture.jpg'); // Chemin correct pour une image locale
var themes = [
    { id: '1', title: 'Histoire', image: histoireImage },
    { id: '7', title: 'Geographie', image: geoImage },
    { id: '2', title: 'Science', image: scienceImage },
    { id: '3', title: 'Sport', image: sportImage },
    { id: '4', title: 'Musique', image: musiqueImage },
    { id: '5', title: 'Culture générale', image: cultureImage },
    { id: '6', title: 'Star', image: starImage },
    { id: '8', title: 'Anatomie', image: corpsImage },
];
var ThemeSolo = function (_a) {
    /* const handleThemeSelection = (theme: string) => {
       navigation.navigate('Jeu', { theme });
     };*/
    var navigation = _a.navigation;
    return (react_1["default"].createElement(react_native_1.View, { style: styles.container },
        react_1["default"].createElement(react_native_1.View, { style: styles.titleContainer },
            react_1["default"].createElement(react_native_1.Text, { style: styles.title }, "Choisissez un theme")),
        react_1["default"].createElement(react_native_1.FlatList, { data: themes, keyExtractor: function (item) { return item.id; }, numColumns: 2, renderItem: function (_a) {
                var item = _a.item;
                return (react_1["default"].createElement(react_native_1.TouchableOpacity, { style: styles.card, onPress: function () { return navigation.navigate('Pret'); } },
                    react_1["default"].createElement(react_native_1.Image, { source: typeof item.image === 'string' ? { uri: item.image } : item.image, style: styles.image }),
                    react_1["default"].createElement(react_native_1.Text, { style: styles.cardText }, item.title)));
            } })));
};
var styles = react_native_1.StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFD700',
        alignItems: 'center',
        paddingTop: 50
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
        marginBottom: 50,
        marginTop: -20,
        width: '90%'
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#333",
        textAlign: "center"
    },
    card: {
        backgroundColor: '#FFF',
        borderRadius: 15,
        padding: 10,
        margin: 10,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowOffset: { width: 2, height: 2 },
        elevation: 5,
        width: 160,
        height: 200
    },
    image: {
        width: '100%',
        height: 120,
        borderRadius: 10,
        resizeMode: 'cover'
    },
    cardText: {
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 10,
        color: '#444',
        textAlign: 'center'
    },
    backButton: {
        backgroundColor: '#FFD700',
        padding: 15,
        marginVertical: 5,
        width: '90%',
        alignItems: 'center',
        borderRadius: 5,
        marginTop: -30
    },
    button: {
        backgroundColor: '#4CAF50',
        padding: 15,
        margin: 10,
        borderRadius: 5
    },
    buttonText: {
        color: 'white',
        fontSize: 18
    }
});
exports["default"] = ThemeSolo;
