import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, TextInput, Button, Text, Alert, TouchableOpacity } from 'react-native';
import { DatabaseConnection } from '../../database/database';

export default function App() {
  const db = new DatabaseConnection.getConnection;
  const [input, setInput] = useState('')
  const [resultado, setResultado] = useState([])

  const procurarFilme = () => {
    if (input.trim() === '' || input === null) {
      Alert.alert('Erro', 'Se você não digitar nada, não tem como procurar o filme.');
      return;
    }
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM filmes WHERE genero LIKE ? OR nome_filme LIKE ?',
        [`%${input}%`, `%${input}%`],
        (_, { rows }) => {
          setResultado(rows._array);
        }
      );
    });
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Insira o nome do filme ou categoria"
        value={input}
        onChangeText={setInput}
      />
      <TouchableOpacity style={styles.btnNewMovie} onPress={()=> procurarFilme()}>
                <Text style={styles.textBtn}>Procurar Filme</Text>
      </TouchableOpacity>
      {resultado.map(filmes => (
        <View key={filmes.id} style={styles.filmeItem}>
          <Text>ID: {filmes.id}</Text>
          <Text>Nome: {filmes.nome_filme}</Text>
          <Text>Gênero: {filmes.genero}</Text>
          <Text>Classificação: {filmes.classificacao}</Text>
          <Text>Data de Cadastro: {filmes.data_cad}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#9c9c9c',
    padding: 20,
    alignItems: 'center',
  },
  input: {
    borderWidth: 2,
    borderColor: 'black',
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
    width: '100%',
    fontSize: 16,
    backgroundColor: '#fafafa',
    fontSize: 16,
    fontFamily: 'monospace'
  },
  filmeItem: {
    borderWidth: 2,
    borderColor: 'black',
    borderRadius: 10,
    padding: 10,
    margin: 10,
    width: '100%',
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