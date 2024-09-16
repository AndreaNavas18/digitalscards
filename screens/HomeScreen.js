import React, { useEffect, useState } from 'react';
import { View, Text, Pressable } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function HomeScreen({ navigation }) {
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProtectedData = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        if (!token) {
          throw new Error('Token no encontrado');
        }

        const response = await fetch('http://localhost:3000/api/home', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Error en la solicitud');
        }

        const data = await response.json();
        setMessage(data.message);
      } catch (err) {
        setError('No se pudo acceder a la ruta protegida');
        console.log(err);
      }
    };

    fetchProtectedData();
  }, []);

  const handleLogout = async () => {
    await AsyncStorage.removeItem('token');
    navigation.navigate('Login');
  };

  return (
    <View>
      {error ? <Text>{error}</Text> : <Text>{message}</Text>}
      <Pressable onPress={handleLogout}>
        <Text style={{ color: 'white', padding: 10, backgroundColor: 'red' }}>Cerrar Sesión</Text>
      </Pressable>
    </View>
  );
}
