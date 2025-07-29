import React, { useState, useEffect } from 'react';
import styles from '../../styles/Schedule.styles';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  StatusBar,
  Platform,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { carregarItem, salvarItem } from '../storage';
import { useIsFocused } from '@react-navigation/native';

const AgendaScreen = () => {
  const today = new Date();
  const [selectedDate, setSelectedDate] = useState(today);
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [compromissos, setCompromissos] = useState<any[]>([]);
  const isFocused = useIsFocused();

  const mesAtual = new Date(currentYear, currentMonth).toLocaleString('default', { month: 'long' });
  const anoAtual = currentYear;

  useEffect(() => {
    if (isFocused) {
      carregarItem<any[]>('compromissos').then((dados) => {
        if (dados) setCompromissos(dados);
      });
    }
  }, [isFocused]);

  const updateStatus = (id: number, novoStatus: string) => {
    const novos = compromissos.map((item) =>
      item.id === id ? { ...item, status: novoStatus } : item
    );
    setCompromissos(novos);
    salvarItem('compromissos', novos);
  };

  const deleteCommitment = (id: number) => {
    const novos = compromissos.filter((item) => item.id !== id);
    setCompromissos(novos);
    salvarItem('compromissos', novos);
  };

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
    setSelectedDate(new Date(currentYear, currentMonth === 0 ? 11 : currentMonth - 1, 1));
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
    setSelectedDate(new Date(currentYear, currentMonth === 11 ? 0 : currentMonth + 1, 1));
  };

  // Compromissos do dia selecionado
  const compromissosDoDia = compromissos.filter(
    (item) =>
      item.data === selectedDate.toLocaleDateString('pt-BR')
  );

  // Renderização dos compromissos do dia
  const renderCompromissosDia = () => (
    <View>
      {compromissosDoDia.length === 0 ? (
        <Text style={{ color: '#999', marginTop: 10 }}>Nenhum compromisso para este dia.</Text>
      ) : (
        compromissosDoDia.map((compromisso) => (
          <TouchableOpacity
            key={compromisso.id}
            onPress={() =>
              Alert.alert(
                'Atualizar Status',
                `Escolha o novo status para ${compromisso.cliente}`,
                [
                  { text: 'Pago', onPress: () => updateStatus(compromisso.id, 'Pago') },
                  { text: 'Cancelado', onPress: () => updateStatus(compromisso.id, 'Cancelado') },
                  { text: 'Pendente', onPress: () => updateStatus(compromisso.id, 'Pendente') },
                  { text: 'Deletar', style: 'destructive', onPress: () => deleteCommitment(compromisso.id) },
                  { text: 'Fechar', style: 'cancel' },
                ]
              )
            }
            activeOpacity={0.7}
          >
            <View style={{
              backgroundColor: '#fff',
              borderRadius: 8,
              padding: 12,
              marginBottom: 10,
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              shadowColor: '#000',
              shadowOpacity: 0.05,
              shadowOffset: { width: 0, height: 2 },
              shadowRadius: 4,
              elevation: 2,
            }}>
              <View>
                <Text style={{ fontWeight: 'bold', color: '#2A6B7C' }}>{compromisso.cliente}</Text>
                <Text style={{ color: '#666' }}>{compromisso.servico}</Text>
                <Text style={{ color: '#2A6B7C', fontWeight: 'bold' }}>Valor: R$ {compromisso.valor}</Text>
                <Text style={{ color: '#999' }}>{compromisso.data} às {compromisso.horario}</Text>
              </View>
              <View style={{
                paddingVertical: 5,
                paddingHorizontal: 10,
                borderRadius: 15,
                backgroundColor:
                  compromisso.status === 'Pendente'
                    ? '#FFC145'
                    : compromisso.status === 'Cancelado'
                    ? '#FF6B6B'
                    : '#4ECDC4',
              }}>
                <Text style={{ color: '#333', fontWeight: '600', fontSize: 12 }}>
                  {compromisso.status}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        ))
      )}
    </View>
  );

  // Renderização do mês
  const renderMes = () => {
    const diasNoMes = new Date(currentYear, currentMonth + 1, 0).getDate();
    const dias = Array.from({ length: diasNoMes }, (_, i) => i + 1);
    const diasDaSemana = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
    const today = new Date();

    // Cria um Set com os dias do mês que possuem compromissos
    const diasComCompromissos = new Set(
      compromissos
        .filter((item) => {
          const [dia, mes, ano] = item.data.split('/');
          return (
            parseInt(mes, 10) - 1 === currentMonth &&
            parseInt(ano, 10) === currentYear
          );
        })
        .map((item) => parseInt(item.data.split('/')[0], 10))
    );

    // Verifica se o mês/ano atual é o mesmo do sistema
    const isMesAtual =
      currentMonth === today.getMonth() && currentYear === today.getFullYear();

    return (
      <View>
        <Text style={styles.sectionSubtitle}>
          {mesAtual.charAt(0).toUpperCase() + mesAtual.slice(1)} de {anoAtual}
        </Text>
        <View style={styles.calendarGrid}>
          {dias.map((dia) => {
            const date = new Date(currentYear, currentMonth, dia);
            const isToday = isMesAtual && date.toDateString() === today.toDateString();
            // Só marca como selecionado se o usuário clicar
            const isSelected = date.toDateString() === selectedDate.toDateString();

            return (
              <TouchableOpacity
                key={dia}
                onPress={() => setSelectedDate(date)}
                style={[
                  styles.calendarDay,
                  // Só mostra o círculo azul se for o dia selecionado (exceto o dia atual no mês atual)
                  isSelected && (!isMesAtual || !isToday) && styles.calendarDaySelected,
                  // Mostra o círculo azul do dia atual apenas no mês atual
                  isToday && styles.currentDay,
                ]}
              >
                <Text style={[
                  styles.calendarDayText,
                  isToday && styles.calendarDayTextActive,
                  isSelected && (!isMesAtual || !isToday) && styles.calendarDayTextActive,
                ]}>
                  {dia}
                </Text>
                {/* Ponto laranja para dias com compromisso */}
                {diasComCompromissos.has(dia) && (
                  <View
                    style={{
                      width: 7,
                      height: 7,
                      borderRadius: 4,
                      backgroundColor: '#FF9800',
                      alignSelf: 'center',
                      marginTop: 2,
                    }}
                  />
                )}
              </TouchableOpacity>
            );
          })}
        </View>
        <Text style={styles.sectionSubtitle}>
          {diasDaSemana[selectedDate.getDay()]}, {selectedDate.getDate()} de {mesAtual} de {anoAtual}
        </Text>
        {renderCompromissosDia()}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={Platform.OS === 'android' ? '#F8F9FA' : undefined}
      />
      <View style={styles.header}>
        <Text style={styles.headerTitle}>
          {mesAtual.charAt(0).toUpperCase() + mesAtual.slice(1)} {anoAtual}
        </Text>
        <View style={styles.headerControls}>
          <TouchableOpacity onPress={handlePrevMonth}>
            <Ionicons name="chevron-back" size={24} color="#2A6B7C" />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleNextMonth}>
            <Ionicons name="chevron-forward" size={24} color="#2A6B7C" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.container}>
        {renderMes()}
      </ScrollView>
    </SafeAreaView>
  );
};

export default AgendaScreen;