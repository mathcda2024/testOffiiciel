import React, { useEffect } from "react";
import { View, Image, StyleSheet } from "react-native";

interface SplashScreenProps {
  navigation: any;
}

const SplashScreen: React.FC<SplashScreenProps> = ({ navigation }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace("Home");
    }, 1500); // 2 seconde
    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Image
        source={require("./logo.png")} // Ton image de splash screen
        style={styles.image}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FCD64D", // Couleur de fond
  },
  image: {
    width: 300, // Ajuste la taille de ton image
    height: 300,
    resizeMode: "contain",
  },
});

export default SplashScreen;
