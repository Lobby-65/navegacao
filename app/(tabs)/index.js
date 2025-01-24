import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text, View } from 'react-native';

export default function App() {
  const [users, setUsers] = useState([]);
  const [isLoading, setLoading] = useState(true);

  const getUsersFromAPI = async () => {
    try {
      setLoading(true);
      const response = await fetch('https://jsonplaceholder.typicode.com/users');
      const data = await response.json();
      setUsers(data); // Atualiza o estado com a lista de usuários
    } catch (error) {
      setUsers([]);
      alert('Falha ao acessar servidor. Tente novamente mais tarde!');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUsersFromAPI();
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.phone}>Phone: {item.phone}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <FlatList
          data={users}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
        />

        
      )}
      <StatusBar style="auto" />
    </View>

    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  item: {
    padding: 1,
    borderBottomWidth: 4,
    borderBottomColor: 'black',
    width: '100%',
    }
  });