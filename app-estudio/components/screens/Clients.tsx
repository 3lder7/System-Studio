import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ClientesScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Tela de Clientes</Text>
    </View>
  );
};

export default ClientesScreen;

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  text: { fontSize: 18 },
});
