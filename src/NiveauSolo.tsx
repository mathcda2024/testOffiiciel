import React, { useState } from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import { View, Text, StyleSheet, TouchableOpacity, Modal } from 'react-native';
//import Icon from 'react-native-vector-icons/FontAwesome';  // Import de l'icône
//import AntDesign from 'react-native-vector-icons/AntDesign';  // Utilisation d'AntDesign
//import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';


/*
**ROOTSTACKPARAMLIST : IL DÉFINIT LES TYPES DES DIFFÉRENTES ROUTES DE VOTRE PILE DE NAVIGATION (STACK NAVIGATION).
CE TYPE PERMET À TYPESCRIPT DE SAVOIR QUELLES PAGES EXISTENT DANS VOTRE APPLICATION ET QUEL TYPE DE PARAMÈTRES CHAQUE PAGE ATTEND.
CHAQUE CLÉ (HOME, NIVEAUSOLO, THEMESOLO) REPRÉSENTE UNE ROUTE OU UNE PAGE DANS L'APPLICATION.
LE TYPE UNDEFINED SIGNIFIE QUE CES PAGES NE NÉCESSITENT PAS DE PARAMÈTRES (PAS DE DONNÉES À TRANSMETTRE ENTRE LES ÉCRANS).**
*/

type RootStackParamList = {
  Home: undefined;
  NiveauSolo: undefined;
  ThemeSolo: undefined;
};

type NiveauSoloScreenNavigationProp = StackNavigationProp<RootStackParamList, 'NiveauSolo'>;

type Props = {
  navigation: NiveauSoloScreenNavigationProp;
};

const NiveauSolo: React.FC<Props> = ({ navigation }) => {
  const [selectedCount, setSelectedCount] = useState<number | null>(null); // Nombre de questions sélectionné
  const [selectedLevel, setSelectedLevel] = useState<string | null>(null); // Niveau sélectionné
  const [modalVisible, setModalVisible] = useState(false); // Contrôle du modal

  const handleSelectCount = (count: number) => {
    setSelectedCount(count);
    setModalVisible(false); // Fermer le modal après sélection
  };

  const handleSelectLevel = (level: string) => {
    setSelectedLevel(level);
  };

  const isFormValid = selectedCount !== null && selectedLevel !== null; // Vérifier si tout est sélectionné

  return (
    <View style={styles.container}>

      <View style={styles.titleContainer}>
      <Text style={styles.title}>Choisis ton niveau</Text>
      </View>

      {/* Bouton pour sélectionner le nombre de questions */}
      <TouchableOpacity
        style={styles.buttonNbQuest}
        onPress={() => setModalVisible(true)} // Afficher le modal
      >
        <Text style={styles.buttonText}>
          {selectedCount !== null ? `${selectedCount} QUESTIONS` : "NOMBRE DE QUESTIONS"}
        </Text>
      </TouchableOpacity>

      {/* Modal avec les options 10, 20, 30 */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)} // Fermer le modal si on appuie en dehors
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

      {/* Boutons pour choisir les niveaux avec l'icône de validation */}
      {['FACILE', 'STANDARD', 'DIFFICILE'].map(level => (
        <TouchableOpacity 
          key={level} 
          style={[
            styles.button, 
            selectedLevel === level && styles.selectedButton,
             level === 'DIFFICILE' && styles.lastLevelButton // Applique une marge en bas uniquement au dernier bouton
          ]}
          onPress={() => handleSelectLevel(level)}
        >
          <Text style={styles.buttonText}>{level}</Text>
          {selectedLevel === level && (
            <MaterialIcons  name="check-circle" size={20} color="black" style={styles.icon} />
          )}
        </TouchableOpacity>
      ))}

      {/* Bouton OK avec validation */}
     <TouchableOpacity
  style={[styles.ok, !isFormValid ? styles.disabledButton : null]} // Si désactivé, applique le style disabledButton
  onPress={() => isFormValid && navigation.navigate('ThemeSolo')}
  disabled={!isFormValid} // Désactive le bouton si les conditions ne sont pas remplies
>
  <Text style={[styles.backButtonText, !isFormValid && styles.disabledText]}>OK</Text> {/* Texte désactivé */}
</TouchableOpacity>


      {/* Retour à la page précédente */}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('Home')}>
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
  elevation: 3, // Ombre sur Android
   marginBottom: 30,
   width:'90%',
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
  marginVertical: 10, // Espacement uniforme pour les boutons de niveau
  width: '90%',
  alignItems: 'center',
  borderRadius: 5,
  flexDirection: 'row',
  justifyContent: 'center', // Pour espacer texte et icône
},
  selectedButton: {
    backgroundColor: '#28a745', // Couleur différente quand sélectionné
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  icon: {
    marginLeft: 10, // Espace entre le texte et l'icône

  },
 ok: {
  backgroundColor: '#FFFFFF', // Fond blanc
  padding: 15,
  marginVertical: 10,  // Espacement vertical uniforme
  width: '90%',
  alignItems: 'center',
  borderRadius: 5,
  flexDirection: 'row',
  justifyContent: 'center',
  borderColor: '#FFFFFF', // Bordure blanche
  borderWidth: 1, // Bordure visible
},

disabledButton: {
  backgroundColor: '#FFFFFF', // Fond gris si désactivé
borderColor: '#FFFFFF', // Bordure grise si désactivé
},

disabledText: {
  color: '#000000', // Couleur de texte grise si désactivé
},
  backButtonText: {
    color: '#000000',
    fontSize: 16,
    fontWeight: 'bold',
  },
 backButton: {
  backgroundColor: '#FFFFFF',
  padding: 15,
  marginVertical: 10,  // Espacement vertical uniforme
  width: '90%',
  alignItems: 'center',
  borderRadius: 5,
},
  buttonNbQuest: {
    backgroundColor: '#5A3A1B',
    padding: 15,
    marginVertical: 5,
    width: '90%',
    alignItems: 'center',
    borderRadius: 5,
    marginBottom: 50,
    marginTop: 50,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Fond semi-transparent pour le modal
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

  
  lastLevelButton: {
  marginBottom:70, // Ajuste la marge comme souhaité
},

});

export default NiveauSolo;
