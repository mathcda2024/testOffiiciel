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
var ActionVerite = function () {
    // États
    var _a = react_1.useState([]), players = _a[0], setPlayers = _a[1];
    var _b = react_1.useState(''), playerName = _b[0], setPlayerName = _b[1];
    var _c = react_1.useState(false), gameStarted = _c[0], setGameStarted = _c[1];
    var _d = react_1.useState(0), currentPlayerIndex = _d[0], setCurrentPlayerIndex = _d[1];
    var _e = react_1.useState(null), selectedOption = _e[0], setSelectedOption = _e[1];
    var _f = react_1.useState(''), challenge = _f[0], setChallenge = _f[1];
    var _g = react_1.useState(''), errorMessage = _g[0], setErrorMessage = _g[1];
    // Données du jeu
    var actions = [
        "Fais 10 pompes",
        "Imite un animal pendant 30 secondes",
        "Raconte une blague",
        "Danse pendant 1 minute sans musique",
        "Fais le tour de la pièce en marchant comme un crabe",
        "Chante le refrain de ta chanson préférée",
        "Fais semblant d'être une statue pendant 1 minute",
        "Fais 5 squats",
        "Récite l'alphabet à l'envers",
        "Fais un compliment à chaque joueur"
    ];
    var verites = [
        "Quelle est la chose la plus embarrassante que tu aies faite?",
        "Quel est ton plus grand regret?",
        "As-tu déjà menti à ton meilleur ami?",
        "Quelle est ta plus grande peur?",
        "Quel est ton rêve le plus fou?",
        "As-tu déjà triché lors d'un examen?",
        "Quelle est la chose la plus folle que tu aies faite par amour?",
        "Quel est ton plus grand secret?",
        "Quelle est la chose la plus étrange que tu aies mangée?",
        "Quelle est la chose la plus embarrassante dans ton historique de recherche?"
    ];
    // Gestionnaires
    var handleNameChange = function (text) {
        setPlayerName(text);
        setErrorMessage('');
    };
    var handleAddPlayer = function () {
        if (playerName.trim() === '') {
            setErrorMessage('Le nom du joueur ne peut pas être vide');
            return;
        }
        if (players.length >= 10) {
            setErrorMessage('Maximum 10 joueurs autorisés');
            return;
        }
        var newPlayer = {
            id: Date.now(),
            name: playerName.trim()
        };
        setPlayers(__spreadArrays(players, [newPlayer]));
        setPlayerName('');
    };
    var handleRemovePlayer = function (id) {
        setPlayers(players.filter(function (player) { return player.id !== id; }));
    };
    var handleStartGame = function () {
        if (players.length < 2) {
            setErrorMessage('Il faut au moins 2 joueurs pour commencer');
            return;
        }
        setGameStarted(true);
        setCurrentPlayerIndex(0);
        setSelectedOption(null);
        setChallenge('');
    };
    var handleSelectOption = function (option) {
        setSelectedOption(option);
        if (option === 'action') {
            var randomAction = actions[Math.floor(Math.random() * actions.length)];
            setChallenge(randomAction);
        }
        else {
            var randomVerite = verites[Math.floor(Math.random() * verites.length)];
            setChallenge(randomVerite);
        }
    };
    var handleNextPlayer = function () {
        setCurrentPlayerIndex((currentPlayerIndex + 1) % players.length);
        setSelectedOption(null);
        setChallenge('');
    };
    var handleEndGame = function () {
        setGameStarted(false);
        setSelectedOption(null);
        setChallenge('');
    };
    // Écran d'ajout de joueurs
    if (!gameStarted) {
        return (react_1["default"].createElement(react_native_1.SafeAreaView, { style: styles.container },
            react_1["default"].createElement(react_native_1.KeyboardAvoidingView, { behavior: react_native_1.Platform.OS === 'ios' ? 'padding' : 'height', style: styles.keyboardAvoidingView },
                react_1["default"].createElement(react_native_1.View, { style: styles.content },
                    react_1["default"].createElement(react_native_1.Text, { style: styles.title }, "Action ou V\u00E9rit\u00E9"),
                    react_1["default"].createElement(react_native_1.View, { style: styles.card },
                        react_1["default"].createElement(react_native_1.Text, { style: styles.subtitle }, "Ajouter des joueurs (2-10)"),
                        react_1["default"].createElement(react_native_1.View, { style: styles.inputContainer },
                            react_1["default"].createElement(react_native_1.TextInput, { value: playerName, onChangeText: handleNameChange, placeholder: "Nom du joueur", style: styles.input, maxLength: 20, onSubmitEditing: handleAddPlayer, returnKeyType: "done" }),
                            react_1["default"].createElement(react_native_1.TouchableOpacity, { onPress: handleAddPlayer, style: styles.addButton },
                                react_1["default"].createElement(react_native_1.Text, { style: styles.addButtonText }, "Ajouter"))),
                        errorMessage ? (react_1["default"].createElement(react_native_1.Text, { style: styles.errorText }, errorMessage)) : null,
                        react_1["default"].createElement(react_native_1.View, { style: styles.playersContainer },
                            react_1["default"].createElement(react_native_1.Text, { style: styles.playersHeader },
                                "Joueurs (",
                                players.length,
                                "/10):"),
                            players.length === 0 ? (react_1["default"].createElement(react_native_1.Text, { style: styles.emptyText }, "Aucun joueur ajout\u00E9")) : (react_1["default"].createElement(react_native_1.ScrollView, { style: styles.playersList }, players.map(function (player) { return (react_1["default"].createElement(react_native_1.View, { key: player.id, style: styles.playerItem },
                                react_1["default"].createElement(react_native_1.Text, { style: styles.playerName }, player.name),
                                react_1["default"].createElement(react_native_1.TouchableOpacity, { onPress: function () { return handleRemovePlayer(player.id); }, style: styles.removeButton },
                                    react_1["default"].createElement(react_native_1.Text, { style: styles.removeButtonText }, "Supprimer")))); })))),
                        react_1["default"].createElement(react_native_1.TouchableOpacity, { onPress: handleStartGame, disabled: players.length < 2, style: [
                                styles.startButton,
                                players.length < 2 && styles.disabledButton
                            ] },
                            react_1["default"].createElement(react_native_1.Text, { style: styles.startButtonText }, "Commencer le jeu")))))));
    }
    // Écran de jeu
    return (react_1["default"].createElement(react_native_1.SafeAreaView, { style: styles.container },
        react_1["default"].createElement(react_native_1.View, { style: styles.content },
            react_1["default"].createElement(react_native_1.Text, { style: styles.title }, "Action ou V\u00E9rit\u00E9"),
            react_1["default"].createElement(react_native_1.View, { style: styles.card },
                react_1["default"].createElement(react_native_1.View, { style: styles.playerTurn },
                    react_1["default"].createElement(react_native_1.Text, { style: styles.playerTurnText },
                        "Tour de ",
                        react_1["default"].createElement(react_native_1.Text, { style: styles.highlightedPlayer }, players[currentPlayerIndex].name)),
                    react_1["default"].createElement(react_native_1.Text, { style: styles.playerCount },
                        "Joueur ",
                        currentPlayerIndex + 1,
                        " sur ",
                        players.length)),
                !selectedOption ? (react_1["default"].createElement(react_native_1.View, { style: styles.optionsContainer },
                    react_1["default"].createElement(react_native_1.Text, { style: styles.chooseText }, "Que choisis-tu ?"),
                    react_1["default"].createElement(react_native_1.View, { style: styles.optionsButtons },
                        react_1["default"].createElement(react_native_1.TouchableOpacity, { onPress: function () { return handleSelectOption('action'); }, style: [styles.optionButton, styles.actionButton] },
                            react_1["default"].createElement(react_native_1.Text, { style: styles.optionButtonText }, "Action")),
                        react_1["default"].createElement(react_native_1.TouchableOpacity, { onPress: function () { return handleSelectOption('verite'); }, style: [styles.optionButton, styles.veriteButton] },
                            react_1["default"].createElement(react_native_1.Text, { style: styles.optionButtonText }, "V\u00E9rit\u00E9"))))) : (react_1["default"].createElement(react_native_1.View, null,
                    react_1["default"].createElement(react_native_1.View, { style: [
                            styles.challengeContainer,
                            selectedOption === 'action' ? styles.actionChallenge : styles.veriteChallenge
                        ] },
                        react_1["default"].createElement(react_native_1.Text, { style: [
                                styles.challengeType,
                                selectedOption === 'action' ? styles.actionText : styles.veriteText
                            ] }, selectedOption === 'action' ? 'Action' : 'Vérité'),
                        react_1["default"].createElement(react_native_1.Text, { style: styles.challengeText }, challenge)),
                    react_1["default"].createElement(react_native_1.TouchableOpacity, { onPress: handleNextPlayer, style: styles.nextButton },
                        react_1["default"].createElement(react_native_1.Text, { style: styles.nextButtonText }, "Joueur suivant")))),
                react_1["default"].createElement(react_native_1.TouchableOpacity, { onPress: handleEndGame, style: styles.endButton },
                    react_1["default"].createElement(react_native_1.Text, { style: styles.endButtonText }, "Terminer la partie"))))));
};
// Styles
var styles = react_native_1.StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFD544'
    },
    keyboardAvoidingView: {
        flex: 1
    },
    content: {
        flex: 1,
        alignItems: 'center',
        padding: 16
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#1E40AF',
        marginBottom: 24
    },
    card: {
        backgroundColor: 'white',
        borderRadius: 12,
        padding: 24,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 4,
        width: '100%',
        maxWidth: 400
    },
    subtitle: {
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 16
    },
    inputContainer: {
        flexDirection: 'row',
        marginBottom: 8
    },
    input: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#D1D5DB',
        borderTopLeftRadius: 4,
        borderBottomLeftRadius: 4,
        padding: 8
    },
    addButton: {
        backgroundColor: '#A0522D',
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderTopRightRadius: 4,
        borderBottomRightRadius: 4,
        justifyContent: 'center'
    },
    addButtonText: {
        color: 'white',
        fontWeight: '500'
    },
    errorText: {
        color: '#EF4444',
        fontSize: 12,
        marginBottom: 8
    },
    playersContainer: {
        marginBottom: 24
    },
    playersHeader: {
        fontWeight: '500',
        marginBottom: 8
    },
    emptyText: {
        color: '#6B7280',
        fontStyle: 'italic'
    },
    playersList: {
        maxHeight: 160
    },
    playerItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 8,
        borderBottomWidth: 1,
        borderBottomColor: '#E5E7EB'
    },
    playerName: {
        flex: 1
    },
    removeButton: {
        padding: 4
    },
    removeButtonText: {
        color: '#EF4444'
    },
    startButton: {
        backgroundColor: '#2563EB',
        paddingVertical: 8,
        borderRadius: 4,
        alignItems: 'center'
    },
    disabledButton: {
        backgroundColor: '#9CA3AF'
    },
    startButtonText: {
        color: 'white',
        fontWeight: '600'
    },
    playerTurn: {
        alignItems: 'center',
        marginBottom: 24
    },
    playerTurnText: {
        fontSize: 18,
        fontWeight: '600'
    },
    highlightedPlayer: {
        color: '#1D4ED8'
    },
    playerCount: {
        color: '#6B7280'
    },
    optionsContainer: {
        marginBottom: 16
    },
    chooseText: {
        textAlign: 'center',
        marginBottom: 16
    },
    optionsButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    optionButton: {
        flex: 1,
        paddingVertical: 12,
        borderRadius: 4,
        alignItems: 'center',
        marginHorizontal: 4
    },
    actionButton: {
        backgroundColor: '#F59E0B'
    },
    veriteButton: {
        backgroundColor: '#6366F1'
    },
    optionButtonText: {
        color: 'white',
        fontWeight: '600'
    },
    challengeContainer: {
        padding: 16,
        borderRadius: 8,
        marginBottom: 16
    },
    actionChallenge: {
        backgroundColor: '#FEF3C7'
    },
    veriteChallenge: {
        backgroundColor: '#E0E7FF'
    },
    challengeType: {
        fontWeight: 'bold',
        marginBottom: 8
    },
    actionText: {
        color: '#B45309'
    },
    veriteText: {
        color: '#4338CA'
    },
    challengeText: {
        color: '#1F2937'
    },
    nextButton: {
        backgroundColor: '#2563EB',
        paddingVertical: 8,
        borderRadius: 4,
        alignItems: 'center'
    },
    nextButtonText: {
        color: 'white',
        fontWeight: '600'
    },
    endButton: {
        borderWidth: 1,
        borderColor: '#EF4444',
        paddingVertical: 8,
        borderRadius: 4,
        alignItems: 'center',
        marginTop: 16
    },
    endButtonText: {
        color: '#EF4444'
    }
});
exports["default"] = ActionVerite;
