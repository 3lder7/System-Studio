import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const App = () => {
  const compromissos = [
    { id: '1', cliente: 'Clarisvete', servico: 'Limpeza', horario: '9:00 AM' },
    { id: '2', cliente: 'Adalberto', servico: 'Esfoliação', horario: '11:30 AM' },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.greeting}>Bom dia</Text>

      <View style={styles.agendaContainer}>
        <Text style={styles.sectionTitle}>Agenda do dia</Text>
        {compromissos.map((item) => (
          <TouchableOpacity key={item.id} style={styles.agendaItem}>
            <Text style={styles.agendaText}>
              {item.cliente}; {item.servico}
            </Text>
            <Text style={styles.agendaTime}>{item.horario}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.shortcutsContainer}>
        <Text style={styles.sectionTitle}>Atalhos</Text>
        <View style={styles.shortcuts}>
          <TouchableOpacity style={styles.shortcut}>
            <Text style={styles.shortcutText}>Agenda</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.shortcut}>
            <Text style={styles.shortcutText}>Clientes</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.shortcut}>
            <Text style={styles.shortcutText}>Pagamentos</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.summaryContainer}>
        <View style={styles.summaryBox}>
          <Text style={styles.summaryValue}>4</Text>
          <Text style={styles.summaryLabel}>COMPROMISSOS</Text>
        </View>
        <View style={styles.summaryBox}>
          <Text style={styles.summaryValue}>R$350</Text>
          <Text style={styles.summaryLabel}>RECEITA ESTIMADA</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8E7E8',
    padding: 25,
  },
  greeting: {
    fontSize: 34,
    fontWeight: 'bold',
    color: '#8B4550',
    marginBottom: 25,
  },
  agendaContainer: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 15,
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '600',
    color: '#8B4550',
    marginBottom: 15,
  },
  agendaItem: {
    backgroundColor: '#FAD4D8',
    padding: 15,
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  agendaText: {
    fontSize: 18,
    color: '#8B4550',
    fontWeight: '500',
  },
  agendaTime: {
    fontSize: 16,
    color: '#8B4550',
    fontWeight: '400',
  },
  shortcutsContainer: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 15,
    marginBottom: 25,
  },
  shortcuts: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  shortcut: {
    backgroundColor: '#FAD4D8',
    paddingVertical: 20,
    paddingHorizontal: 25,
    borderRadius: 12,
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 8,
  },
  shortcutText: {
    fontSize: 18,
    color: '#8B4550',
    fontWeight: '500',
  },
  summaryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  summaryBox: {
    backgroundColor: '#8B4550',
    paddingVertical: 20,
    paddingHorizontal: 25,
    borderRadius: 12,
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 8,
  },
  summaryValue: {
    fontSize: 20,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  summaryLabel: {
    fontSize: 14,
    color: '#FFFFFF',
    fontWeight: '400',
  },
});

export default App;
