import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const PagamentosScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Tela de Pagamentos</Text>
    </View>
  );
};

export default PagamentosScreen;

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  text: { fontSize: 18 },
});
