import React, { useState } from 'react';
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
  const today = new Date();
  const [activeTab, setActiveTab] = useState<'Semana' | 'Dia' | 'Mês'>('Semana');
  const [selectedDate, setSelectedDate] = useState(today);

  const diaSemanaIndex = today.getDay();
  const diaHoje = today.getDate();
  const mesAtual = today.toLocaleString('default', { month: 'long' });
  const anoAtual = today.getFullYear();
  const diasDaSemana = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];

  const renderSemana = () => {
      const semana: React.ReactNode[] = [];

    for (let i = 0; i < 7; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() - diaSemanaIndex + i);
      const isToday = date.toDateString() === today.toDateString();
      const isSelected = date.toDateString() === selectedDate.toDateString();

      semana.push(
        <TouchableOpacity
          key={i}
          onPress={() => setSelectedDate(date)}
          style={[
            styles.weekDay,
            isToday && styles.weekDayToday,
            isSelected && styles.weekDaySelected,
          ]}
        >
          <Text style={[styles.weekDayText, (isToday || isSelected) && styles.weekDayTextActive]}>
            {diasDaSemana[i]}
          </Text>
          <Text style={[styles.weekDayDate, (isToday || isSelected) && styles.weekDayTextActive]}>
            {date.getDate()}
          </Text>
        </TouchableOpacity>
      );
    }

    return (
      <View>
        <View style={styles.weekRow}>{semana}</View>
        <Text style={styles.sectionSubtitle}>
          Dia selecionado: {selectedDate.getDate()} de {mesAtual} de {anoAtual}
        </Text>
      </View>
    );
  };

  const renderDia = () => {
    const horas = Array.from({ length: 10 }, (_, i) => `${8 + i}:00`);

    return (
      <View>
        <Text style={styles.sectionSubtitle}>
          {diasDaSemana[selectedDate.getDay()]}, {selectedDate.getDate()} de {mesAtual} de {anoAtual}
        </Text>
        {horas.map((hora, index) => (
          <View key={index} style={styles.timeSlot}>
            <Text style={styles.timeSlotHour}>{hora}</Text>
            <View style={styles.timeSlotLine} />
          </View>
        ))}
      </View>
    );
  };

  const renderMes = () => {
    const diasNoMes = new Date(anoAtual, today.getMonth() + 1, 0).getDate();
    const dias = Array.from({ length: diasNoMes }, (_, i) => i + 1);

    return (
      <View>
        <Text style={styles.sectionSubtitle}>
          {mesAtual.charAt(0).toUpperCase() + mesAtual.slice(1)} de {anoAtual}
        </Text>
        <View style={styles.calendarGrid}>
          {dias.map((dia) => {
            const isToday = dia === diaHoje;
            return (
              <View key={dia} style={[styles.calendarDay, isToday && styles.currentDay]}>
                <Text style={styles.calendarDayText}>{dia}</Text>
              </View>
            );
          })}
        </View>
      </View>
    );
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'Semana':
        return renderSemana();
      case 'Dia':
        return renderDia();
      case 'Mês':
        return renderMes();
      default:
        return null;
    }
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
          {['Semana', 'Dia', 'Mês'].map((tab) => (
            <TouchableOpacity key={tab} onPress={() => setActiveTab(tab as any)}>
              <Text style={[styles.tabItem, activeTab === tab && styles.tabActive]}>{tab}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {renderTabContent()}
      </ScrollView>
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
  sectionSubtitle: {
    fontSize: 16,
    marginBottom: 10,
    color: '#3339',
  },

  // Semana
  weekRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
    gap: 8,
  },
  weekDay: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 12,
    borderRadius: 12,
    backgroundColor: '#E8EEF1',
  },
  weekDayToday: {
    backgroundColor: '#2A6B7C',
  },
  weekDaySelected: {
    backgroundColor: '#144A59',
  },
  weekDayText: {
    color: '#2A6B7C',
    fontWeight: '600',
    fontSize: 14,
  },
  weekDayTextActive: {
    color: '#FFFFFF',
  },
  weekDayDate: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2A6B7C',
  },

  // Dia
  timeSlot: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  timeSlotHour: {
    width: 60,
    fontSize: 14,
    color: '#444',
  },
  timeSlotLine: {
    height: 1,
    backgroundColor: '#CCC',
    flex: 1,
  },

  // Mês
  calendarGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  calendarDay: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#E8EEF1',
    justifyContent: 'center',
    alignItems: 'center',
  },
  currentDay: {
    backgroundColor: '#2A6B7C',
  },
  calendarDayText: {
    color: '#2A6B7C',
    fontWeight: '600',
  },
});

export default AgendaScreen;
