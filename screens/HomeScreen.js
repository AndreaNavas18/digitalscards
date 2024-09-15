import React from 'react';
import { View, Text, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function HomeScreen({ navigation }) {
  const handleLogout = async () => {
    await AsyncStorage.removeItem('token');
    navigation.navigate('Login');
  };

  return (
    <View>
      <Text>Bienvenido a Digitals Cards!</Text>
      <Button title="Cerrar sesion" onPress={handleLogout} />
    </View>
  );
}
