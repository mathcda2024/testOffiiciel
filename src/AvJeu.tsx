import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { StackNavigationProp } from '@react-navigation/stack';

type RootStackParamList = {
  ChoixJeu: undefined;
  AvJeu: undefined;
  Jeu: { players: number; level: string }; // Ajout du type pour la page Jeu
};

type AvJeuScreenNavigationProp = StackNavigationProp<RootStackParamList, 'AvJeu'>;

type Props = {
  navigation: AvJeuScreenNavigationProp;
};

const AvJeu: React.FC<Props> = ({ navigation }) => {
  const [selectedPlayers, setSelectedPlayers] = useState<number | null>(null);
  const [selectedLevel, setSelectedLevel] = useState<string | null>(null);
  const [playerModalVisible, setPlayerModalVisible] = useState(false); // Modal pour le nombre de joueurs

  const handleSelectPlayers = (players: number) => {
    setSelectedPlayers(players);
    setPlayerModalVisible(false); // Ferme le modal une fois qu'un choix est fait
  };

  const handleSelectLevel = (level: string) => {
    setSelectedLevel(level);
  };

  const isFormValid = selectedPlayers !== null && selectedLevel !== null;

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Prêts pour l'aventure ?</Text>
      </View>

      {/* Bouton pour sélectionner le nombre de joueurs */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => setPlayerModalVisible(true)} // Ouvre le modal pour sélectionner le nombre de joueurs
      >
        <Text style={styles.buttonText}>
          {selectedPlayers !== null ? `${selectedPlayers} JOUEURS` : "CHOISIR LE NOMBRE DE JOUEURS"}
        </Text>
      </TouchableOpacity>

      {/* Modal pour choisir le nombre de joueurs */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={playerModalVisible}
        onRequestClose={() => setPlayerModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Choisissez le nombre de joueurs</Text>
            {[...Array(9)].map((_, i) => {
              const players = i + 2; // Crée un nombre de joueurs de 2 à 10
              return (
                <TouchableOpacity
                  key={players}
                  style={styles.modalButton}
                  onPress={() => handleSelectPlayers(players)}
                >
                  <Text style={styles.modalButtonText}>{players}</Text>
                </TouchableOpacity>
              );
            })}
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setPlayerModalVisible(false)} // Ferme le modal
            >
              <Text style={styles.closeButtonText}>Fermer</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Boutons pour choisir le niveau */}
      {['SOFT', 'NORMAL', 'HARDCORE'].map(level => (
        <TouchableOpacity
          key={level}
          style={[styles.button, selectedLevel === level && styles.selectedButton, level === 'HARDCORE' && styles.lastLevelButton]}
          onPress={() => handleSelectLevel(level)}
        >
          <Text style={styles.buttonText}>{level}</Text>
          {selectedLevel === level && (
            <MaterialIcons name="check-circle" size={20} color="black" style={styles.icon} />
          )}
        </TouchableOpacity>
      ))}

      {/* Bouton OK */}
      <TouchableOpacity
        style={[styles.ok, !isFormValid && styles.disabledButton]}
        onPress={() => isFormValid && navigation.navigate('Jeu')}
        disabled={!isFormValid}
      >
        <Text style={[styles.buttonText, !isFormValid && styles.disabledText]}>OK</Text>
      </TouchableOpacity>

      {/* Bouton RETOUR */}
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.navigate('ChoixJeu')}
      >
        <Text style={styles.backButtonText}>RETOUR</Text>
      </TouchableOpacity>
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
  titleContainer: {
    backgroundColor: "white",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
    marginBottom: 70,
    width: '90%',
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
  },
  button: {
    backgroundColor: '#5A3A1B',
    padding: 15,
    marginVertical: 10,
    width: '90%',
    alignItems: 'center',
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  selectedButton: {
    backgroundColor: '#28a745',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  icon: {
    marginLeft: 10,
  },
  ok: {
    backgroundColor: '#FFFFFF',
    padding: 15,
    marginVertical: 10,
    width: '90%',
    alignItems: 'center',
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'center',
    borderColor: '#FFFFFF',
    borderWidth: 1,
  },
  disabledButton: {
    backgroundColor: '#FFFFFF',
    borderColor: '#FFFFFF',
  },
  disabledText: {
    color: '#000000',
  },
  backButtonText: {
    color: '#000000',
    fontSize: 16,
    fontWeight: 'bold',
  },
  backButton: {
    backgroundColor: '#FFFFFF',
    padding: 15,
    marginVertical: 10,
    width: '90%',
    alignItems: 'center',
    borderRadius: 5,
  },
  lastLevelButton: {
    marginBottom: 90,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    marginBottom: 20,
  },
  modalButton: {
    backgroundColor: '#5A3A1B',
    paddingVertical: 10,
    paddingHorizontal: 30,
    margin: 5,
    borderRadius: 5,
  },
  modalButtonText: {
    color: 'white',
    fontSize: 16,
  },
  closeButton: {
    backgroundColor: '#dc3545',
    paddingVertical: 10,
    paddingHorizontal: 30,
    marginTop: 20,
    borderRadius: 5,
  },
  closeButtonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default AvJeu;
