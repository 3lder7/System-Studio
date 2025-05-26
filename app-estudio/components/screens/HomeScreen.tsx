import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  SafeAreaView, 
  StatusBar, 
  Platform 
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { Button } from 'react-native';


type RootStackParamList = {
  Home: undefined;
  AddAppointment: { addAppointment: (newAppointment: any) => void };
};
type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;


const TelaInicial = () => {
  const navigation = useNavigation<NavigationProp>();
  const [receitaHoje, setReceitaHoje] = useState(350);
  const [compromissosHoje, setCompromissosHoje] = useState(4);
  const [compromissos, setCompromissos] = useState([
    {
      id: 1,
      horario: '09:00',
      cliente: 'Clarisvete',
      servico: 'Limpeza',
      status: 'pago',
    },
    {
      id: 2,
      horario: '11:30',
      cliente: 'Adalberto',
      servico: 'Esfoliação',
      status: 'pendente',
    },
    {
      id: 3,
      horario: '14:00',
      cliente: 'Simone',
      servico: 'Massagem',
      status: 'pendente',
    },
  ]);

  // Componente para o card de estatísticas
  const StatCard = ({ title, value, prefix = '' }) => (
    <View style={styles.statCard}>
      <View style={styles.statCardAccent} />
      <View style={styles.statCardContent}>
        <Text style={styles.statCardTitle}>{title}</Text>
        <Text style={styles.statCardValue}>
          {prefix && <Text>{prefix}</Text>}
          {value}
        </Text>
      </View>
    </View>
  );

  // Componente para o card de compromisso
  const AppointmentCard = ({ horario, cliente, servico, status }) => (
    <View style={styles.appointmentCard}>
      <View style={styles.appointmentCardAccent} />
      <View style={styles.appointmentTimeContainer}>
        <Text style={styles.appointmentTime}>{horario}</Text>
      </View>
      <View style={styles.appointmentDetails}>
        <Text style={styles.appointmentClient}>{cliente}</Text>
        <Text style={styles.appointmentService}>{servico}</Text>
      </View>
      <View style={styles.appointmentStatusContainer}>
        <View
          style={[
            styles.appointmentStatus,
            status === 'pago'
              ? styles.statusPaid
              : styles.statusPending,
          ]}
        >
          <Text
            style={[
              styles.appointmentStatusText,
              status === 'pago'
                ? styles.statusPaidText
                : styles.statusPendingText,
            ]}
          >
            {status === 'pago' ? 'Pago' : 'Pendente'}
          </Text>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={Platform.OS === 'android' ? '#F8F9FA' : undefined}
      />
      <ScrollView style={styles.container}>
        <Text style={styles.greeting}>Olá, Maiane!</Text>

        {/* Cards de estatísticas */}
        <StatCard title="Receita de hoje" value={receitaHoje.toFixed(2)} prefix="R$ " />
        <StatCard title="Compromissos hoje" value={compromissosHoje} />

        {/* Seção de próximos compromissos */}
        <Text style={styles.sectionTitle}>Próximos compromissos</Text>

        {/* Lista de compromissos */}
        {compromissos.map((compromisso) => (
          <AppointmentCard
            key={compromisso.id}
            horario={compromisso.horario}
            cliente={compromisso.cliente}
            servico={compromisso.servico}
            status={compromisso.status}
          />
        ))}

        {/* Espaço para garantir que o último item seja visível acima da barra de navegação */}
        <View style={styles.bottomSpacer} />
      </ScrollView>

      {/* Botão flutuante de adicionar */}
      <TouchableOpacity
        style={styles.floatingButton}
        onPress={() =>
          navigation.navigate('AddAppointment', {
            addAppointment: (newAppointment) => {
              setCompromissos((prev) => JSON.parse(JSON.stringify([...prev, newAppointment])));
            },
          })
        }
        activeOpacity={0.8} // Melhora feedback do toque no iOS
      >
        <Text style={styles.floatingButtonText}>+</Text>
      </TouchableOpacity>

      {/* Barra de navegação inferior */}
      <View style={styles.bottomNav} pointerEvents="box-none">
        <TouchableOpacity style={[styles.navItem, styles.navItemActive]}>
          <Ionicons name="calendar" size={24} color="#2A6B7C" />
          <Text style={[styles.navText, styles.navTextActive]}>Início</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="list" size={24} color="#999999" />
          <Text style={styles.navText}>Agenda</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="people" size={24} color="#999999" />
          <Text style={styles.navText}>Clientes</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="cash" size={24} color="#999999" />
          <Text style={styles.navText}>Pagamentos</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F8F9FA',
  },
  greeting: {
    fontSize: 24,
    fontWeight: '600',
    color: '#2A6B7C',
    marginBottom: 20,
  },
  statCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    marginBottom: 20,
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    overflow: 'hidden',
  },
  statCardAccent: {
    width: 4,
    backgroundColor: '#4ECDC4',
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  statCardContent: {
    padding: 20,
    flex: 1,
  },
  statCardTitle: {
    fontSize: 16,
    color: '#666666',
    marginBottom: 10,
  },
  statCardValue: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2A6B7C',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '500',
    color: '#2A6B7C',
    marginTop: 10,
    marginBottom: 15,
  },
  appointmentCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    marginBottom: 15,
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
    overflow: 'hidden',
  },
  appointmentCardAccent: {
    width: 4,
    backgroundColor: '#2A6B7C',
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
  },
  appointmentTimeContainer: {
    justifyContent: 'center',
    paddingHorizontal: 15,
  },
  appointmentTime: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2A6B7C',
  },
  appointmentDetails: {
    flex: 1,
    justifyContent: 'center',
    paddingVertical: 15,
  },
  appointmentClient: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333333',
  },
  appointmentService: {
    fontSize: 14,
    color: '#666666',
    marginTop: 2,
  },
  appointmentStatusContainer: {
    justifyContent: 'center',
    paddingRight: 15,
  },
  appointmentStatus: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12,
  },
  statusPaid: {
    backgroundColor: '#4ECDC4',
  },
  statusPending: {
    backgroundColor: '#FFC145',
  },
  appointmentStatusText: {
    fontSize: 12,
    fontWeight: '500',
  },
  statusPaidText: {
    color: '#FFFFFF',
  },
  statusPendingText: {
    color: '#333333',
  },
  floatingButton: {
    position: 'absolute',
    right: 20,
    bottom: 100, // aumente para garantir que fique acima da barra
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
    zIndex: 10, // garante que fique acima dos outros elementos
  },
  floatingButtonText: {
    fontSize: 30,
    color: '#FFFFFF',
  },
  bottomNav: {
    flexDirection: 'row',
    height: 70,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  navItem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  navItemActive: {
    borderTopWidth: 2,
    borderTopColor: '#2A6B7C',
  },
  navText: {
    fontSize: 12,
    marginTop: 5,
    color: '#999999',
  },
  navTextActive: {
    color: '#2A6B7C',
  },
  bottomSpacer: {
    height: 80,
  },
});

export default TelaInicial;
