import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  StatusBar,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const AgendaScreen = () => {
  const commitments = [
    { id: 1, time: '09:00', name: 'Clarisvete', service: 'Limpeza', status: 'Pago' },
    { id: 2, time: '11:30', name: 'Adalberto', service: 'Esfoliação', status: 'Pendente' },
    { id: 3, time: '14:00', name: 'Simone', service: 'Massagem', status: 'Pendente' },
  ];

  const renderCommitment = (commitment: any) => (
    <View key={commitment.id} style={styles.commitmentCard}>
      <View style={styles.commitmentTimeContainer}>
        <Text style={styles.commitmentTime}>{commitment.time}</Text>
      </View>
      <View style={styles.commitmentDetailsContainer}>
        <Text style={styles.commitmentName}>{commitment.name}</Text>
        <Text style={styles.commitmentService}>{commitment.service}</Text>
      </View>
      <View
        style={[
          styles.commitmentStatusBadge,
          commitment.status === 'Pago' && styles.statusPago,
          commitment.status === 'Pendente' && styles.statusPendente,
        ]}
      >
        <Text style={styles.commitmentStatusText}>{commitment.status}</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={Platform.OS === 'android' ? '#F8F9FA' : undefined}
      />
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Abril 2025</Text>
        <View style={styles.headerControls}>
          <TouchableOpacity>
            <Ionicons name="chevron-back" size={24} color="#2A6B7C" />
          </TouchableOpacity>
          <TouchableOpacity>
            <Ionicons name="chevron-forward" size={24} color="#2A6B7C" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.tabBar}>
          <Text style={[styles.tabItem, styles.tabActive]}>Semana</Text>
          <Text style={styles.tabItem}>Dia</Text>
          <Text style={styles.tabItem}>Mês</Text>
        </View>

        <Text style={styles.sectionTitle}>Compromissos - 29 de Abril</Text>

        {commitments.map((commitment) => renderCommitment(commitment))}
      </ScrollView>

      <TouchableOpacity style={styles.floatingButton}>
        <Ionicons name="add" size={28} color="#FFFFFF" />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2A6B7C',
  },
  headerControls: {
    flexDirection: 'row',
    gap: 10,
  },
  container: {
    padding: 20,
  },
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
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
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2A6B7C',
    marginBottom: 10,
  },
  commitmentCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  commitmentTimeContainer: {
    marginRight: 15,
  },
  commitmentTime: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2A6B7C',
  },
  commitmentDetailsContainer: {
    flex: 1,
  },
  commitmentName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333333',
  },
  commitmentService: {
    fontSize: 14,
    color: '#666666',
  },
  commitmentStatusBadge: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 80,
  },
  statusPago: {
    backgroundColor: '#4ECDC4',
  },
  statusPendente: {
    backgroundColor: '#FFC145',
  },
  commitmentStatusText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  floatingButton: {
    position: 'absolute',
    right: 20,
    bottom: 100,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#2A6B7C',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
  },
});

export default AgendaScreen;
