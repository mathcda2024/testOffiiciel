import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet ,Alert} from 'react-native';
import type { StackScreenProps } from '@react-navigation/stack';
//import { JeuScreenProps } from './types'; // Assure-toi que le chemin du fichier est correct

type RootStackParamList = {
  Home: undefined;
  Jeu: { players: number[]; level: string };
};

type JeuScreenProps = StackScreenProps<RootStackParamList, 'Jeu'>;

const Jeu = ({ route, navigation }: JeuScreenProps) => {
  const { players = [1, 2], level } = route.params || {};
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const [gameState, setGameState] = useState('pseudo');
  const [newPseudo, setNewPseudo] = useState('');
  const [timeLeft, setTimeLeft] = useState(15);
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [questions, setQuestions] = useState<any[]>([]);
  const [currentAction, setCurrentAction] = useState('');
  const [currentAnswers, setCurrentAnswers] = useState<string[]>([]);
  const [score, setScore] = useState(0); // État pour le score


const ConfirmTerm = () => {
  Alert.alert(
    "Voulez-vous vraiment quitter ?", // Titre du pop-up
    "Toutes les données seront perdues.", // Message du pop-up
    [
      {
        text: "Annuler", // Bouton Annuler
        onPress: () => console.log("Annulation de la fin du jeu"), // Pas d'action, juste fermer le pop-up
        style: "cancel"
      },
      {
        text: "Oui", // Bouton Confirmer
        onPress: () => navigation.navigate('Home'), // Redirige vers l'écran d'accueil
      }
    ],
    { cancelable: false } // Ne pas fermer le pop-up quand on clique en dehors
  );
};



  // Mélange des réponses
  const shuffleAnswers = (answers: string[]) => {
    for (let i = answers.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [answers[i], answers[j]] = [answers[j], answers[i]]; // Échange des éléments
    }
    return answers;
  };

  // Génération des questions
  const generateQuestions = (numQuestions: number) => {
    const allQuestions = [
      {
        question: 'Quelle est la capitale de la France ?',
        answers: ['Paris', 'Lyon', 'Marseille', 'Nice'],
        correctAnswer: 'Paris'
      },
      {
        question: 'Quel est le plus grand océan du monde ?',
        answers: ['Atlantique', 'Indien', 'Pacifique', 'Arctique'],
        correctAnswer: 'Pacifique'
      },
      {
        question: 'Quelle est la langue officielle du Japon ?',
        answers: ['Chinois', 'Coréen', 'Japonais', 'Vietnamien'],
        correctAnswer: 'Japonais'
      },
       {
    question: 'Quel est le plus long fleuve du monde ?',
    answers: ['Nil', 'Amazonie', 'Mississippi', 'Yangtsé'],
    correctAnswer: 'Amazonie'
  },
  {
    question: 'Qui a peint la Joconde ?',
    answers: ['Van Gogh', 'Monet', 'Léonard de Vinci', 'Picasso'],
    correctAnswer: 'Léonard de Vinci'
  },
  {
    question: 'Quelle est la monnaie officielle du Royaume-Uni ?',
    answers: ['Euro', 'Dollar', 'Livre Sterling', 'Yen'],
    correctAnswer: 'Livre Sterling'
  },
  {
    question: 'Combien de continents y a-t-il sur Terre ?',
    answers: ['5', '6', '7', '8'],
    correctAnswer: '7'
  },
  {
    question: 'Quel est l’élément chimique représenté par le symbole O ?',
    answers: ['Or', 'Oxygène', 'Osmium', 'Oxonium'],
    correctAnswer: 'Oxygène'
      },
  
   {
    question: 'Qui est l’auteur de "Harry Potter" ?',
    answers: ['J.R.R. Tolkien', 'J.K. Rowling', 'Stephen King', 'George R.R. Martin'],
    correctAnswer: 'J.K. Rowling'
  },
  {
    question: 'Quelle planète est surnommée la planète rouge ?',
    answers: ['Jupiter', 'Mars', 'Vénus', 'Saturne'],
    correctAnswer: 'Mars'
  },
  {
    question: 'Quel est l’animal terrestre le plus rapide ?',
    answers: ['Guépard', 'Lion', 'Antilope', 'Léopard'],
    correctAnswer: 'Guépard'
  },
  {
    question: 'Quelle est la langue la plus parlée dans le monde ?',
    answers: ['Anglais', 'Espagnol', 'Chinois', 'Français'],
    correctAnswer: 'Chinois'
  },
  {
    question: 'Quel est l’océan le plus vaste ?',
    answers: ['Atlantique', 'Pacifique', 'Indien', 'Arctique'],
    correctAnswer: 'Pacifique'
  },
  {
    question: 'Quel pays a remporté la Coupe du Monde de football en 2018 ?',
    answers: ['Brésil', 'Allemagne', 'France', 'Argentine'],
    correctAnswer: 'France'
  },
  {
    question: 'Quelle est la plus haute montagne du monde ?',
    answers: ['Mont Blanc', 'Kilimandjaro', 'Everest', 'Annapurna'],
    correctAnswer: 'Everest'
  },
  {
    question: 'Quelle est la capitale de l’Italie ?',
    answers: ['Madrid', 'Berlin', 'Rome', 'Athènes'],
    correctAnswer: 'Rome'
  },
  {
    question: 'Qui a découvert l’Amérique en 1492 ?',
    answers: ['Marco Polo', 'Christophe Colomb', 'Magellan', 'Vasco de Gama'],
    correctAnswer: 'Christophe Colomb'
  },
  {
    question: 'Combien de jours y a-t-il dans une année bissextile ?',
    answers: ['364', '365', '366', '367'],
    correctAnswer: '366'
  },
  {
    question: 'Quel est l’instrument de musique associé à Ludwig van Beethoven ?',
    answers: ['Guitare', 'Piano', 'Violon', 'Flûte'],
    correctAnswer: 'Piano'
  },
  {
    question: 'Dans quel pays se trouve la grande muraille ?',
    answers: ['Inde', 'Japon', 'Chine', 'Russie'],
    correctAnswer: 'Chine'
  },
  {
    question: 'Quelle est la capitale du Canada ?',
    answers: ['Toronto', 'Vancouver', 'Ottawa', 'Montréal'],
    correctAnswer: 'Ottawa'
  },
  {
    question: 'Quel gaz respirons-nous principalement ?',
    answers: ['Oxygène', 'Azote', 'Dioxyde de carbone', 'Hydrogène'],
    correctAnswer: 'Azote'
  },
  {
    question: 'Qui a écrit "Les Misérables" ?',
    answers: ['Victor Hugo', 'Gustave Flaubert', 'Émile Zola', 'Alexandre Dumas'],
    correctAnswer: 'Victor Hugo'
  },
  {
    question: 'Combien de pattes a une araignée ?',
    answers: ['4', '6', '8', '10'],
    correctAnswer: '8'
  },
  {
    question: 'Quel est l’organe principal du système circulatoire ?',
    answers: ['Cerveau', 'Poumon', 'Foie', 'Cœur'],
    correctAnswer: 'Cœur'
  },
  {
    question: 'Quelle est la couleur du sang oxygéné dans notre corps ?',
    answers: ['Rouge', 'Bleu', 'Vert', 'Violet'],
    correctAnswer: 'Rouge'
  },
  {
    question: 'Quelle est la capitale de l’Espagne ?',
    answers: ['Barcelone', 'Madrid', 'Séville', 'Valence'],
    correctAnswer: 'Madrid'
  },
  {
    question: 'Quel est l’animal emblématique de l’Australie ?',
    answers: ['Panda', 'Kangourou', 'Éléphant', 'Tigre'],
    correctAnswer: 'Kangourou'
  },
  {
    question: 'Combien de joueurs composent une équipe de football sur le terrain ?',
    answers: ['9', '10', '11', '12'],
    correctAnswer: '11'
  },
  {
    question: 'Quel est le plus grand désert du monde ?',
    answers: ['Sahara', 'Gobi', 'Antarctique', 'Mojave'],
    correctAnswer: 'Antarctique'
  },
  {
    question: 'Quel est le symbole chimique du fer ?',
    answers: ['Fe', 'F', 'I', 'Ir'],
    correctAnswer: 'Fe'
  },
  {
    question: 'Dans quelle ville se trouve la statue de la Liberté ?',
    answers: ['Los Angeles', 'Washington', 'New York', 'Chicago'],
    correctAnswer: 'New York'
  },
  {
    question: 'Quel est le plus grand mammifère marin ?',
    answers: ['Requin blanc', 'Dauphin', 'Orque', 'Baleine bleue'],
    correctAnswer: 'Baleine bleue'
  },
  {
    question: 'Quel est le pays d’origine du sushi ?',
    answers: ['Chine', 'Corée du Sud', 'Japon', 'Thaïlande'],
    correctAnswer: 'Japon'
  },
  {
    question: 'Quelle est la capitale de l’Allemagne ?',
    answers: ['Munich', 'Francfort', 'Berlin', 'Hambourg'],
    correctAnswer: 'Berlin'
  },
  {
    question: 'Combien d’heures y a-t-il dans une journée ?',
    answers: ['12', '24', '36', '48'],
    correctAnswer: '24'
  },
  {
    question: 'Quel est le plus grand continent en superficie ?',
    answers: ['Europe', 'Afrique', 'Asie', 'Amérique du Nord'],
    correctAnswer: 'Asie'
  },
  {
    question: 'Qui a écrit "Roméo et Juliette" ?',
    answers: ['Victor Hugo', 'Molière', 'Shakespeare', 'Balzac'],
    correctAnswer: 'Shakespeare'
  },
  {
    question: 'Quelle est la planète la plus proche du Soleil ?',
    answers: ['Venus', 'Terre', 'Mercure', 'Mars'],
    correctAnswer: 'Mercure'
  },
  {
    question: 'Quel est l’animal qui vit le plus longtemps ?',
    answers: ['Éléphant', 'Baleine bleue', 'Tortue des Galápagos', 'Perroquet'],
    correctAnswer: 'Tortue des Galápagos'
  },
  {
    question: 'Quel est le sport le plus pratiqué dans le monde ?',
    answers: ['Basketball', 'Tennis', 'Football', 'Cricket'],
    correctAnswer: 'Football'
  },
  {
    question: 'Qui a inventé l’ampoule électrique ?',
    answers: ['Nikola Tesla', 'Albert Einstein', 'Thomas Edison', 'Isaac Newton'],
    correctAnswer: 'Thomas Edison'
  },
  {
    question: 'Quelle est la capitale de la Russie ?',
    answers: ['Saint-Pétersbourg', 'Moscou', 'Kiev', 'Varsovie'],
    correctAnswer: 'Moscou'
  }
      // Ajoute d'autres questions ici
    ];

    const randomizedQuestions = [];
    for (let i = 0; i < numQuestions; i++) {
      const randomIndex = Math.floor(Math.random() * allQuestions.length);
      const question = allQuestions[randomIndex];
      const shuffledAnswers = shuffleAnswers([...question.answers]);
      randomizedQuestions.push({ ...question, answers: shuffledAnswers });
    }

    return randomizedQuestions;
  };

  // Initialiser les questions
  useEffect(() => {
    const generatedQuestions = generateQuestions(30); // Générer 30 questions
    setQuestions(generatedQuestions);
  }, []);

  // Récupérer une question actuelle
  useEffect(() => {
    if (questions.length > 0 && currentPlayerIndex < questions.length) {
      const currentQuestion = questions[currentPlayerIndex];
      if (currentQuestion) {
        setCurrentAction(currentQuestion.question);
        setCurrentAnswers(currentQuestion.answers);
      }
    }
  }, [currentPlayerIndex, questions]);

  // Logique du tour suivant
  const handleNextTurn = useCallback(() => {
    setCurrentPlayerIndex((prevIndex) => (prevIndex + 1) % players.length);
    setTimeLeft(15);
    setIsTimerActive(true);
  }, [players.length]);

  useEffect(() => {
    if (timeLeft === 0) {
      handleNextTurn();
    }
  }, [timeLeft, handleNextTurn]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isTimerActive && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [timeLeft, isTimerActive]);

 /* const handleEndGame = () => {
    navigation.navigate('Home');
  };*/

  

  const handleAnswer = (answer: string) => {
    const currentQuestion = questions[currentPlayerIndex];
    if (currentQuestion.correctAnswer === answer) {
      setScore((prevScore) => prevScore + 1); // Incrémente le score si la réponse est correcte
    }
    handleNextTurn();
  };

  return (
    <View style={styles.container}>
      {gameState === 'pseudo' ? (
        <View style={styles.pseudoContainer}>
          <Text style={styles.title}>Entrez votre pseudo</Text>
          <TextInput
            style={styles.input}
            placeholder="Pseudo"
            value={newPseudo}
            onChangeText={setNewPseudo}
          />
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              setGameState('enCours');
              setIsTimerActive(true);
              handleNextTurn();
            }}
          >
            <Text style={styles.buttonText}>Valider</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.gameContainer}>
          <View style={styles.timerContainer}>
            <View style={styles.timerCircle}>
              <Text style={styles.timerText}>{timeLeft}</Text>
            </View>
          </View>

          <Text style={styles.questionNumber}>QUESTION {currentPlayerIndex + 1}</Text>

          <View style={styles.questionBox}>
            <Text style={styles.questionText}>{currentAction}</Text>
          </View>

          {currentAnswers.map((answer, index) => (
            <TouchableOpacity
              key={index}
              style={styles.answerButton}
              onPress={() => handleAnswer(answer)}
            >
              <Text style={styles.answerText}>{answer}</Text>
            </TouchableOpacity>
          ))}

          <View style={styles.scoreContainer}>
            <Text style={styles.scoreText}>Score : {score}</Text>
          </View>

       <TouchableOpacity style={[styles.button, styles.endButton]} onPress={ConfirmTerm}>
  <Text style={styles.buttonText}>Terminer</Text>
</TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 40
  },
  gameContainer: {
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: 20
  },
  timerContainer: {
    alignItems: 'center',
    marginBottom: 20
  },
  timerCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 3,
    borderColor: '#ff6b6b',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white'
  },
  timerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ff6b6b'
  },
  questionNumber: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#666',
    marginBottom: 10
  },
  questionBox: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    width: '100%',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3
  },
  questionText: {
    fontSize: 16,
    color: '#ff6b6b',
    textAlign: 'center'
  },
  answerButton: {
    backgroundColor: '#5ee7df',
    width: '100%',
    padding: 15,
    borderRadius: 25,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2
  },
  answerText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  scoreContainer: {
    marginTop: 20,
    alignItems: 'center'
  },
  scoreText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ff6b6b'
  },
  pseudoContainer: {
    width: '100%',
    padding: 20,
    alignItems: 'center'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: 'white',
    borderRadius: 25,
    paddingHorizontal: 20,
    marginBottom: 20
  },
  button: {
    backgroundColor: '#5ee7df',
     width: '100%',
    padding: 15,
    borderRadius: 25,
    alignItems: 'center'
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold'
  },
  endButton: {
    marginTop: 20,
    backgroundColor: '#ff6b6b'
  }
});

export default Jeu;
