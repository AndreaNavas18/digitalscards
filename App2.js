import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, Button } from 'react-native';

const icon = require('./assets/images/ti.png');

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Image source={icon} style={{ width: 100, height: 100 }} /> 
      <Text style={{color: 'white'}}>Welcome to Digital Cards</Text>
      <Button title="Pulsa aqui" onPress={() => alert('Hola')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#599b9b',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
