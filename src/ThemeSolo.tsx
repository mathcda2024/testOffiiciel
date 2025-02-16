import React from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import { View, Text, Image, TouchableOpacity, StyleSheet, FlatList } from 'react-native';


type RootStackParamList = {
  ThemeSolo: undefined;
  Pret: undefined;
  NiveauSolo: undefined;
};

type ThemeSoloScreenNavigationProp = StackNavigationProp<RootStackParamList, 'ThemeSolo'>;

type Props = {
  navigation: ThemeSoloScreenNavigationProp;
};

// Vérifier si le fichier sport.png est bien dans src/
const sportImage = require('./image/sport.png'); // Chemin correct pour une image locale
const musiqueImage = require('./image/musique.jpg'); // Chemin correct pour une image locale
const scienceImage = require('./image/science.png'); // Chemin correct pour une image locale
const geoImage = require('./image/geo.jpg'); // Chemin correct pour une image locale
const histoireImage = require('./image/histoire.jpg'); // Chemin correct pour une image locale
const starImage = require('./image/star.jpg'); // Chemin correct pour une image locale
const corpsImage = require('./image/corps.jpg'); // Chemin correct pour une image locale
const cultureImage = require('./image/culture.jpg'); // Chemin correct pour une image locale



const themes = [
  { id: '1', title: 'Histoire', image: histoireImage },
  { id: '7', title: 'Geographie', image: geoImage },
  { id: '2', title: 'Science', image:  scienceImage},
  { id: '3', title: 'Sport', image: sportImage }, // Image locale
  { id: '4', title: 'Musique', image: musiqueImage  },
  { id: '5', title: 'Culture générale', image: cultureImage },
  { id: '6', title: 'Star', image: starImage },
  { id: '8', title: 'Anatomie', image: corpsImage },
];

const ThemeSolo: React.FC<Props> = ({ navigation }) => {
  return (
    <View style={styles.container}>

      {/* Retour à la page précédente 
            <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('NiveauSolo')}>
              <Text> - </Text>
      </TouchableOpacity>
      */}
      

     <View style={styles.titleContainer}>
        <Text style={styles.title}>Choisissez un theme
       </Text>
      </View>
      
      <FlatList
        data={themes}
        keyExtractor={(item) => item.id}
        numColumns={2}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('Pret')}>
            <Image source={typeof item.image === 'string' ? { uri: item.image } : item.image} style={styles.image} />
            <Text style={styles.cardText}>{item.title}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFD700',
    alignItems: 'center',
    paddingTop: 50,
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
   marginBottom: 50,
   marginTop: -20,
width:'90%',
},
    
title: {
  fontSize: 24,
  fontWeight: "bold",
  color: "#333",
  textAlign: "center",
},
  card: {
    backgroundColor: '#FFF',
    borderRadius: 15,
    padding: 10,
    margin: 10,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 2, height: 2 },
    elevation: 5,
    width: 160, // Taille uniforme
    height: 200, // Hauteur plus grande pour bien afficher l'image
  },
  image: {
    width: '100%', // L'image prend toute la largeur de la carte
    height: 120, // Hauteur ajustée pour garder un bon ratio
    borderRadius: 10, // Coins arrondis
    resizeMode: 'cover', // Ajuste l'image pour bien remplir l'espace
  },
  cardText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
    color: '#444',
    textAlign: 'center',
  },


  backButton: {
    backgroundColor: '#FFD700',
    padding: 15,
    marginVertical: 5,
    width: '90%',
    alignItems: 'center',
    borderRadius: 5,
    marginTop: -30, // Ajuster la marge pour que RETOUR soit plus proche de OK
  },
});

export default ThemeSolo;