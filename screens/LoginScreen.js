import React, { useState } from 'react';
import { View, TextInput, Button, Text } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function LoginScreen({ navigation }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    try {
      const response = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Error desconocido');
      }

      const data = await response.json();
      await AsyncStorage.setItem('token', data.token);
      navigation.navigate('Home');
    } catch (err) {
      setError('Credenciales XX invalidas');
      console.log(err);
    }
  };

  return (
    <View style={{ padding: 16 }}>
      <TextInput
        placeholder="Usuario"
        value={username}
        onChangeText={setUsername}
        style={{ marginBottom: 8, borderBottomWidth: 1, borderBottomColor: '#ccc' }}
      />
      <TextInput
        placeholder="Contraseña"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={{ marginBottom: 16, borderBottomWidth: 1, borderBottomColor: '#ccc' }}
      />
      <Button title="Ingresar" onPress={handleLogin} />
      {error ? <Text style={{ color: 'red', marginTop: 16 }}>{error}</Text> : null}
    </View>
  );
}
