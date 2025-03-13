import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated, Easing } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';

type RootStackParamList = {
  ThemeSolo: undefined;
  Pret: undefined;
  Jeu: undefined;  // Ajout de QuizSolo à la liste des routes
};

type PretScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Pret'>;

type Props = {
  navigation: PretScreenNavigationProp;
};

const Pret: React.FC<Props> = ({ navigation }) => {
  const [bounceAnim] = useState(new Animated.Value(1)); // Initial scale value

  const handlePress = () => {

    // Animation du bouton PRET
    Animated.sequence([
      Animated.timing(bounceAnim, {
        toValue: 1.2,
        duration: 200,
        easing: Easing.bounce,
        useNativeDriver: true,
      }),
      Animated.timing(bounceAnim, {
        toValue: 1,
        duration: 200,
        easing: Easing.bounce,
        useNativeDriver: true,
      }),
    ]).start();

    // REDIRECTION VERS LA PAGE DE QUIZ
    setTimeout(() => {
      navigation.navigate('Jeu');
    }, 400); // Délai pour attendre la fin de l'animation avant la navigation 0.4S
  };

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.animatedButton,
          { transform: [{ scale: bounceAnim }] },
        ]}
      >
        <TouchableOpacity style={styles.button} onPress={handlePress}>
          <Text style={styles.buttonText}>PRÊT !</Text>
        </TouchableOpacity>
      </Animated.View>

      <TouchableOpacity style={styles.cancelButton} onPress={() => navigation.navigate('ThemeSolo')}>
        <Text style={styles.cancelText}>ANNULER</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFD700', // Mint green
  },
  animatedButton: {
    borderRadius: 300,
    borderWidth: 5,
    borderColor: '#008000', // Green outline
    padding: 10,
  },
  button: {
    backgroundColor: '#0000FF', // Blue button
    width: 300,
    height: 300,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 200,
  },
  buttonText: {
    color: '#FFA500', // Orange text
    fontSize: 50,
    fontWeight: 'bold',
  },
  
  // Bouton Annuler
  cancelButton: {
    marginTop: 30,
    backgroundColor: '#FFFFFF', // Red button
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    width: '90%',
    marginTop: 130,  // Augmenter cette valeur pour déplacer le bouton plus bas
    height: 60,
  },
  
  cancelText: {
    color: '#000000', // White text
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    justifyContent: 'center',
  },
});

export default Pret;
