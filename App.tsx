//RootStackParamList// src/App.tsx
import React from 'react';
import { StyleSheet, View } from 'react-native';

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

// importation des pages du projet
import SplashScreen from './src/assets/SplashScreen'; // Import du SplashScreen
import Home from './src/Home'; // Chemin de la page Home.tsx dans App.tsx
import NiveauSolo from './src/NiveauSolo'; // Assure-toi du chemin correct
import ThemeSolo from './src/ThemeSolo';
import Pret from './src/Pret';
import NiveauMulti from './src/NiveauMulti';
import ChoixJeu from './src/ChoixJeu';
import QuizSolo from './src/QuizSolo';
import AvJeu from './src/AvJeu';
import Jeu from './src/Jeu';


// Définir le type RootStackParamList pour les paramètres de navigation
type RootStackParamList = {
  SplashScreen: undefined;
  Home: undefined;
  NiveauSolo: undefined;
  ThemeSolo: undefined;
  Pret: undefined;
  NiveauMulti: undefined;
  ChoixJeu: undefined;
  AvJeu: undefined;
  Jeu: undefined;
  QuizSolo: undefined;
  BackgroundPattern: undefined;
};


const Stack = createStackNavigator<RootStackParamList>(); // Correction ici ✅

const App: React.FC = () => {
  return (
    <NavigationContainer>
      <View style={styles.container}>
        <Stack.Navigator
          initialRouteName="SplashScreen"
          screenOptions={{ headerShown: false }} // Cache les headers par défaut
        >
          {/* Splash Screen, Page de demarrage*/}
          <Stack.Screen name="SplashScreen" component={SplashScreen} />

          {/* Listes pages projet */}

          {/* Partie SOLO */}
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="NiveauSolo" component={NiveauSolo} />
          <Stack.Screen name="ThemeSolo" component={ThemeSolo} options={{ title: "themes" }} />

          {/* Partie MULTIJOUEUR */}
          <Stack.Screen name="ChoixJeu" component={ChoixJeu} />
          <Stack.Screen name="NiveauMulti" component={NiveauMulti} />
          <Stack.Screen name="AvJeu" component={AvJeu} />
          <Stack.Screen name="Jeu" component={Jeu} />
         
          <Stack.Screen name="Pret" component={Pret} options={{ title: "pret" }}  />
          <Stack.Screen name="QuizSolo" component={QuizSolo} />
    
         


        </Stack.Navigator>
      </View>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export type { RootStackParamList };
export default App;
