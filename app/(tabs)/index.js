import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';

export default function App() {
  const [posts, setPosts] = useState([]); 
  const [isLoading, setLoading] = useState(true);

  const getPostsNaAPI = async () => {
    try {
      setLoading(true);
      const response = await fetch('https://jsonplaceholder.typicode.com/todos/2');
      const post = await response.json();
      setPosts([post]); 
    } catch (error) {
      setPosts([]);
      alert('Falha ao acessar servidor. Tente novamente mais tarde!');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getPostsNaAPI();
  }, []);

  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <Text style={{ fontSize: 20 }}>
          {posts.length > 0 ? `Título: ${posts[0].title}` : 'Não possui postagens carregadas'}
        </Text>
      )}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
});

