// App.js
import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet ,Image} from 'react-native';




// Définir les types de navigation pour la pile d'écrans
type RootStackParamList = {
  Home: undefined;
  NiveauSolo: undefined;  
  ChoixJeu: undefined;
};

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

type Props = {
  navigation: HomeScreenNavigationProp;
};

const Home: React.FC<Props> = ({ navigation }) => {
  return (
    <View style={styles.container}>

       <View style={styles.container}>
           <Image source={require('./logoHome.png')} style={styles.image} />

          </View>
      

     <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('NiveauSolo')}>
        <Text style={styles.buttonText}>SOLO</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button}  onPress={() => navigation.navigate('ChoixJeu')}>
        <Text style={styles.buttonText}>MULTIJOUEUR</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFD544', // Couleur de fond jaune
    justifyContent: 'center',
    alignItems: 'center',
  },
 /* logoContainer: {
    marginBottom: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },*/
  circle: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: '#A0522D', // Marron
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFD544', // Même jaune que le fond
  },
  button: {
    backgroundColor: '#5D4037', // Marron foncé
    width: 350,
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    bottom: 100,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
   image: {
    width: 250, // Ajuste la taille de ton image
    height: 250,
    resizeMode: "contain",
  },
});

export default Home;
