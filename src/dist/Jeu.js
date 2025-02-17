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
var AntDesign_1 = require("react-native-vector-icons/AntDesign");
var Jeu = function (_a) {
    var route = _a.route, navigation = _a.navigation;
    var _b = route.params, players = _b.players, level = _b.level;
    var _c = react_1.useState(0), currentPlayerIndex = _c[0], setCurrentPlayerIndex = _c[1];
    var _d = react_1.useState('pseudo'), gameState = _d[0], setGameState = _d[1];
    var _e = react_1.useState(new Array(players).fill('')), playerNames = _e[0], setPlayerNames = _e[1];
    var _f = react_1.useState(''), currentAction = _f[0], setCurrentAction = _f[1];
    var _g = react_1.useState(''), newPseudo = _g[0], setNewPseudo = _g[1];
    var _h = react_1.useState(0), score = _h[0], setScore = _h[1];
    var _j = react_1.useState(30), timeLeft = _j[0], setTimeLeft = _j[1];
    react_1.useEffect(function () {
        if (gameState === 'enCours') {
            getActionForPlayer();
            var timer_1 = setInterval(function () {
                setTimeLeft(function (prevTime) { return (prevTime > 0 ? prevTime - 1 : 0); });
            }, 1000);
            return function () { return clearInterval(timer_1); };
        }
    }, [gameState, currentPlayerIndex, level]);
    var getActionForPlayer = function () {
        var actions = {
            SOFT: ['Raconte une blague !', 'Fais une danse rigolote !', 'Chante une chanson drôle !'],
            NORMAL: ['Fais un défi physique !', 'Chante une chanson avec une voix drôle !', 'Fais un défi de danse !'],
            HARDCORE: ['Réponds à une question difficile !', 'Fais un gage que tu détestes !', 'Décris un moment embarrassant dans ta vie !']
        };
        var truths = {
            SOFT: ['Quel est ton film préféré ?', 'Quelle est ta plus grande peur ?', 'Qui est ton meilleur ami ?'],
            NORMAL: ['Si tu pouvais voyager n’importe où, où irais-tu ?', 'Quel est ton plus grand regret ?', 'Raconte un moment embarrassant que tu as vécu !'],
            HARDCORE: ['As-tu déjà menti à un proche ?', 'Quel est ton plus grand secret ?', 'Si tu pouvais changer une décision dans ta vie, laquelle ce serait ?']
        };
        var allOptions = __spreadArrays(actions[level], truths[level]);
        var randomOption = allOptions[Math.floor(Math.random() * allOptions.length)];
        setCurrentAction(randomOption);
    };
    var handleNextTurn = function () {
        setCurrentPlayerIndex(function (prevIndex) { return (prevIndex + 1) % players; });
        setTimeLeft(30);
        setScore(function (prevScore) { return prevScore + 10; });
    };
    var handleEndGame = function () {
        setGameState('finie');
        react_native_1.Alert.alert('Fin du jeu', 'Le jeu est terminé. Vous avez tous joué !', [
            { text: 'OK', onPress: function () { return navigation.navigate('Home'); } }
        ]);
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
            if (currentPlayerIndex === players - 1) {
                setGameState('enCours');
            }
            else {
                setCurrentPlayerIndex(function (prevIndex) { return prevIndex + 1; });
            }
        }
    };
    return (react_1["default"].createElement(react_native_1.View, { style: styles.container }, gameState === 'pseudo' ? (react_1["default"].createElement(react_native_1.View, { style: styles.pseudoContainer },
        react_1["default"].createElement(react_native_1.Text, { style: styles.title }, "Entrez votre pseudo"),
        react_1["default"].createElement(react_native_1.TextInput, { style: styles.input, placeholder: "Pseudo", value: newPseudo, onChangeText: setNewPseudo }),
        react_1["default"].createElement(react_native_1.TouchableOpacity, { style: styles.button, onPress: handleSetPlayerName },
            react_1["default"].createElement(react_native_1.Text, { style: styles.buttonText }, "Valider")))) : (react_1["default"].createElement(react_1["default"].Fragment, null,
        react_1["default"].createElement(react_native_1.Text, { style: styles.timer },
            "\u23F3 ",
            timeLeft,
            "s"),
        react_1["default"].createElement(react_native_1.Text, { style: styles.score },
            "Score: ",
            score),
        react_1["default"].createElement(react_native_1.Text, { style: styles.question },
            "Question ",
            currentPlayerIndex + 1),
        react_1["default"].createElement(react_native_1.View, { style: styles.questionContainer },
            react_1["default"].createElement(react_native_1.Text, { style: styles.actionText }, currentAction)),
        react_1["default"].createElement(react_native_1.TouchableOpacity, { style: styles.button, onPress: handleNextTurn },
            react_1["default"].createElement(react_native_1.Text, { style: styles.buttonText }, "Suivant")),
        react_1["default"].createElement(react_native_1.TouchableOpacity, { style: [styles.button, styles.quitButton], onPress: handleEndGame },
            react_1["default"].createElement(AntDesign_1["default"], { name: "closecircleo", size: 24, color: "white" }),
            react_1["default"].createElement(react_native_1.Text, { style: styles.buttonText }, "Quitter"))))));
};
var styles = react_native_1.StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#F5F5F5',
        padding: 20
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20
    },
    timer: {
        fontSize: 18,
        color: 'red',
        marginBottom: 10
    },
    score: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10
    },
    questionContainer: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        marginBottom: 20
    },
    button: {
        backgroundColor: '#4CAF50',
        padding: 15,
        borderRadius: 10,
        marginBottom: 10,
        alignItems: 'center'
    },
    buttonText: {
        color: 'white',
        fontSize: 18
    },
    quitButton: {
        backgroundColor: 'red'
    }
});
exports["default"] = Jeu;
