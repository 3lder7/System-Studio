import React, { useState } from 'react';
import styles from '../../styles/HomeScreen.styles';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Platform,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

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

  //Card de estatísticas
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

  const CommitmentItem = ({ compromisso }: { compromisso: any }) => {
    const hoje = new Date().toLocaleDateString('pt-BR');

    const handlePress = () => {
      Alert.alert(
        'Atualizar Status',
        `Escolha o novo status para ${compromisso.cliente}`,
        [
          {
            text: 'Pago',
            onPress: () => updateStatus('Pago'),
          },
          {
            text: 'Cancelado',
            onPress: () => updateStatus('Cancelado'),
          },
          {
            text: 'Pendente',
            onPress: () => updateStatus('Pendente'),
          },
          {
            text: 'Fechar',
            style: 'cancel',
          },
        ]
      );
    };

    const updateStatus = (novoStatus: string) => {
      setCompromissos((prev) =>
        prev.map((item) => {
          if (item.id === compromisso.id) {
            if (
              item.status !== 'Cancelado' &&
              novoStatus === 'Cancelado' &&
              item.data === hoje
            ) {
              setReceitaHoje((prev) => prev - parseFloat(item.valor));
              setCompromissosHoje((prev) => prev - 1);
            }
            if (
              item.status === 'Cancelado' &&
              novoStatus !== 'Cancelado' &&
              item.data === hoje
            ) {
              setReceitaHoje((prev) => prev + parseFloat(item.valor));
              setCompromissosHoje((prev) => prev + 1);
            }
            return { ...item, status: novoStatus };
          }
          return item;
        })
      );
    };

    return (
      <TouchableOpacity onPress={handlePress} activeOpacity={0.7}>
        <View style={styles.commitmentItem}>
          <View style={styles.commitmentDetails}>
            <Text style={styles.commitmentTitle}>{compromisso.cliente}</Text>
            <Text style={styles.commitmentSubtitle}>{compromisso.servico}</Text>
            <Text style={[styles.commitmentSubtitle, { fontWeight: 'bold', color: '#2A6B7C' }]}>
              Valor: R$ {compromisso.valor}
            </Text>
            <Text style={styles.commitmentDate}>
              {compromisso.data} às {compromisso.horario}
            </Text>
          </View>
          <View
            style={[
              styles.statusBadge,
              compromisso.status === 'Pendente' && styles.statusPendente,
              compromisso.status === 'Cancelado' && { backgroundColor: '#FF6B6B' },
              compromisso.status === 'Pago' && { backgroundColor: '#4ECDC4' },
            ]}
          >
            <Text style={styles.statusText}>{compromisso.status}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={Platform.OS === 'android' ? '#F8F9FA' : undefined}
      />
      <ScrollView style={styles.container}>
        <Text style={styles.greeting}>Olá, Maiane!</Text>

        <StatCard title="Receita de hoje" value={receitaHoje.toFixed(2)} prefix="R$ " />
        <StatCard title="Compromissos hoje" value={compromissosHoje} />

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
              const hoje = new Date().toLocaleDateString('pt-BR');
              setCompromissos((prev) => [...prev, newAppointment]);

              if (newAppointment.data === hoje) {
                setCompromissosHoje((prev) => prev + 1);
                setReceitaHoje((prev) => prev + parseFloat(newAppointment.valor));
              }
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

export default TelaInicial;
