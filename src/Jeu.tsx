import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet, Alert } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../App';
import AntDesign from 'react-native-vector-icons/AntDesign';

type Props = StackScreenProps<RootStackParamList, 'Jeu'>;

const Jeu: React.FC<Props> = ({ route, navigation }) => {
    const { players, level } = route.params;
    const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
    const [gameState, setGameState] = useState('pseudo');
    const [playerNames, setPlayerNames] = useState<string[]>(new Array(players).fill(''));
    const [currentAction, setCurrentAction] = useState('');
    const [newPseudo, setNewPseudo] = useState('');
    const [score, setScore] = useState(0);
    const [timeLeft, setTimeLeft] = useState(30);

    useEffect(() => {
        if (gameState === 'enCours') {
            getActionForPlayer();
            const timer = setInterval(() => {
                setTimeLeft(prevTime => (prevTime > 0 ? prevTime - 1 : 0));
            }, 1000);
            return () => clearInterval(timer);
        }
    }, [gameState, currentPlayerIndex, level]);

    const getActionForPlayer = () => {
        const actions = {
            SOFT: ['Raconte une blague !', 'Fais une danse rigolote !', 'Chante une chanson drôle !'],
            NORMAL: ['Fais un défi physique !', 'Chante une chanson avec une voix drôle !', 'Fais un défi de danse !'],
            HARDCORE: ['Réponds à une question difficile !', 'Fais un gage que tu détestes !', 'Décris un moment embarrassant dans ta vie !']
        };

        const truths = {
            SOFT: ['Quel est ton film préféré ?', 'Quelle est ta plus grande peur ?', 'Qui est ton meilleur ami ?'],
            NORMAL: ['Si tu pouvais voyager n’importe où, où irais-tu ?', 'Quel est ton plus grand regret ?', 'Raconte un moment embarrassant que tu as vécu !'],
            HARDCORE: ['As-tu déjà menti à un proche ?', 'Quel est ton plus grand secret ?', 'Si tu pouvais changer une décision dans ta vie, laquelle ce serait ?']
        };

        const allOptions = [...actions[level], ...truths[level]];
        const randomOption = allOptions[Math.floor(Math.random() * allOptions.length)];
        setCurrentAction(randomOption);
    };

    const handleNextTurn = () => {
        setCurrentPlayerIndex((prevIndex) => (prevIndex + 1) % players);
        setTimeLeft(30);
        setScore(prevScore => prevScore + 10);
    };

    const handleEndGame = () => {
        setGameState('finie');
        Alert.alert('Fin du jeu', 'Le jeu est terminé. Vous avez tous joué !', [
            { text: 'OK', onPress: () => navigation.navigate('Home') }
        ]);
    };

    const handleSetPlayerName = () => {
        if (newPseudo.trim() === '') {
            Alert.alert('Erreur', 'Veuillez entrer un pseudo valide.');
        } else {
            const updatedPlayerNames = [...playerNames];
            updatedPlayerNames[currentPlayerIndex] = newPseudo;
            setPlayerNames(updatedPlayerNames);
            setNewPseudo('');
            if (currentPlayerIndex === players - 1) {
                setGameState('enCours');
            } else {
                setCurrentPlayerIndex((prevIndex) => prevIndex + 1);
            }
        }
    };

    return (
        <View style={styles.container}>
            {gameState === 'pseudo' ? (
                <View style={styles.pseudoContainer}>
                    <Text style={styles.title}>Entrez votre pseudo</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Pseudo"
                        value={newPseudo}
                        onChangeText={setNewPseudo}
                    />
                    <TouchableOpacity style={styles.button} onPress={handleSetPlayerName}>
                        <Text style={styles.buttonText}>Valider</Text>
                    </TouchableOpacity>
                </View>
            ) : (
                <>
                    <Text style={styles.timer}>⏳ {timeLeft}s</Text>
                    <Text style={styles.score}>Score: {score}</Text>
                    <Text style={styles.question}>Question {currentPlayerIndex + 1}</Text>
                    <View style={styles.questionContainer}>
                        <Text style={styles.actionText}>{currentAction}</Text>
                    </View>
                    <TouchableOpacity style={styles.button} onPress={handleNextTurn}>
                        <Text style={styles.buttonText}>Suivant</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.button, styles.quitButton]} onPress={handleEndGame}>
                        <AntDesign name="closecircleo" size={24} color="white" />
                        <Text style={styles.buttonText}>Quitter</Text>
                    </TouchableOpacity>
                </>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#F5F5F5',
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    timer: {
        fontSize: 18,
        color: 'red',
        marginBottom: 10,
    },
    score: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    questionContainer: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        marginBottom: 20,
    },
    button: {
        backgroundColor: '#4CAF50',
        padding: 15,
        borderRadius: 10,
        marginBottom: 10,
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
    },
    quitButton: {
        backgroundColor: 'red',
    },
});

export default Jeu;
