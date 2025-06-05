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

type RootStackParamList = {
  Home: undefined;
  AddAppointment: { addAppointment: (newAppointment: any) => void };
};
type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

const TelaInicial = () => {
  const navigation = useNavigation<NavigationProp>();

  const [receitaHoje, setReceitaHoje] = useState(0);
  const [compromissosHoje, setCompromissosHoje] = useState(0);
  const [compromissos, setCompromissos] = useState<any[]>([]);

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

  // Componente para exibir os compromissos
  const CommitmentItem = ({ compromisso }: { compromisso: any }) => (
    <View style={styles.commitmentItem}>
      <View style={styles.commitmentDetails}>
        <Text style={styles.commitmentTitle}>{compromisso.cliente}</Text>
        <Text style={styles.commitmentSubtitle}>{compromisso.servico}</Text>
        <Text style={styles.commitmentDate}>
          {compromisso.data} às {compromisso.horario}
        </Text>
      </View>
      <View
        style={[
          styles.statusBadge,
          compromisso.status === 'Pendente' && styles.statusPendente,
        ]}
      >
        <Text style={styles.statusText}>{compromisso.status}</Text>
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
        <StatCard title="Receita de hoje" value={'000.00'} prefix="R$ " />
        <StatCard title="Compromissos hoje" value={compromissosHoje} />

        {/* Lista de compromissos */}
        <Text style={styles.sectionTitle}>Próximos Compromissos</Text>
        {compromissos.length > 0 ? (
          compromissos.map((compromisso) => (
            <CommitmentItem key={compromisso.id} compromisso={compromisso} />
          ))
        ) : (
          <Text style={styles.noCommitmentsText}>Nenhum compromisso encontrado.</Text>
        )}

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
        activeOpacity={0.8}
      >
        <Text style={styles.floatingButtonText}>+</Text>
      </TouchableOpacity>
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
    fontWeight: '600',
    color: '#2A6B7C',
    marginBottom: 10,
  },
  noCommitmentsText: {
    fontSize: 14,
    color: '#999999',
    textAlign: 'center',
    marginVertical: 20,
  },
  commitmentItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
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
  commitmentDetails: {
    flex: 1,
  },
  commitmentTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333333',
  },
  commitmentSubtitle: {
    fontSize: 14,
    color: '#666666',
    marginVertical: 5,
  },
  commitmentDate: {
    fontSize: 12,
    color: '#999999',
  },
  statusBadge: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 80,
  },
  statusPendente: {
    backgroundColor: '#FFC145',
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#333333',
  },
  bottomSpacer: {
    height: 80,
  },
  floatingButton: {
    position: 'absolute',
    right: 20,
    bottom: 40,
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
    zIndex: 10,
  },
  floatingButtonText: {
    fontSize: 30,
    color: '#FFFFFF',
  },
});

export default TelaInicial;
