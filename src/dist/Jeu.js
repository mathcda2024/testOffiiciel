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
/*type Props = {
  navigation: JeuScreenNavigationProp;
};*/
var Jeu = function (_a) {
    var route = _a.route, navigation = _a.navigation;
    var _b = route.params, players = _b.players, level = _b.level;
    var _c = react_1.useState(0), currentPlayerIndex = _c[0], setCurrentPlayerIndex = _c[1];
    var _d = react_1.useState('pseudo'), gameState = _d[0], setGameState = _d[1]; // 'pseudo', 'enCours', 'finie'
    var _e = react_1.useState(new Array(players.length).fill('')), playerNames = _e[0], setPlayerNames = _e[1]; // Pseudos des joueurs
    var _f = react_1.useState(''), currentAction = _f[0], setCurrentAction = _f[1];
    var _g = react_1.useState(''), newPseudo = _g[0], setNewPseudo = _g[1];
    var handleNextTurn = function () {
        setCurrentPlayerIndex(function (prevIndex) { return (prevIndex + 1) % players.length; });
    };
    var handleEndGame = function () {
        setGameState('finie');
        react_native_1.Alert.alert('Fin du jeu', 'Le jeu est terminé. Vous avez tous joué !', [
            { text: 'OK', onPress: function () { return navigation.navigate('Home'); } },
        ]);
    };
    var getActionForPlayer = function () {
        var actions = {
            SOFT: [
                'Raconte une blague !',
                'Fais une danse rigolote !',
                'Chante une chanson drôle !',
            ],
            NORMAL: [
                'Fais un défi physique !',
                'Chante une chanson avec une voix drôle !',
                'Fais un défi de danse !',
            ],
            HARDCORE: [
                'Réponds à une question difficile !',
                'Fais un gage que tu détestes !',
                'Décris un moment embarrassant dans ta vie !',
            ]
        };
        var truths = {
            SOFT: [
                'Quel est ton film préféré ?',
                'Quelle est ta plus grande peur ?',
                'Qui est ton meilleur ami ?',
            ],
            NORMAL: [
                'Si tu pouvais voyager n’importe où, où irais-tu ?',
                'Quel est ton plus grand regret ?',
                'Raconte un moment embarrassant que tu as vécu !',
            ],
            HARDCORE: [
                'As-tu déjà menti à un proche ? Si oui, de quoi s’agissait-il ?',
                'Quel est ton plus grand secret ?',
                'Si tu pouvais changer une décision dans ta vie, laquelle ce serait ?',
            ]
        };
        var allOptions = __spreadArrays(actions[level], truths[level]);
        var randomOption = allOptions[Math.floor(Math.random() * allOptions.length)];
        setCurrentAction(randomOption);
    };
    var handleSetPlayerName = function () {
        if (newPseudo.trim() === '') {
            react_native_1.Alert.alert('Erreur', 'Veuillez entrer un pseudo valide.');
        }
        else {
            var updatedPlayerNames = __spreadArrays(playerNames);
            updatedPlayerNames[currentPlayerIndex] = newPseudo;
            setPlayerNames(updatedPlayerNames);
            setNewPseudo('');
            if (currentPlayerIndex === players.length - 1) {
                setGameState('enCours');
            }
            else {
                setCurrentPlayerIndex(function (prevIndex) { return prevIndex + 1; });
            }
        }
    };
    react_1.useEffect(function () {
        if (gameState === 'enCours') {
            getActionForPlayer();
        }
    }, [gameState, currentPlayerIndex, level]);
    // Style partagé pour tous les boutons ayant la même taille
    var sharedButtonStyle = {
        backgroundColor: '#5A3A1B',
        padding: 15,
        marginVertical: 10,
        width: '90%',
        alignItems: 'center',
        borderRadius: 5
    };
    return (react_1["default"].createElement(react_native_1.View, { style: styles.container }, gameState === 'pseudo' ? (react_1["default"].createElement(react_native_1.View, { style: styles.pseudoContainer },
        react_1["default"].createElement(react_native_1.Text, { style: styles.title }, "Entrez votre pseudo"),
        react_1["default"].createElement(react_native_1.TextInput, { style: styles.input, placeholder: "Pseudo", value: newPseudo, onChangeText: setNewPseudo }),
        react_1["default"].createElement(react_native_1.TouchableOpacity, { style: sharedButtonStyle, onPress: handleSetPlayerName },
            react_1["default"].createElement(react_native_1.Text, { style: styles.buttonText }, "Valider")))) : (react_1["default"].createElement(react_1["default"].Fragment, null,
        react_1["default"].createElement(react_native_1.View, { style: styles.scoreContainer },
            react_1["default"].createElement(react_native_1.Text, { style: styles.scoreText },
                "Question ",
                currentPlayerIndex + 1),
            react_1["default"].createElement(react_native_1.Text, { style: styles.scoreText },
                "Score: ",
                currentPlayerIndex * 10)),
        react_1["default"].createElement(react_native_1.View, { style: styles.questionContainer },
            react_1["default"].createElement(react_native_1.Text, { style: styles.actionText }, currentAction)),
        react_1["default"].createElement(react_native_1.TouchableOpacity, { style: sharedButtonStyle, onPress: handleNextTurn },
            react_1["default"].createElement(react_native_1.Text, { style: styles.buttonText }, "Suivant")),
        react_1["default"].createElement(react_native_1.TouchableOpacity, { style: [sharedButtonStyle, styles.endButton], onPress: handleEndGame },
            react_1["default"].createElement(react_native_1.Text, { style: styles.buttonText }, "Terminer le Jeu")),
        react_1["default"].createElement(react_native_1.TouchableOpacity, { style: sharedButtonStyle },
            react_1["default"].createElement(react_native_1.Text, { style: styles.buttonText }, "R\u00E9ponse 1")),
        react_1["default"].createElement(react_native_1.TouchableOpacity, { style: sharedButtonStyle },
            react_1["default"].createElement(react_native_1.Text, { style: styles.buttonText }, "R\u00E9ponse 2")),
        react_1["default"].createElement(react_native_1.TouchableOpacity, { style: sharedButtonStyle },
            react_1["default"].createElement(react_native_1.Text, { style: styles.buttonText }, "R\u00E9ponse 3")),
        react_1["default"].createElement(react_native_1.View, { style: styles.footer },
            react_1["default"].createElement(react_native_1.Text, { style: styles.footerText },
                "Niveau : ",
                level))))));
};
var styles = react_native_1.StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFD700',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 60
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 20
    },
    input: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        width: '80%',
        marginBottom: 20
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: 'bold'
    },
    endButton: {
        backgroundColor: '#FF5733'
    },
    questionContainer: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        marginBottom: 20,
        width: '90%',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
        elevation: 3
    },
    scoreContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '90%',
        backgroundColor: 'white',
        padding: 15,
        borderRadius: 10,
        marginBottom: 10,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
        elevation: 3
    },
    scoreText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333'
    },
    actionText: {
        fontSize: 18,
        color: '#555',
        textAlign: 'center'
    },
    footer: {
        position: 'absolute',
        bottom: 20,
        left: 20
    },
    footerText: {
        color: '#000',
        fontSize: 16,
        fontWeight: 'bold'
    },
    pseudoContainer: {
        alignItems: 'center',
        justifyContent: 'center'
    }
});
exports["default"] = Jeu;
