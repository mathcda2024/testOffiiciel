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
var Partie = function (_a) {
    var navigation = _a.navigation, route = _a.route;
    /*const { playerNames, level } = route.params;*/
    var _b = react_1.useState(0), currentPlayerIndex = _b[0], setCurrentPlayerIndex = _b[1];
    var _c = react_1.useState(Array(playerNames.length).fill(0)), scores = _c[0], setScores = _c[1];
    var _d = react_1.useState(1), round = _d[0], setRound = _d[1];
    var _e = react_1.useState(true), showChoice = _e[0], setShowChoice = _e[1];
    var _f = react_1.useState(''), currentTask = _f[0], setCurrentTask = _f[1];
    var _g = react_1.useState(null), taskType = _g[0], setTaskType = _g[1];
    var animation = react_1.useState(new react_native_1.Animated.Value(0))[0];
    var _h = react_1.useState(new Set()), usedTasks = _h[0], setUsedTasks = _h[1];
    // Base de données d'actions et vérités selon le niveau
    var tasks = {
        actions: {
            SOFT: [
                "Fais 10 sauts sur place",
                "Imite un animal de ton choix pendant 30 secondes",
                "Chante le refrain de ta chanson préférée",
                "Fais un compliment à chaque joueur",
                "Raconte une blague",
                "Fais semblant d'être une statue pendant 1 minute",
                "Danse sans musique pendant 30 secondes",
                "Prends une photo embarrassante avec ton téléphone",
                "Imite une célébrité connue",
                "Fais 5 pompes"
            ],
            NORMAL: [
                "Envoie un message embarrassant au dernier contact de ton téléphone",
                "Mange un mélange étrange d'aliments choisis par les autres joueurs",
                "Appelle un ami et parle-lui en chantant",
                "Publie une photo gênante sur tes réseaux sociaux",
                "Laisse les autres joueurs maquiller ton visage les yeux fermés",
                "Fais 20 squats",
                "Mets un glaçon dans ton t-shirt jusqu'à ce qu'il fonde",
                "Laisse un autre joueur te coiffer comme il veut",
                "Envoie un texto à ton crush/ex",
                "Imite tous les autres joueurs un par un"
            ],
            HARDCORE: [
                "Mange une cuillère de sauce piquante",
                "Bois un verre d'eau avec du sel",
                "Appelle ton ex et dis-lui que tu penses encore à lui/elle",
                "Laisse les autres joueurs poster ce qu'ils veulent sur tes réseaux sociaux",
                "Demande le numéro de téléphone d'un inconnu",
                "Garde un glaçon dans ta bouche jusqu'à ce qu'il fonde complètement",
                "Laisse un autre joueur te raser une partie des sourcils",
                "Va chez ton voisin et demande-lui un ingrédient bizarre",
                "Avale un mélange de condiments préparé par les autres joueurs",
                "Fais 30 burpees d'affilée"
            ]
        },
        verites: {
            SOFT: [
                "Quel est ton plus grand rêve ?",
                "Quelle est la chose la plus gentille que tu aies faite pour quelqu'un ?",
                "Quel talent aimerais-tu avoir ?",
                "Quelle est ta plus grande fierté ?",
                "Quelle est la chose la plus embarrassante que tes parents t'aient faite ?",
                "Quel est ton film préféré et pourquoi ?",
                "Quelle est ta plus grande peur ?",
                "Si tu pouvais voyager n'importe où, où irais-tu ?",
                "Qui admires-tu le plus ?",
                "Quel est ton plat préféré ?"
            ],
            NORMAL: [
                "Quel est ton plus grand regret ?",
                "As-tu déjà triché à un examen ?",
                "Quelle est la chose la plus folle que tu aies faite par amour ?",
                "Quel est ton plus gros mensonge ?",
                "Quelle est la chose la plus embarrassante que tu aies faite en public ?",
                "As-tu déjà eu le béguin pour le partenaire d'un ami ?",
                "Raconte ta pire expérience de rendez-vous amoureux",
                "Quel est ton plus grand complexe ?",
                "As-tu déjà volé quelque chose ?",
                "Quelle est ta plus grande peur irrationnelle ?"
            ],
            HARDCORE: [
                "Quelle est la chose la plus illégale que tu aies jamais faite ?",
                "Raconte ta pire expérience sexuelle",
                "Quelle est la pensée la plus sombre que tu aies jamais eue ?",
                "Quel est ton plus grand fantasme ?",
                "Quelle est la chose la plus humiliante qui te soit arrivée ?",
                "As-tu déjà été infidèle ? Raconte",
                "Quelle est la chose la plus méchante que tu aies faite à quelqu'un ?",
                "Quel est ton plus grand secret que personne ne connaît ?",
                "Quelle est ta plus grande addiction ?",
                "As-tu déjà été attiré(e) par quelqu'un dans cette pièce ?"
            ]
        }
    };
    // Sélectionne une action ou une vérité aléatoire qui n'a pas encore été utilisée
    var getRandomTask = function (type) {
        var taskList = type === 'action' ? tasks.actions[level] : tasks.verites[level];
        // Filtre les tâches déjà utilisées
        var availableTasks = taskList.filter(function (task) { return !usedTasks.has(task); });
        // Si toutes les tâches ont été utilisées, réinitialiser
        if (availableTasks.length === 0) {
            setUsedTasks(new Set());
            return taskList[Math.floor(Math.random() * taskList.length)];
        }
        var randomTask = availableTasks[Math.floor(Math.random() * availableTasks.length)];
        setUsedTasks(function (prev) { return new Set(__spreadArrays(prev, [randomTask])); });
        return randomTask;
    };
    // Fonctions pour choisir action ou vérité
    var handleChoiceAction = function () {
        setTaskType('action');
        setCurrentTask(getRandomTask('action'));
        setShowChoice(false);
        startAnimation();
    };
    var handleChoiceVerite = function () {
        setTaskType('verite');
        setCurrentTask(getRandomTask('verite'));
        setShowChoice(false);
        startAnimation();
    };
    // Animation pour l'apparition de la tâche
    var startAnimation = function () {
        animation.setValue(0);
        react_native_1.Animated.timing(animation, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true
        }).start();
    };
    // Gère la complétion d'une tâche
    var handleTaskComplete = function (completed) {
        var newScores = __spreadArrays(scores);
        if (completed) {
            newScores[currentPlayerIndex] += 1;
            setScores(newScores);
        }
        // Passe au joueur suivant
        var nextPlayerIndex = (currentPlayerIndex + 1) % playerNames.length;
        setCurrentPlayerIndex(nextPlayerIndex);
        // Si on a fait un tour complet, on incrémente le round
        if (nextPlayerIndex === 0) {
            setRound(round + 1);
            // Vérifie si c'est la fin du jeu (par exemple après 5 tours)
            if (round >= 5) {
                navigation.navigate('Resultats', { playerNames: playerNames, scores: newScores });
                return;
            }
        }
        setShowChoice(true);
    };
    // Animation style
    var animatedStyle = {
        opacity: animation,
        transform: [
            {
                scale: animation.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0.8, 1]
                })
            }
        ]
    };
    // Couleur du niveau
    var getLevelColor = function () {
        switch (level) {
            case 'SOFT': return '#28a745';
            case 'NORMAL': return '#ffc107';
            case 'HARDCORE': return '#dc3545';
            default: return '#28a745';
        }
    };
    return (react_1["default"].createElement(react_native_1.SafeAreaView, { style: styles.container },
        react_1["default"].createElement(react_native_1.View, { style: styles.header },
            react_1["default"].createElement(react_native_1.Text, { style: styles.roundText },
                "Round ",
                round,
                "/5"),
            react_1["default"].createElement(react_native_1.View, { style: [styles.levelBadge, { backgroundColor: getLevelColor() }] },
                react_1["default"].createElement(react_native_1.Text, { style: styles.levelText }, level))),
        react_1["default"].createElement(react_native_1.View, { style: styles.playerInfo },
            react_1["default"].createElement(react_native_1.Text, { style: styles.playerName }, playerNames[currentPlayerIndex]),
            react_1["default"].createElement(react_native_1.Text, { style: styles.scoreText },
                "Score: ",
                scores[currentPlayerIndex])),
        showChoice ? (react_1["default"].createElement(react_native_1.View, { style: styles.choiceContainer },
            react_1["default"].createElement(react_native_1.Text, { style: styles.choiceText }, "Que choisissez-vous ?"),
            react_1["default"].createElement(react_native_1.View, { style: styles.buttonsRow },
                react_1["default"].createElement(react_native_1.TouchableOpacity, { style: [styles.choiceButton, styles.actionButton], onPress: handleChoiceAction },
                    react_1["default"].createElement(MaterialIcons_1["default"], { name: "directions-run", size: 32, color: "white" }),
                    react_1["default"].createElement(react_native_1.Text, { style: styles.choiceButtonText }, "ACTION")),
                react_1["default"].createElement(react_native_1.TouchableOpacity, { style: [styles.choiceButton, styles.veriteButton], onPress: handleChoiceVerite },
                    react_1["default"].createElement(MaterialIcons_1["default"], { name: "question-answer", size: 32, color: "white" }),
                    react_1["default"].createElement(react_native_1.Text, { style: styles.choiceButtonText }, "V\u00C9RIT\u00C9"))))) : (react_1["default"].createElement(react_native_1.Animated.View, { style: [styles.taskContainer, animatedStyle] },
            react_1["default"].createElement(react_native_1.View, { style: [styles.taskTypeIndicator, taskType === 'action' ? styles.actionIndicator : styles.veriteIndicator] },
                react_1["default"].createElement(MaterialIcons_1["default"], { name: taskType === 'action' ? "directions-run" : "question-answer", size: 24, color: "white" }),
                react_1["default"].createElement(react_native_1.Text, { style: styles.taskTypeText }, taskType === 'action' ? "ACTION" : "VÉRITÉ")),
            react_1["default"].createElement(react_native_1.Text, { style: styles.taskText }, currentTask),
            react_1["default"].createElement(react_native_1.View, { style: styles.completionButtons },
                react_1["default"].createElement(react_native_1.TouchableOpacity, { style: [styles.completionButton, styles.failedButton], onPress: function () { return handleTaskComplete(false); } },
                    react_1["default"].createElement(MaterialIcons_1["default"], { name: "close", size: 24, color: "white" }),
                    react_1["default"].createElement(react_native_1.Text, { style: styles.completionButtonText }, "\u00C9CHEC")),
                react_1["default"].createElement(react_native_1.TouchableOpacity, { style: [styles.completionButton, styles.successButton], onPress: function () { return handleTaskComplete(true); } },
                    react_1["default"].createElement(MaterialIcons_1["default"], { name: "check", size: 24, color: "white" }),
                    react_1["default"].createElement(react_native_1.Text, { style: styles.completionButtonText }, "R\u00C9USSI"))))),
        react_1["default"].createElement(react_native_1.View, { style: styles.footer },
            react_1["default"].createElement(react_native_1.TouchableOpacity, { style: styles.exitButton, onPress: function () {
                    react_native_1.Alert.alert("Quitter la partie", "Êtes-vous sûr de vouloir quitter la partie en cours ?", [
                        { text: "Annuler", style: "cancel" },
                        { text: "Quitter", onPress: function () { return navigation.navigate('ChoixJeu'); } }
                    ]);
                } },
                react_1["default"].createElement(MaterialIcons_1["default"], { name: "exit-to-app", size: 20, color: "#000" }),
                react_1["default"].createElement(react_native_1.Text, { style: styles.exitButtonText }, "QUITTER LA PARTIE")))));
};
var styles = react_native_1.StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFD700'
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingTop: 50,
        paddingBottom: 10
    },
    roundText: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    levelBadge: {
        paddingHorizontal: 15,
        paddingVertical: 6,
        borderRadius: 15
    },
    levelText: {
        color: '#FFFFFF',
        fontWeight: 'bold',
        fontSize: 14
    },
    playerInfo: {
        alignItems: 'center',
        marginVertical: 20
    },
    playerName: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#5A3A1B',
        marginBottom: 5
    },
    scoreText: {
        fontSize: 18,
        color: '#333'
    },
    choiceContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20
    },
    choiceText: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 30,
        textAlign: 'center'
    },
    buttonsRow: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%'
    },
    choiceButton: {
        width: '45%',
        height: 120,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
    },
    actionButton: {
        backgroundColor: '#5A3A1B'
    },
    veriteButton: {
        backgroundColor: '#0066CC'
    },
    choiceButtonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 8
    },
    taskContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20
    },
    taskTypeIndicator: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 15,
        paddingVertical: 8,
        borderRadius: 20,
        marginBottom: 20
    },
    actionIndicator: {
        backgroundColor: '#5A3A1B'
    },
    veriteIndicator: {
        backgroundColor: '#0066CC'
    },
    taskTypeText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
        marginLeft: 8
    },
    taskText: {
        fontSize: 22,
        textAlign: 'center',
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 4,
        marginBottom: 30,
        width: '90%'
    },
    completionButtons: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%'
    },
    completionButton: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 12,
        borderRadius: 8,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 3
    },
    failedButton: {
        backgroundColor: '#dc3545'
    },
    successButton: {
        backgroundColor: '#28a745'
    },
    completionButtonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
        marginLeft: 8
    },
    footer: {
        padding: 20
    },
    exitButton: {
        flexDirection: 'row',
        backgroundColor: '#FFFFFF',
        padding: 15,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5
    },
    exitButtonText: {
        color: '#000000',
        fontSize: 16,
        fontWeight: 'bold',
        marginLeft: 8
    }
});
exports["default"] = Partie;
