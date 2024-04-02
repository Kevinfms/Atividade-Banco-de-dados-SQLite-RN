import React, {useState} from "react";
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Alert, TextInput, Button, TouchableOpacity } from 'react-native';
import { DatabaseConnection } from "../../database/database";
import { Picker } from '@react-native-picker/picker';


export default function App() {
    const db = new DatabaseConnection.getConnection;
    const [movie, setMovie] = useState('');
    const [clas, setClass] = useState('');
    const [category, setCate] = useState('');

    const salvaFilme = () => {
        if (movie.trim() === '' || movie === null) {
            Alert.alert('Erro', 'Por favor, insira um texto válido para adicionar o nome do filme');
            return;
        }
        if (clas.trim() === '' || clas === null) {
            Alert.alert('Erro', 'Por favor, selecione uma classificação para o filme');
            return;
        }
        if (category.trim() === '' || category === null) {
            Alert.alert('Erro', 'Por favor, selecione uma categoria para o filme');
            return;
        }

        const dataAtual = new Date().toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' });

        db.transaction(
            tx => {
                tx.executeSql(
                    'INSERT INTO filmes (nome_filme, genero, classificacao, data_cad) VALUES (?, ?, ?, ?)',
                    [movie, category, clas, dataAtual],
                    (_, { rowsAffected }) => {
                        console.log(rowsAffected);
                        setMovie('');
                        setCate('');
                        setClass('');
                    },
                    (_, error) => {
                        console.error('Erro ao adicionar o filme:', error);
                        Alert.alert('Erro', 'Ocorreu um erro ao adicionar o filme.');
                    }
                );
            }
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Insira aqui um novo Filme</Text>

            <TextInput
                style={styles.input}
                value={movie}
                onChangeText={setMovie}
                placeholder="Digite um novo Filme"
            />

            <Picker
                selectedValue={category}
                style={styles.input}
                onValueChange={(itemValue) => setCate(itemValue)}
            >
                <Picker.Item label="Selecione a Categoria" value=""/>
                <Picker.Item label="Ação" value="Ação"/>
                <Picker.Item label="Comédia" value="Comédia"/>
                <Picker.Item label="Drama" value="Drama" />
                <Picker.Item label="Fantasia" value="Fantasia"/>
                <Picker.Item label="Faroeste" value="Faroeste"/>
                <Picker.Item label="Ficção Científica" value="Ficção Científica"/>
                <Picker.Item label="Romance" value="Romance"/>
                <Picker.Item label="Musical" value="Musical"/>
            </Picker>

            <Picker
                selectedValue={clas}
                style={styles.input}
                onValueChange={(itemValue) => setClass(itemValue)}
            >
                <Picker.Item label="Selecione a Classificação" value="" />
                <Picker.Item label="Livre" value="Livre" />
                <Picker.Item label="12 anos" value="12 anos" />
                <Picker.Item label="14 anos" value="14 anos" />
                <Picker.Item label="16 anos" value="16 anos" />
                <Picker.Item label="18 anos" value="18 anos" />
            </Picker>

            {/* <Button title="Salvar novo filme" onPress={salvaFilme} /> */}
            <TouchableOpacity style={styles.btnNewMovie} onPress={()=> salvaFilme()}>
                <Text style={styles.textBtn}>Salvar Novo Filme</Text>
            </TouchableOpacity>

            <StatusBar style="auto" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#9c9c9c',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    title: {
        fontSize: 20,
        marginBottom: 20,
        fontFamily: 'monospace',
        fontWeight: 'bold',
        textTransform: 'uppercase'
    },
    input: {
        width: '90%',
        borderWidth: 2,
        borderColor: 'black',
        borderRadius: 10,
        padding: 10,
        marginBottom: 20,
        fontSize: 16,
        fontFamily: 'monospace',
        fontWeight: 'bold',
        backgroundColor: '#fafafa'
    },
    btnNewMovie:{
        width: '90%',
        backgroundColor: 'blueviolet',
        textAlign: 'center',
        height: 35,
        borderRadius: 10,
        borderColor: 'white',
        borderWidth: 2
    },
    textBtn:{
        textAlign: 'center', 
        fontSize: 18, 
        fontFamily: 'monospace', 
        fontWeight: 'bold', 
        paddingTop: 3,
        color: 'white'
    }
});