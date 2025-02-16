"use strict";
exports.__esModule = true;
var react_1 = require("react");
var react_native_1 = require("react-native");
var questions = {
    FACILE: [
        { question: 'Quel est le capital de la France ?', answers: ['Paris', 'Londres', 'Madrid'], correct: 0 },
        { question: 'Combien de continents y a-t-il ?', answers: ['5', '6', '7'], correct: 2 },
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
    var navigation = _a.navigation;
    var _b = react_1.useState(0), currentQuestionIndex = _b[0], setCurrentQuestionIndex = _b[1];
    var _c = react_1.useState(null), selectedAnswer = _c[0], setSelectedAnswer = _c[1];
    var _d = react_1.useState(0), score = _d[0], setScore = _d[1];
    var _e = react_1.useState(20), timeLeft = _e[0], setTimeLeft = _e[1];
    var _f = react_1.useState(true), isQuizActive = _f[0], setIsQuizActive = _f[1];
    var _g = react_1.useState('FACILE'), level = _g[0], setLevel = _g[1]; // Vous pouvez le récupérer d'un state ou d'un contexte
    var _h = react_1.useState(10), questionCount = _h[0], setQuestionCount = _h[1]; // Nombre de questions
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
        }
        else {
            react_native_1.Alert.alert('Félicitations', "Votre score final est " + score + "/" + questionCount, [
                { text: 'OK', onPress: function () { return navigation.navigate('Home'); } }
            ]);
        }
        setSelectedAnswer(null);
        setTimeLeft(level === 'FACILE' ? 20 : level === 'STANDARD' ? 15 : 10); // Timer en fonction du niveau
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
    return (react_1["default"].createElement(react_native_1.View, { style: styles.container },
        react_1["default"].createElement(react_native_1.View, { style: styles.header },
            react_1["default"].createElement(react_native_1.Text, { style: styles.headerText },
                "Question ",
                currentQuestionIndex + 1,
                " / ",
                questionCount),
            react_1["default"].createElement(react_native_1.Text, { style: styles.scoreText },
                "Score: ",
                score),
            react_1["default"].createElement(react_native_1.Text, { style: styles.timerText },
                timeLeft,
                "s")),
        react_1["default"].createElement(react_native_1.View, { style: styles.questionContainer },
            react_1["default"].createElement(react_native_1.Text, { style: styles.questionText }, currentQuestions[currentQuestionIndex].question),
            currentQuestions[currentQuestionIndex].answers.map(function (answer, index) { return (react_1["default"].createElement(react_native_1.TouchableOpacity, { key: index, style: [styles.answerButton, selectedAnswer === index && styles.selectedAnswerButton], onPress: function () { return handleAnswer(index); } },
                react_1["default"].createElement(react_native_1.Text, { style: styles.answerText }, answer))); })),
        react_1["default"].createElement(react_native_1.View, { style: styles.footer },
            react_1["default"].createElement(react_native_1.TouchableOpacity, { style: styles.nextButton, onPress: nextQuestion, disabled: selectedAnswer === null },
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
        backgroundColor: '#FFD700'
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginBottom: 20
    },
    headerText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#008000'
    },
    scoreText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#0000FF'
    },
    timerText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#FF0000'
    },
    questionContainer: {
        alignItems: 'center',
        marginVertical: 20
    },
    questionText: {
        fontSize: 22,
        textAlign: 'center',
        marginBottom: 20,
        fontWeight: 'bold',
        color: '#000000'
    },
    answerButton: {
        backgroundColor: '#5A3A1B',
        padding: 20,
        width: '80%',
        alignItems: 'center',
        borderRadius: 10,
        marginVertical: 10,
        transition: 'all 0.3s ease'
    },
    selectedAnswerButton: {
        backgroundColor: '#28a745'
    },
    answerText: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: 'bold'
    },
    footer: {
        width: '100%',
        alignItems: 'center'
    },
    nextButton: {
        backgroundColor: '#28a745',
        padding: 20,
        marginVertical: 15,
        width: '80%',
        alignItems: 'center',
        borderRadius: 10
    },
    quitButton: {
        backgroundColor: '#dc3545',
        padding: 20,
        marginVertical: 10,
        width: '80%',
        alignItems: 'center',
        borderRadius: 10
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: 'bold'
    }
});
exports["default"] = QuizSolo;
