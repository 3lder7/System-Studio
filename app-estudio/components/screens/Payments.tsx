import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

const PagamentosScreen = () => {
  const [activeTab, setActiveTab] = useState<'diario' | 'semanal' | 'mensal'>('diario');

  const renderContent = () => {
    switch (activeTab) {
      case 'diario':
        return (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Pagamentos do Dia</Text>
            <Text style={styles.placeholder}>Nenhum pagamento registrado hoje.</Text>
          </View>
        );
      case 'semanal':
        return (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Pagamentos da Semana</Text>
            <Text style={styles.placeholder}>Nenhum pagamento registrado nesta semana.</Text>
          </View>
        );
      case 'mensal':
        return (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Pagamentos do Mês</Text>
            <Text style={styles.placeholder}>Nenhum pagamento registrado neste mês.</Text>
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      {/* Tabs de Navegação */}
      <View style={styles.tabBar}>
        <TouchableOpacity onPress={() => setActiveTab('diario')}>
          <Text style={[styles.tabItem, activeTab === 'diario' && styles.tabActive]}>
            Diário
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setActiveTab('semanal')}>
          <Text style={[styles.tabItem, activeTab === 'semanal' && styles.tabActive]}>
            Semanal
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setActiveTab('mensal')}>
          <Text style={[styles.tabItem, activeTab === 'mensal' && styles.tabActive]}>
            Mensal
          </Text>
        </TouchableOpacity>
      </View>

      {/* Conteúdo */}
      <ScrollView contentContainerStyle={styles.content}>
        {renderContent()}
      </ScrollView>
    </View>
  );
};

export default PagamentosScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#FFFFFF',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  tabItem: {
    fontSize: 16,
    color: '#999999',
  },
  tabActive: {
    color: '#2A6B7C',
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
  content: {
    padding: 20,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2A6B7C',
    marginBottom: 10,
  },
  placeholder: {
    fontSize: 16,
    color: '#999',
  },
});
