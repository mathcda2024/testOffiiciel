import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';

const questions = {
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

const QuizSolo: React.FC = ({ navigation }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(20);
  const [isQuizActive, setIsQuizActive] = useState(true);
  const [level, setLevel] = useState('FACILE'); // Vous pouvez le récupérer d'un state ou d'un contexte
  const [questionCount, setQuestionCount] = useState(10); // Nombre de questions

  const currentQuestions = questions[level];

  useEffect(() => {
    if (isQuizActive) {
      const timer = setInterval(() => {
        setTimeLeft(prevTime => {
          if (prevTime === 0) {
            nextQuestion();
            return 20; // Réinitialiser le timer
          }
          return prevTime - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [timeLeft, isQuizActive]);

  const nextQuestion = () => {
    if (selectedAnswer === currentQuestions[currentQuestionIndex].correct) {
      setScore(score + 1);
    }
    if (currentQuestionIndex < questionCount - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      Alert.alert('Félicitations', `Votre score final est ${score}/${questionCount}`, [
        { text: 'OK', onPress: () => navigation.navigate('Home') }
      ]);
    }
    setSelectedAnswer(null);
    setTimeLeft(level === 'FACILE' ? 20 : level === 'STANDARD' ? 15 : 10); // Timer en fonction du niveau
  };

  const handleAnswer = (index: number) => {
    setSelectedAnswer(index);
  };

  const handleQuit = () => {
    Alert.alert('Quitter la partie', 'Êtes-vous sûr de vouloir quitter ?', [
      { text: 'Annuler', style: 'cancel' },
      { text: 'Oui', onPress: () => navigation.navigate('Home') }
    ]);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Question {currentQuestionIndex + 1} / {questionCount}</Text>
        <Text style={styles.scoreText}>Score: {score}</Text>
        <Text style={styles.timerText}>{timeLeft}s</Text>
      </View>

      <View style={styles.questionContainer}>
        <Text style={styles.questionText}>{currentQuestions[currentQuestionIndex].question}</Text>
        {currentQuestions[currentQuestionIndex].answers.map((answer, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.answerButton, selectedAnswer === index && styles.selectedAnswerButton]}
            onPress={() => handleAnswer(index)}
          >
            <Text style={styles.answerText}>{answer}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.nextButton}
          onPress={nextQuestion}
          disabled={selectedAnswer === null}
        >
          <Text style={styles.buttonText}>Suivant</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.quitButton}
          onPress={handleQuit}
        >
          <Text style={styles.buttonText}>Quitter</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#FFD700', // Doré
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 20,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#008000', // Vert
  },
  scoreText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#0000FF', // Bleu
  },
  timerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FF0000', // Rouge
  },
  questionContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  questionText: {
    fontSize: 22,
    textAlign: 'center',
    marginBottom: 20,
    fontWeight: 'bold',
    color: '#000000', // Noir
  },
  answerButton: {
    backgroundColor: '#5A3A1B', // Couleur de fond pour chaque bouton de réponse
    padding: 20,
    width: '80%',
    alignItems: 'center',
    borderRadius: 10,
    marginVertical: 10,
    transition: 'all 0.3s ease', // Ajout d'un effet de transition au survol
  },
  selectedAnswerButton: {
    backgroundColor: '#28a745', // Vert pour la bonne réponse
  },
  answerText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  footer: {
    width: '100%',
    alignItems: 'center',
  },
  nextButton: {
    backgroundColor: '#28a745', // Vert pour "Suivant"
    padding: 20,
    marginVertical: 15,
    width: '80%',
    alignItems: 'center',
    borderRadius: 10,
  },
  quitButton: {
    backgroundColor: '#dc3545', // Rouge pour "Quitter"
    padding: 20,
    marginVertical: 10,
    width: '80%',
    alignItems: 'center',
    borderRadius: 10,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default QuizSolo;


