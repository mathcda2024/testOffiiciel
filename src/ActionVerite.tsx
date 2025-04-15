import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  ScrollView, 
  StyleSheet, 
  KeyboardAvoidingView,
  Platform,
  SafeAreaView
} from 'react-native';

interface Player {
  id: number;
  name: string;
}

const ActionVerite: React.FC = () => {
  // États
  const [players, setPlayers] = useState<Player[]>([]);
  const [playerName, setPlayerName] = useState<string>('');
  const [gameStarted, setGameStarted] = useState<boolean>(false);
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<'action' | 'verite' | null>(null);
  const [challenge, setChallenge] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');

  // Données du jeu
  const actions = [
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

  const verites = [
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
  const handleNameChange = (text: string) => {
    setPlayerName(text);
    setErrorMessage('');
  };

  const handleAddPlayer = () => {
    if (playerName.trim() === '') {
      setErrorMessage('Le nom du joueur ne peut pas être vide');
      return;
    }
    
    if (players.length >= 10) {
      setErrorMessage('Maximum 10 joueurs autorisés');
      return;
    }
    
    const newPlayer: Player = {
      id: Date.now(),
      name: playerName.trim()
    };
    
    setPlayers([...players, newPlayer]);
    setPlayerName('');
  };

  const handleRemovePlayer = (id: number) => {
    setPlayers(players.filter(player => player.id !== id));
  };

  const handleStartGame = () => {
    if (players.length < 2) {
      setErrorMessage('Il faut au moins 2 joueurs pour commencer');
      return;
    }
    
    setGameStarted(true);
    setCurrentPlayerIndex(0);
    setSelectedOption(null);
    setChallenge('');
  };

  const handleSelectOption = (option: 'action' | 'verite') => {
    setSelectedOption(option);
    
    if (option === 'action') {
      const randomAction = actions[Math.floor(Math.random() * actions.length)];
      setChallenge(randomAction);
    } else {
      const randomVerite = verites[Math.floor(Math.random() * verites.length)];
      setChallenge(randomVerite);
    }
  };

  const handleNextPlayer = () => {
    setCurrentPlayerIndex((currentPlayerIndex + 1) % players.length);
    setSelectedOption(null);
    setChallenge('');
  };

  const handleEndGame = () => {
    setGameStarted(false);
    setSelectedOption(null);
    setChallenge('');
  };

  // Écran d'ajout de joueurs
  if (!gameStarted) {
    return (
      <SafeAreaView style={styles.container}>
        <KeyboardAvoidingView 
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.keyboardAvoidingView}
        >
          <View style={styles.content}>
            <Text style={styles.title}>Action ou Vérité</Text>
            
            <View style={styles.card}>
              <Text style={styles.subtitle}>Ajouter des joueurs (2-10)</Text>
              
              <View style={styles.inputContainer}>
                <TextInput
                  value={playerName}
                  onChangeText={handleNameChange}
                  placeholder="Nom du joueur"
                  style={styles.input}
                  maxLength={20}
                  onSubmitEditing={handleAddPlayer}
                  returnKeyType="done"
                />
                <TouchableOpacity
                  onPress={handleAddPlayer}
                  style={styles.addButton}
                >
                  <Text style={styles.addButtonText}>Ajouter</Text>
                </TouchableOpacity>
              </View>
              
              {errorMessage ? (
                <Text style={styles.errorText}>{errorMessage}</Text>
              ) : null}
              
              <View style={styles.playersContainer}>
                <Text style={styles.playersHeader}>
                  Joueurs ({players.length}/10):
                </Text>
                
                {players.length === 0 ? (
                  <Text style={styles.emptyText}>Aucun joueur ajouté</Text>
                ) : (
                  <ScrollView style={styles.playersList}>
                    {players.map(player => (
                      <View key={player.id} style={styles.playerItem}>
                        <Text style={styles.playerName}>{player.name}</Text>
                        <TouchableOpacity
                          onPress={() => handleRemovePlayer(player.id)}
                          style={styles.removeButton}
                        >
                          <Text style={styles.removeButtonText}>Supprimer</Text>
                        </TouchableOpacity>
                      </View>
                    ))}
                  </ScrollView>
                )}
              </View>
              
              <TouchableOpacity
                onPress={handleStartGame}
                disabled={players.length < 2}
                style={[
                  styles.startButton,
                  players.length < 2 && styles.disabledButton
                ]}
              >
                <Text style={styles.startButtonText}>Commencer le jeu</Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    );
  }

  // Écran de jeu
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Action ou Vérité</Text>
        
        <View style={styles.card}>
          <View style={styles.playerTurn}>
            <Text style={styles.playerTurnText}>
              Tour de <Text style={styles.highlightedPlayer}>{players[currentPlayerIndex].name}</Text>
            </Text>
            <Text style={styles.playerCount}>
              Joueur {currentPlayerIndex + 1} sur {players.length}
            </Text>
          </View>
          
          {!selectedOption ? (
            <View style={styles.optionsContainer}>
              <Text style={styles.chooseText}>Que choisis-tu ?</Text>
              <View style={styles.optionsButtons}>
                <TouchableOpacity
                  onPress={() => handleSelectOption('action')}
                  style={[styles.optionButton, styles.actionButton]}
                >
                  <Text style={styles.optionButtonText}>Action</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => handleSelectOption('verite')}
                  style={[styles.optionButton, styles.veriteButton]}
                >
                  <Text style={styles.optionButtonText}>Vérité</Text>
                </TouchableOpacity>
              </View>
            </View>
          ) : (
            <View>
              <View style={[
                styles.challengeContainer,
                selectedOption === 'action' ? styles.actionChallenge : styles.veriteChallenge
              ]}>
                <Text style={[
                  styles.challengeType,
                  selectedOption === 'action' ? styles.actionText : styles.veriteText
                ]}>
                  {selectedOption === 'action' ? 'Action' : 'Vérité'}
                </Text>
                <Text style={styles.challengeText}>{challenge}</Text>
              </View>
              <TouchableOpacity
                onPress={handleNextPlayer}
                style={styles.nextButton}
              >
                <Text style={styles.nextButtonText}>Joueur suivant</Text>
              </TouchableOpacity>
            </View>
          )}
          
          <TouchableOpacity
            onPress={handleEndGame}
            style={styles.endButton}
          >
            <Text style={styles.endButtonText}>Terminer la partie</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFD544', // Équivalent à bg-blue-50
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1E40AF', // Équivalent à text-blue-800
    marginBottom: 24,
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
    maxWidth: 400,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#D1D5DB', // Équivalent à border-gray-300
    borderTopLeftRadius: 4,
    borderBottomLeftRadius: 4,
    padding: 8,
  },
  addButton: {
    backgroundColor: '#A0522D', // Équivalent à bg-blue-600
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderTopRightRadius: 4,
    borderBottomRightRadius: 4,
      justifyContent: 'center',
    
  },
  addButtonText: {
    color: 'white',
    fontWeight: '500',
  },
  errorText: {
    color: '#EF4444', // Équivalent à text-red-500
    fontSize: 12,
    marginBottom: 8,
  },
  playersContainer: {
    marginBottom: 24,
  },
  playersHeader: {
    fontWeight: '500',
    marginBottom: 8,
  },
  emptyText: {
    color: '#6B7280', // Équivalent à text-gray-500
    fontStyle: 'italic',
  },
  playersList: {
    maxHeight: 160,
  },
  playerItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB', // Équivalent à border-gray-200
  },
  playerName: {
    flex: 1,
  },
  removeButton: {
    padding: 4,
  },
  removeButtonText: {
    color: '#EF4444', // Équivalent à text-red-500
  },
  startButton: {
    backgroundColor: '#2563EB', // Équivalent à bg-blue-600
    paddingVertical: 8,
    borderRadius: 4,
    alignItems: 'center',
  },
  disabledButton: {
    backgroundColor: '#9CA3AF', // Équivalent à bg-gray-400
  },
  startButtonText: {
    color: 'white',
    fontWeight: '600',
  },
  playerTurn: {
    alignItems: 'center',
    marginBottom: 24,
  },
  playerTurnText: {
    fontSize: 18,
    fontWeight: '600',
  },
  highlightedPlayer: {
    color: '#1D4ED8', // Équivalent à text-blue-700
  },
  playerCount: {
    color: '#6B7280', // Équivalent à text-gray-500
  },
  optionsContainer: {
    marginBottom: 16,
  },
  chooseText: {
    textAlign: 'center',
    marginBottom: 16,
  },
  optionsButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  optionButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 4,
    alignItems: 'center',
    marginHorizontal: 4,
  },
  actionButton: {
    backgroundColor: '#F59E0B', // Équivalent à bg-amber-500
  },
  veriteButton: {
    backgroundColor: '#6366F1', // Équivalent à bg-indigo-500
  },
  optionButtonText: {
    color: 'white',
    fontWeight: '600',
  },
  challengeContainer: {
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
  },
  actionChallenge: {
    backgroundColor: '#FEF3C7', // Équivalent à bg-amber-100
  },
  veriteChallenge: {
    backgroundColor: '#E0E7FF', // Équivalent à bg-indigo-100
  },
  challengeType: {
    fontWeight: 'bold',
    marginBottom: 8,
  },
  actionText: {
    color: '#B45309', // Équivalent à text-amber-700
  },
  veriteText: {
    color: '#4338CA', // Équivalent à text-indigo-700
  },
  challengeText: {
    color: '#1F2937', // Équivalent à text-gray-800
  },
  nextButton: {
    backgroundColor: '#2563EB', // Équivalent à bg-blue-600
    paddingVertical: 8,
    borderRadius: 4,
    alignItems: 'center',
  },
  nextButtonText: {
    color: 'white',
    fontWeight: '600',
  },
  endButton: {
    borderWidth: 1,
    borderColor: '#EF4444', // Équivalent à border-red-500
    paddingVertical: 8,
    borderRadius: 4,
    alignItems: 'center',
    marginTop: 16,
  },
  endButtonText: {
    color: '#EF4444', // Équivalent à text-red-500
  },
});

export default ActionVerite;