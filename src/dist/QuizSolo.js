"use strict";
exports.__esModule = true;
var react_1 = require("react");
var react_native_1 = require("react-native");
var questions = {
    FACILE: [
        { question: 'Quel est le capital de la France ?', answers: ['Paris', 'Londres', 'Madrid'], correct: 0 },
        { question: 'Combien de continents y a-t-il ?', answers: ['5', '6', '7'], correct: 2 },
        {
            question: 'Quel est le plus grand océan du monde ?',
            answers: ['Océan Atlantique', 'Océan Pacifique', 'Océan Indien'],
            correct: 1
        },
        {
            question: 'En quelle année l homme a t il marché sur la Lune pour la première fois ?',
            answers: ['1965', '1969', '1972'],
            correct: 1
        },
        {
            question: 'Quelle est la capitale de lAustralie ?',
            answers: ['Sydney', 'Melbourne', 'Canberra'],
            correct: 2
        },
        {
            question: 'Combien de pattes a une araignée ?',
            answers: ['6', '8', '10'],
            correct: 1
        },
        {
            question: 'Quelle est la planète la plus proche du Soleil ?',
            answers: ['Mercure', 'Vénus', 'Mars'],
            correct: 0
        },
        {
            question: 'Quel est l élément chimique dont le symbole est "O" ?',
            answers: ['Or', 'Oxygène', 'Osmium'],
            correct: 1
        },
        {
            question: 'Qui a peint La Joconde ?',
            answers: ['Michel-Ange', 'Léonard de Vinci', 'Raphaël'],
            correct: 1
        },
        {
            question: 'Quel pays a inventé les sushis ?',
            answers: ['Chine', 'Corée du Sud', 'Japon'],
            correct: 2
        },
        {
            question: 'Combien de joueurs y a-t-il dans une équipe de football ?',
            answers: ['9', '10', '11'],
            correct: 2
        },
        {
            question: 'Quelle est la langue la plus parlée dans le monde ?',
            answers: ['Anglais', 'Chinois mandarin', 'Espagnol'],
            correct: 1
        },
        {
            question: 'Quel est le plus grand désert du monde ?',
            answers: ['Sahara', 'Antarctique', 'Gobi'],
            correct: 1
        },
        {
            question: 'Quelle est la capitale du Canada ?',
            answers: ['Toronto', 'Vancouver', 'Ottawa'],
            correct: 2
        },
    ],
    STANDARD: [
        { question: 'Qui a écrit "Les Misérables" ?', answers: ['Victor Hugo', 'Émile Zola', 'Flaubert'], correct: 0 },
        { question: 'Quelle est la monnaie du Japon ?', answers: ['Yuan', 'Won', 'Yen'], correct: 2 },
    ],
    DIFFICILE: [
        { question: 'Qui a découvert l\'électricité ?', answers: ['Einstein', 'Tesla', 'Franklin'], correct: 1 },
        { question: 'Quel est le plus grand océan ?', answers: ['Atlantique', 'Pacifique', 'Indien'], correct: 1 },
    ]
};
var QuizSolo = function (_a) {
    var navigation = _a.navigation, route = _a.route;
    var _b = react_1.useState(0), currentQuestionIndex = _b[0], setCurrentQuestionIndex = _b[1];
    var _c = react_1.useState(null), selectedAnswer = _c[0], setSelectedAnswer = _c[1];
    var _d = react_1.useState(0), score = _d[0], setScore = _d[1];
    var _e = react_1.useState(20), timeLeft = _e[0], setTimeLeft = _e[1];
    var _f = react_1.useState(true), isQuizActive = _f[0], setIsQuizActive = _f[1];
    var _g = react_1.useState('FACILE'), level = _g[0], setLevel = _g[1];
    var _h = react_1.useState(10), questionCount = _h[0], setQuestionCount = _h[1];
    var _j = react_1.useState('JoueurXYZ'), playerName = _j[0], setPlayerName = _j[1]; // Nom du joueur par défaut
    var currentQuestions = questions[level];
    react_1.useEffect(function () {
        if (isQuizActive) {
            var timer_1 = setInterval(function () {
                setTimeLeft(function (prevTime) {
                    if (prevTime === 0) {
                        nextQuestion();
                        return 20; // Réinitialiser le timer
                    }
                    return prevTime - 1;
                });
            }, 1000);
            return function () { return clearInterval(timer_1); };
        }
    }, [timeLeft, isQuizActive]);
    var nextQuestion = function () {
        if (selectedAnswer === currentQuestions[currentQuestionIndex].correct) {
            setScore(score + 1);
        }
        if (currentQuestionIndex < questionCount - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
            setSelectedAnswer(null);
            setTimeLeft(level === 'FACILE' ? 20 : level === 'STANDARD' ? 15 : 10);
        }
        else {
            // Quiz terminé, naviguer vers la page BilanQuiz
            setIsQuizActive(false);
            navigation.navigate('BilanQuizSolo', {
                score: score,
                totalQuestions: questionCount,
                playerName: playerName
            });
        }
    };
    var handleAnswer = function (index) {
        setSelectedAnswer(index);
    };
    var handleQuit = function () {
        react_native_1.Alert.alert('Quitter la partie', 'Êtes-vous sûr de vouloir quitter ?', [
            { text: 'Annuler', style: 'cancel' },
            { text: 'Oui', onPress: function () { return navigation.navigate('Home'); } }
        ]);
    };
    return (react_1["default"].createElement(react_native_1.SafeAreaView, { style: styles.container },
        react_1["default"].createElement(react_native_1.View, { style: styles.header },
            react_1["default"].createElement(react_native_1.Text, { style: styles.headerText },
                "Question ",
                currentQuestionIndex + 1,
                " / ",
                questionCount),
            react_1["default"].createElement(react_native_1.View, { style: styles.timeContainer },
                react_1["default"].createElement(react_native_1.Text, { style: styles.timerText }, timeLeft)),
            react_1["default"].createElement(react_native_1.Text, { style: styles.scoreText },
                "Score: ",
                score)),
        react_1["default"].createElement(react_native_1.View, { style: styles.questionContainer },
            react_1["default"].createElement(react_native_1.Text, { style: styles.questionText }, currentQuestions[currentQuestionIndex].question),
            currentQuestions[currentQuestionIndex].answers.map(function (answer, index) { return (react_1["default"].createElement(react_native_1.TouchableOpacity, { key: index, style: [
                    styles.answerButton,
                    selectedAnswer === index &&
                        (index === currentQuestions[currentQuestionIndex].correct
                            ? styles.correctAnswerButton
                            : styles.wrongAnswerButton)
                ], onPress: function () { return handleAnswer(index); }, disabled: selectedAnswer !== null },
                react_1["default"].createElement(react_native_1.Text, { style: styles.answerText }, answer))); })),
        react_1["default"].createElement(react_native_1.View, { style: styles.footer },
            react_1["default"].createElement(react_native_1.TouchableOpacity, { style: [styles.nextButton, selectedAnswer === null && styles.disabledButton], onPress: nextQuestion, disabled: selectedAnswer === null },
                react_1["default"].createElement(react_native_1.Text, { style: styles.buttonText }, "Suivant")),
            react_1["default"].createElement(react_native_1.TouchableOpacity, { style: styles.quitButton, onPress: handleQuit },
                react_1["default"].createElement(react_native_1.Text, { style: styles.buttonText }, "Quitter")))));
};
var styles = react_native_1.StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 20,
        backgroundColor: 'white'
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        marginTop: 20,
        marginBottom: 30
    },
    headerText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#555555'
    },
    timeContainer: {
        width: 60,
        height: 60,
        borderRadius: 30,
        borderWidth: 2,
        borderColor: '#FF6B6B',
        justifyContent: 'center',
        alignItems: 'center'
    },
    timerText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#FF6B6B'
    },
    scoreText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#555555'
    },
    questionContainer: {
        alignItems: 'center',
        width: '100%',
        flex: 1,
        justifyContent: 'center'
    },
    questionText: {
        fontSize: 22,
        textAlign: 'center',
        marginBottom: 30,
        fontWeight: 'bold',
        color: '#333333'
    },
    answerButton: {
        backgroundColor: 'white',
        padding: 15,
        width: '100%',
        alignItems: 'center',
        borderRadius: 10,
        marginVertical: 8,
        borderWidth: 1,
        borderColor: '#DDDDDD',
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2
    },
    correctAnswerButton: {
        backgroundColor: '#4ECDC4',
        borderColor: '#4ECDC4'
    },
    wrongAnswerButton: {
        backgroundColor: '#FF6B6B',
        borderColor: '#FF6B6B'
    },
    answerText: {
        color: '#333333',
        fontSize: 16,
        fontWeight: '500'
    },
    footer: {
        width: '100%',
        alignItems: 'center',
        marginTop: 20
    },
    nextButton: {
        backgroundColor: '#4ECDC4',
        padding: 15,
        marginVertical: 10,
        width: '100%',
        alignItems: 'center',
        borderRadius: 25
    },
    disabledButton: {
        backgroundColor: '#CCCCCC'
    },
    quitButton: {
        backgroundColor: '#FF6B6B',
        padding: 15,
        marginVertical: 10,
        width: '100%',
        alignItems: 'center',
        borderRadius: 25
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold'
    }
});
exports["default"] = QuizSolo;
