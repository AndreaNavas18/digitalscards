import React, { useState } from 'react';
import { View, TextInput, Pressable, Text, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function LoginScreen({ navigation }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    try {
      const response = await fetch('http://localhost:3000/auth/login', {
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
      setError('Credenciales invalidas');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.box}>
        <Text style={styles.titleMain}>Iniciar Sesión</Text>
        <TextInput
          placeholder="Usuario"
          value={username}
          onChangeText={setUsername}
          style={styles.input}
          placeholderTextColor="#b2b2b2"
        />
        <TextInput
          placeholder="Contraseña"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          style={styles.inputPassword}
          placeholderTextColor="#b2b2b2"
        />
        <Pressable onPress={handleLogin}>
          <Text style={styles.button}>Iniciar Sesión</Text>
        </Pressable>
        {error ? <Text style={styles.errorText}>{error}</Text> : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  box: {
    marginLeft: 50,
    marginRight: 50,
    width: 200,
    padding: 16,
  },
  titleMain: {
    fontSize: 24,
    marginBottom: 16,
    color: '#1a98ff',
    textAlign: 'center',
  },
  input: {
    marginBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  inputPassword: {
    marginBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  button: {
    color: 'white',
    padding: 10,
    backgroundColor: '#1a98ff',
    textAlign: 'center',
    fontSize: 16,
    borderRadius: 10,
  },
  errorText: {
    color: '#bb0000',
    marginTop: 16,
  },
});
