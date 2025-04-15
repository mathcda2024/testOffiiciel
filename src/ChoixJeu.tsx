import React from "react";
import { StackNavigationProp } from "@react-navigation/stack";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";

// Définition des types de navigation
type RootStackParamList = {
  ChoixJeu: undefined;
  //AvJeu: undefined;
  ActionVerite: undefined;
  NiveauMulti: undefined;
};

type ChoixJeuScreenNavigationProp = StackNavigationProp<RootStackParamList, "ChoixJeu">;

type Props = {
  navigation: ChoixJeuScreenNavigationProp;
};

const ChoixJeu: React.FC<Props> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      {/* Titre positionné plus haut */}
      <Text style={styles.title}>Choisissez un jeu</Text>

      {/* Conteneur des cartes */}
      <View style={styles.cardContainer}>
        {/* Carte Action Vérité */}
        <TouchableOpacity style={styles.card} onPress={() => navigation.navigate("ActionVerite")}>
          <Image source={require("./image/av.jpg")} style={styles.cardImage} />
          <Text style={styles.cardText}>ACTION VÉRITÉ</Text>
        </TouchableOpacity>

        {/* Carte Quiz */}
        <TouchableOpacity style={styles.card} onPress={() => navigation.navigate("NiveauMulti")}>
          <Image source={require("./image/quiz.jpg")} style={styles.cardImage} />
          <Text style={styles.cardText}>QUIZ</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

// 🔹 **Styles ajustés pour un meilleur équilibre**
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFD544", // Jaune
    alignItems: "center",
    paddingTop: 50, // Décale tout le contenu vers le haut
  
  },
  title: {
  fontSize: 28,
  fontWeight: "bold",
  color: "#333",
  textAlign: "center",
  marginBottom: 30, // Réduit l'espace sous le titre pour le rapprocher des cartes
  backgroundColor: "white",
  paddingVertical: 12,
  paddingHorizontal: 35,
  borderRadius: 10,
  shadowColor: "#000",
  shadowOpacity: 0.2,
  shadowOffset: { width: 0, height: 2 },
  shadowRadius: 4,
  elevation: 3,
  width: "90%", // Ajoutez cette ligne pour que le texte prenne la même largeur que les cartes
},

  cardContainer: {
    flexDirection: "column", // Affichage en colonne pour une meilleure mise en page
    alignItems: "center",
    width: "100%",
    gap: 25, // Augmente légèrement l'espacement entre les cartes
  },
  card: {
    width: "90%", // Occupe plus d'espace pour un meilleur rendu
    height: 270, // Augmente légèrement la hauteur
    backgroundColor: "#5D4037",
    borderRadius: 15,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 5,
    elevation: 5,
    alignItems: "center",
    justifyContent: "flex-end",
  },
  cardImage: {
    width: "100%",
    height: "80%", // Garde un bon équilibre entre l'image et le texte
    borderTopLeftRadius: 100,
    borderTopRightRadius: 15,
  },
  cardText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#FFFFFF",
    paddingVertical: 12,
    textAlign: "center",
  },
});

export default ChoixJeu;
