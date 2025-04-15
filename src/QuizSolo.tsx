import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, SafeAreaView } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';

type RootStackParamList = {
  Home: undefined;
  QuizSolo: undefined;
  BilanQuizSolo: { score: number; totalQuestions: number; playerName: string };
};

type QuizSoloScreenNavigationProp = StackNavigationProp<RootStackParamList, 'QuizSolo'>;
type QuizSoloScreenRouteProp = RouteProp<RootStackParamList, 'QuizSolo'>;

type Props = {
  navigation: QuizSoloScreenNavigationProp;
  route: QuizSoloScreenRouteProp;
};

const questions = {
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
    // ... autres questions STANDARD ...
  ],
  DIFFICILE: [
    { question: 'Qui a découvert l\'électricité ?', answers: ['Einstein', 'Tesla', 'Franklin'], correct: 1 },
    { question: 'Quel est le plus grand océan ?', answers: ['Atlantique', 'Pacifique', 'Indien'], correct: 1 },
    // ... autres questions DIFFICILE ...
  ]
};

const QuizSolo: React.FC<Props> = ({ navigation, route }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(20);
  const [isQuizActive, setIsQuizActive] = useState(true);
  const [level, setLevel] = useState('FACILE');
  const [questionCount, setQuestionCount] = useState(10);
  const [playerName, setPlayerName] = useState('JoueurXYZ'); // Nom du joueur par défaut

  const currentQuestions = questions[level as keyof typeof questions];

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
      setSelectedAnswer(null);
      setTimeLeft(level === 'FACILE' ? 20 : level === 'STANDARD' ? 15 : 10);
    } else {
      // Quiz terminé, naviguer vers la page BilanQuiz
      setIsQuizActive(false);
      navigation.navigate('BilanQuizSolo', {
        score: score,
        totalQuestions: questionCount,
        playerName: playerName
      });
    }
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
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Question {currentQuestionIndex + 1} / {questionCount}</Text>
        <View style={styles.timeContainer}>
          <Text style={styles.timerText}>{timeLeft}</Text>
        </View>
        <Text style={styles.scoreText}>Score: {score}</Text>
      </View>

      <View style={styles.questionContainer}>
        <Text style={styles.questionText}>{currentQuestions[currentQuestionIndex].question}</Text>
        
        {currentQuestions[currentQuestionIndex].answers.map((answer, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.answerButton, 
              selectedAnswer === index && 
              (index === currentQuestions[currentQuestionIndex].correct 
                ? styles.correctAnswerButton 
                : styles.wrongAnswerButton)
            ]}
            onPress={() => handleAnswer(index)}
            disabled={selectedAnswer !== null}
          >
            <Text style={styles.answerText}>{answer}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.footer}>
        <TouchableOpacity
          style={[styles.nextButton, selectedAnswer === null && styles.disabledButton]}
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
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'white',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginTop: 20,
    marginBottom: 30,
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#555555',
  },
  timeContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: '#FF6B6B',
    justifyContent: 'center',
    alignItems: 'center',
  },
  timerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FF6B6B',
  },
  scoreText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#555555',
  },
  questionContainer: {
    alignItems: 'center',
    width: '100%',
    flex: 1,
    justifyContent: 'center',
  },
  questionText: {
    fontSize: 22,
    textAlign: 'center',
    marginBottom: 30,
    fontWeight: 'bold',
    color: '#333333',
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
    shadowRadius: 2,
  },
  correctAnswerButton: {
    backgroundColor: '#4ECDC4',
    borderColor: '#4ECDC4',
  },
  wrongAnswerButton: {
    backgroundColor: '#FF6B6B',
    borderColor: '#FF6B6B',
  },
  answerText: {
    color: '#333333',
    fontSize: 16,
    fontWeight: '500',
  },
  footer: {
    width: '100%',
    alignItems: 'center',
    marginTop: 20,
  },
  nextButton: {
    backgroundColor: '#4ECDC4',
    padding: 15,
    marginVertical: 10,
    width: '100%',
    alignItems: 'center',
    borderRadius: 25,
  },
  disabledButton: {
    backgroundColor: '#CCCCCC',
  },
  quitButton: {
    backgroundColor: '#FF6B6B',
    padding: 15,
    marginVertical: 10,
    width: '100%',
    alignItems: 'center',
    borderRadius: 25,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default QuizSolo;