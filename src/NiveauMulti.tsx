import React, { useState } from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import { View, Text, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

type RootStackParamList = {
  NiveauMulti: undefined;
  ThemeSolo: undefined;
  Home: undefined;
};

type NiveauMultiScreenNavigationProp = StackNavigationProp<RootStackParamList, 'NiveauMulti'>;

type Props = {
  navigation: NiveauMultiScreenNavigationProp;
};

const NiveauMulti: React.FC<Props> = ({ navigation }) => {
  const [selectedCount, setSelectedCount] = useState<number | null>(null);
  const [selectedPlayers, setSelectedPlayers] = useState<number | null>(null);
  const [selectedLevel, setSelectedLevel] = useState<string | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [playerModalVisible, setPlayerModalVisible] = useState(false);

  const handleSelectCount = (count: number) => {
    setSelectedCount(count);
    setModalVisible(false);
  };

  const handleSelectPlayers = (players: number) => {
    setSelectedPlayers(players);
    setPlayerModalVisible(false);
  };

  const handleSelectLevel = (level: string) => {
    setSelectedLevel(level);
  };

  const isFormValid = selectedCount !== null && selectedPlayers !== null && selectedLevel !== null;

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Choisis ton niveau</Text>
      </View>

      {/* Bouton pour sélectionner le nombre de joueurs */}
      <TouchableOpacity
        style={styles.buttonNbPlayers}
        onPress={() => setPlayerModalVisible(true)}
      >
        <Text style={styles.buttonText}>
          {selectedPlayers !== null ? `${selectedPlayers} JOUEURS` : "NOMBRE DE JOUEURS"}
        </Text>
      </TouchableOpacity>

      {/* Bouton pour sélectionner le nombre de questions */}
      <TouchableOpacity
        style={styles.buttonNbQuest}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.buttonText}>
          {selectedCount !== null ? `${selectedCount} QUESTIONS` : "NOMBRE DE QUESTIONS"}
        </Text>
      </TouchableOpacity>

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
              onPress={() => setPlayerModalVisible(false)}
            >
              <Text style={styles.closeButtonText}>Fermer</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Choisissez le nombre de questions</Text>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => handleSelectCount(10)}
            >
              <Text style={styles.modalButtonText}>10</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => handleSelectCount(20)}
            >
              <Text style={styles.modalButtonText}>20</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => handleSelectCount(30)}
            >
              <Text style={styles.modalButtonText}>30</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.closeButtonText}>Fermer</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {['FACILE', 'STANDARD', 'DIFFICILE'].map(level => (
        <TouchableOpacity 
          key={level} 
          style={[styles.button, selectedLevel === level && styles.selectedButton]}
          onPress={() => handleSelectLevel(level)}
        >
          <Text style={styles.buttonText}>{level}</Text>
          {selectedLevel === level && (
            <MaterialIcons name="check-circle" size={20} color="black" style={styles.icon} />
          )}
        </TouchableOpacity>
      ))}

      <TouchableOpacity
        style={[styles.ok, !isFormValid && styles.disabledButton]}
        onPress={() => isFormValid && navigation.navigate('ThemeSolo')}
        disabled={!isFormValid}
      >
        <Text style={styles.backButtonText}>OK</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('Home')}>
        <Text style={styles.backButtonText}>RETOUR</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonNbPlayers: {
    backgroundColor: '#5A3A1B',
    padding: 15,
    marginVertical: 5,
    width: '90%',
    alignItems: 'center',
    borderRadius: 5,
    marginBottom: 10,
  },
  buttonNbQuest: {
    backgroundColor: '#5A3A1B',
    padding: 15,
    marginVertical: 5,
    width: '90%',
    alignItems: 'center',
    borderRadius: 5,
    marginBottom: 10,
  },
  container: {
    flex: 1,
    backgroundColor: '#FFD700',
    alignItems: 'center',
    justifyContent: 'center',
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
    marginBottom: 30,
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
    marginVertical: 5,
    width: '90%',
    alignItems: 'center',
    borderRadius: 5,
    marginBottom: 15,
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
    marginVertical: 5,
    width: '90%',
    alignItems: 'center',
    borderRadius: 5,
    marginBottom: 20,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  disabledButton: {
    backgroundColor: '#D3D3D3',
  },
  backButtonText: {
    color: '#000000',
    fontSize: 16,
    fontWeight: 'bold',
  },
  backButton: {
    backgroundColor: '#FFFFFF',
    padding: 15,
    marginVertical: 5,
    width: '90%',
    alignItems: 'center',
    borderRadius: 5,
    marginTop: 20,
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

export default NiveauMulti;
