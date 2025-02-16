import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet, Alert } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../App'; // Importer RootStackParamList
import AntDesign from 'react-native-vector-icons/AntDesign';

type RootStackParamList = {
  Jeu: { players: number; level: string };  // Déclarez bien le type des paramètres pour la page Jeu
};

type Props = StackScreenProps<RootStackParamList, 'Jeu'>; // Typage des props
/*type Props = {
  navigation: JeuScreenNavigationProp;
};*/

const Jeu: React.FC<Props> = ({ route, navigation }) => {
  const { players, level } = route.params;
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const [gameState, setGameState] = useState('pseudo'); // 'pseudo', 'enCours', 'finie'
  const [playerNames, setPlayerNames] = useState<string[]>(new Array(players.length).fill('')); // Pseudos des joueurs
  const [currentAction, setCurrentAction] = useState('');
  const [newPseudo, setNewPseudo] = useState('');

  const handleNextTurn = () => {
    setCurrentPlayerIndex((prevIndex) => (prevIndex + 1) % players.length);
  };

  const handleEndGame = () => {
    setGameState('finie');
    Alert.alert('Fin du jeu', 'Le jeu est terminé. Vous avez tous joué !', [
      { text: 'OK', onPress: () => navigation.navigate('Home') },
    ]);
  };

  const getActionForPlayer = () => {
    const actions = {
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
      ],
    };

    const truths = {
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
      ],
    };

    const allOptions = [...actions[level], ...truths[level]];

    const randomOption = allOptions[Math.floor(Math.random() * allOptions.length)];

    setCurrentAction(randomOption);
  };

  const handleSetPlayerName = () => {
    if (newPseudo.trim() === '') {
      Alert.alert('Erreur', 'Veuillez entrer un pseudo valide.');
    } else {
      const updatedPlayerNames = [...playerNames];
      updatedPlayerNames[currentPlayerIndex] = newPseudo;
      setPlayerNames(updatedPlayerNames);
      setNewPseudo('');
      if (currentPlayerIndex === players.length - 1) {
        setGameState('enCours');
      } else {
        setCurrentPlayerIndex((prevIndex) => prevIndex + 1);
      }
    }
  };

  useEffect(() => {
    if (gameState === 'enCours') {
      getActionForPlayer();
    }
  }, [gameState, currentPlayerIndex, level]);

  // Style partagé pour tous les boutons ayant la même taille
  const sharedButtonStyle = {
    backgroundColor: '#5A3A1B',
    padding: 15,
    marginVertical: 10,
    width: '90%', // Largeur partagée
    alignItems: 'center',
    borderRadius: 5,
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
          <TouchableOpacity style={sharedButtonStyle} onPress={handleSetPlayerName}>
            <Text style={styles.buttonText}>Valider</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <>
          {/* Score et numéro de la question */}
          <View style={styles.scoreContainer}>
            <Text style={styles.scoreText}>Question {currentPlayerIndex + 1}</Text>
            <Text style={styles.scoreText}>Score: {currentPlayerIndex * 10}</Text>
          </View>

          {/* Encadré pour la question */}
          <View style={styles.questionContainer}>
            <Text style={styles.actionText}>{currentAction}</Text>
          </View>

          {/* Bouton Suivant */}
          <TouchableOpacity style={sharedButtonStyle} onPress={handleNextTurn}>
            <Text style={styles.buttonText}>Suivant</Text>
          </TouchableOpacity>

          {/* Bouton Terminer le jeu */}
          <TouchableOpacity style={[sharedButtonStyle, styles.endButton]} onPress={handleEndGame}>
            <Text style={styles.buttonText}>Terminer le Jeu</Text>
          </TouchableOpacity>

          {/* Ajouter ici vos boutons de réponse avec le même style */}
          <TouchableOpacity style={sharedButtonStyle}>
            <Text style={styles.buttonText}>Réponse 1</Text>
          </TouchableOpacity>

          <TouchableOpacity style={sharedButtonStyle}>
            <Text style={styles.buttonText}>Réponse 2</Text>
          </TouchableOpacity>

          <TouchableOpacity style={sharedButtonStyle}>
            <Text style={styles.buttonText}>Réponse 3</Text>
          </TouchableOpacity>

          <View style={styles.footer}>
            <Text style={styles.footerText}>Niveau : {level}</Text>
          </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFD700',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 60,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    width: '80%',
    marginBottom: 20,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  endButton: {
    backgroundColor: '#FF5733',
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
    elevation: 3,
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
    elevation: 3,
  },
  scoreText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  actionText: {
    fontSize: 18,
    color: '#555',
    textAlign: 'center',
  },
  footer: {
    position: 'absolute',
    bottom: 20,
    left: 20,
  },
  footerText: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
  },
  pseudoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Jeu;
  