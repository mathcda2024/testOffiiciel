import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';

type RootStackParamList = {
  Home: undefined;
  QuizSolo: undefined;
  BilanQuiz: { score: number; totalQuestions: number; playerName: string };
};

type BilanQuizScreenNavigationProp = StackNavigationProp<RootStackParamList, 'BilanQuiz'>;
type BilanQuizScreenRouteProp = RouteProp<RootStackParamList, 'BilanQuiz'>;

type Props = {
  navigation: BilanQuizScreenNavigationProp;
  route: BilanQuizScreenRouteProp;
};

const BilanQuiz: React.FC<Props> = ({ navigation, route }) => {
  const { score, totalQuestions, playerName } = route.params;
  
  // Formater la date actuelle (17 mars 2025 dans l'exemple)
  const today = new Date();
  const months = [
    'janvier', 'février', 'mars', 'avril', 'mai', 'juin',
    'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'
  ];
  const formattedDate = `${today.getDate()} ${months[today.getMonth()]} ${today.getFullYear()}`;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.scoreCircle}>
        <Text style={styles.scoreNumber}>{score}</Text>
      </View>

      <Text style={styles.bilanTitle}>BILAN DU QUIZ</Text>

      <View style={styles.infoContainer}>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Pseudo:</Text>
          <Text style={styles.infoValueHighlight}>{playerName}</Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Score:</Text>
          <Text style={styles.infoValueHighlight}>{score}/{totalQuestions}</Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Date:</Text>
          <Text style={styles.infoValueHighlight}>{formattedDate}</Text>
        </View>
      </View>

      <View style={styles.separator} />

      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={styles.restartButton}
          onPress={() => navigation.navigate('QuizSolo')}
        >
          <Text style={styles.restartButtonText}>Recommencer une partie</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.quitButton}
          onPress={() => navigation.navigate('Home')}
        >
          <Text style={styles.quitButtonText}>Quitter</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    padding: 20,
  },
  scoreCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: '#FF6B6B',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 20,
  },
  scoreNumber: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#FF6B6B',
  },
  bilanTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#555555',
    marginBottom: 40,
  },
  infoContainer: {
    width: '100%',
    paddingHorizontal: 10,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  infoLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#555555',
  },
  infoValueHighlight: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FF6B6B',
  },
  separator: {
    height: 1,
    width: '100%',
    backgroundColor: '#EEEEEE',
    marginVertical: 20,
  },
  buttonContainer: {
    width: '100%',
    marginTop: 20,
  },
  restartButton: {
    backgroundColor: '#4ECDC4',
    padding: 15,
    borderRadius: 25,
    alignItems: 'center',
    marginBottom: 15,
  },
  restartButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  quitButton: {
    backgroundColor: '#FF6B6B',
    padding: 15,
    borderRadius: 25,
    alignItems: 'center',
  },
  quitButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default BilanQuiz;