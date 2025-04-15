import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  SafeAreaView,
  Alert,
  ImageBackground,
  Animated
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

type RootStackParamList = {
  ChoixJeu: undefined;
  AvJeu: undefined;
  Jeu: { players: number; level: string };
  Partie: { playerNames: string[]; level: string };
  Resultats: { playerNames: string[]; scores: number[] };
};

type PartieScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Partie'>;
type PartieScreenRouteProp = RouteProp<RootStackParamList, 'Partie'>;

type Props = {
  navigation: PartieScreenNavigationProp;
  route: PartieScreenRouteProp;
};

const Partie: React.FC<Props> = ({ navigation, route }) => {
  /*const { playerNames, level } = route.params;*/
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const [scores, setScores] = useState<number[]>(Array(playerNames.length).fill(0));
  const [round, setRound] = useState(1);
  const [showChoice, setShowChoice] = useState(true);
  const [currentTask, setCurrentTask] = useState('');
  const [taskType, setTaskType] = useState<'action' | 'verite' | null>(null);
  const [animation] = useState(new Animated.Value(0));
  const [usedTasks, setUsedTasks] = useState<Set<string>>(new Set());

  // Base de données d'actions et vérités selon le niveau
  const tasks = {
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
  const getRandomTask = (type: 'action' | 'verite') => {
    const taskList = type === 'action' ? tasks.actions[level as keyof typeof tasks.actions] : tasks.verites[level as keyof typeof tasks.verites];
    
    // Filtre les tâches déjà utilisées
    const availableTasks = taskList.filter(task => !usedTasks.has(task));
    
    // Si toutes les tâches ont été utilisées, réinitialiser
    if (availableTasks.length === 0) {
      setUsedTasks(new Set());
      return taskList[Math.floor(Math.random() * taskList.length)];
    }
    
    const randomTask = availableTasks[Math.floor(Math.random() * availableTasks.length)];
    setUsedTasks(prev => new Set([...prev, randomTask]));
    
    return randomTask;
  };

  // Fonctions pour choisir action ou vérité
  const handleChoiceAction = () => {
    setTaskType('action');
    setCurrentTask(getRandomTask('action'));
    setShowChoice(false);
    startAnimation();
  };

  const handleChoiceVerite = () => {
    setTaskType('verite');
    setCurrentTask(getRandomTask('verite'));
    setShowChoice(false);
    startAnimation();
  };

  // Animation pour l'apparition de la tâche
  const startAnimation = () => {
    animation.setValue(0);
    Animated.timing(animation, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true
    }).start();
  };

  // Gère la complétion d'une tâche
  const handleTaskComplete = (completed: boolean) => {
    const newScores = [...scores];
    if (completed) {
      newScores[currentPlayerIndex] += 1;
      setScores(newScores);
    }

    // Passe au joueur suivant
    const nextPlayerIndex = (currentPlayerIndex + 1) % playerNames.length;
    setCurrentPlayerIndex(nextPlayerIndex);
    
    // Si on a fait un tour complet, on incrémente le round
    if (nextPlayerIndex === 0) {
      setRound(round + 1);
      // Vérifie si c'est la fin du jeu (par exemple après 5 tours)
      if (round >= 5) {
        navigation.navigate('Resultats', { playerNames, scores: newScores });
        return;
      }
    }

    setShowChoice(true);
  };

  // Animation style
  const animatedStyle = {
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
  const getLevelColor = () => {
    switch (level) {
      case 'SOFT': return '#28a745';
      case 'NORMAL': return '#ffc107';
      case 'HARDCORE': return '#dc3545';
      default: return '#28a745';
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.roundText}>Round {round}/5</Text>
        <View style={[styles.levelBadge, { backgroundColor: getLevelColor() }]}>
          <Text style={styles.levelText}>{level}</Text>
        </View>
      </View>

      <View style={styles.playerInfo}>
        <Text style={styles.playerName}>{playerNames[currentPlayerIndex]}</Text>
        <Text style={styles.scoreText}>Score: {scores[currentPlayerIndex]}</Text>
      </View>

      {showChoice ? (
        <View style={styles.choiceContainer}>
          <Text style={styles.choiceText}>Que choisissez-vous ?</Text>
          <View style={styles.buttonsRow}>
            <TouchableOpacity 
              style={[styles.choiceButton, styles.actionButton]} 
              onPress={handleChoiceAction}
            >
              <MaterialIcons name="directions-run" size={32} color="white" />
              <Text style={styles.choiceButtonText}>ACTION</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={[styles.choiceButton, styles.veriteButton]} 
              onPress={handleChoiceVerite}
            >
              <MaterialIcons name="question-answer" size={32} color="white" />
              <Text style={styles.choiceButtonText}>VÉRITÉ</Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <Animated.View style={[styles.taskContainer, animatedStyle]}>
          <View style={[styles.taskTypeIndicator, taskType === 'action' ? styles.actionIndicator : styles.veriteIndicator]}>
            <MaterialIcons 
              name={taskType === 'action' ? "directions-run" : "question-answer"} 
              size={24} 
              color="white" 
            />
            <Text style={styles.taskTypeText}>
              {taskType === 'action' ? "ACTION" : "VÉRITÉ"}
            </Text>
          </View>
          
          <Text style={styles.taskText}>{currentTask}</Text>
          
          <View style={styles.completionButtons}>
            <TouchableOpacity 
              style={[styles.completionButton, styles.failedButton]} 
              onPress={() => handleTaskComplete(false)}
            >
              <MaterialIcons name="close" size={24} color="white" />
              <Text style={styles.completionButtonText}>ÉCHEC</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[styles.completionButton, styles.successButton]} 
              onPress={() => handleTaskComplete(true)}
            >
              <MaterialIcons name="check" size={24} color="white" />
              <Text style={styles.completionButtonText}>RÉUSSI</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      )}

      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.exitButton}
          onPress={() => {
            Alert.alert(
              "Quitter la partie",
              "Êtes-vous sûr de vouloir quitter la partie en cours ?",
              [
                { text: "Annuler", style: "cancel" },
                { text: "Quitter", onPress: () => navigation.navigate('ChoixJeu') }
              ]
            );
          }}
        >
          <MaterialIcons name="exit-to-app" size={20} color="#000" />
          <Text style={styles.exitButtonText}>QUITTER LA PARTIE</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFD700',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 10,
  },
  roundText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  levelBadge: {
    paddingHorizontal: 15,
    paddingVertical: 6,
    borderRadius: 15,
  },
  levelText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 14,
  },
  playerInfo: {
    alignItems: 'center',
    marginVertical: 20,
  },
  playerName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#5A3A1B',
    marginBottom: 5,
  },
  scoreText: {
    fontSize: 18,
    color: '#333',
  },
  choiceContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  choiceText: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
  },
  buttonsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
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
    elevation: 5,
  },
  actionButton: {
    backgroundColor: '#5A3A1B',
  },
  veriteButton: {
    backgroundColor: '#0066CC',
  },
  choiceButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 8,
  },
  taskContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  taskTypeIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    marginBottom: 20,
  },
  actionIndicator: {
    backgroundColor: '#5A3A1B',
  },
  veriteIndicator: {
    backgroundColor: '#0066CC',
  },
  taskTypeText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
    marginLeft: 8,
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
    width: '90%',
  },
  completionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
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
    elevation: 3,
  },
  failedButton: {
    backgroundColor: '#dc3545',
  },
  successButton: {
    backgroundColor: '#28a745',
  },
  completionButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
    marginLeft: 8,
  },
  footer: {
    padding: 20,
  },
  exitButton: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    padding: 15,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
  },
  exitButtonText: {
    color: '#000000',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
});

export default Partie;