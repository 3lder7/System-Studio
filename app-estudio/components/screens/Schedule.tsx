import React, { useState } from 'react';
import styles from '../../styles/Schedule.styles';
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

  // Novo estado para mês e ano
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());

  const diaHoje = today.getDate();
  const mesAtual = new Date(currentYear, currentMonth).toLocaleString('default', { month: 'long' });
  const anoAtual = currentYear;
  const diasDaSemana = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];

  // Funções para alterar mês
  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
    // Atualiza o dia selecionado para o primeiro dia do novo mês
    setSelectedDate(new Date(currentYear, currentMonth === 0 ? 11 : currentMonth - 1, 1));
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
    // Atualiza o dia selecionado para o primeiro dia do novo mês
    setSelectedDate(new Date(currentYear, currentMonth === 11 ? 0 : currentMonth + 1, 1));
  };

  const renderSemana = () => {
    const diasNoMes = new Date(currentYear, currentMonth + 1, 0).getDate();
    const dias = Array.from({ length: diasNoMes }, (_, i) => i + 1);

    return (
      <View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.weekRow}
        >
          {dias.map((dia) => {
            const date = new Date(currentYear, currentMonth, dia);
            const isToday = date.toDateString() === today.toDateString();
            const isSelected = date.toDateString() === selectedDate.toDateString();

            return (
              <TouchableOpacity
                key={dia}
                onPress={() => setSelectedDate(date)}
                style={[
                  styles.weekDay,
                  isToday && styles.weekDayToday,
                  isSelected && styles.weekDaySelected,
                ]}
              >
                <Text style={[
                  styles.weekDayText,
                  (isToday || isSelected) && styles.weekDayTextActive
                ]}>
                  {diasDaSemana[date.getDay()]}
                </Text>
                <Text style={[
                  styles.weekDayDate,
                  (isToday || isSelected) && styles.weekDayTextActive
                ]}>
                  {dia}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
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
    const diasNoMes = new Date(currentYear, currentMonth + 1, 0).getDate();
    const dias = Array.from({ length: diasNoMes }, (_, i) => i + 1);

    return (
      <View>
        <Text style={styles.sectionSubtitle}>
          {mesAtual.charAt(0).toUpperCase() + mesAtual.slice(1)} de {anoAtual}
        </Text>
        <View style={styles.calendarGrid}>
          {dias.map((dia) => {
            const date = new Date(currentYear, currentMonth, dia);
            const isToday = date.toDateString() === today.toDateString();
            const isSelected = date.toDateString() === selectedDate.toDateString();

            return (
              <TouchableOpacity
                key={dia}
                onPress={() => setSelectedDate(date)}
                style={[
                  styles.calendarDay,
                  isToday && styles.currentDay,
                  isSelected && styles.calendarDaySelected,
                ]}
              >
                <Text style={[
                  styles.calendarDayText,
                  isToday && { color: '#fff' },
                  isSelected && styles.calendarDayTextActive,
                ]}>
                  {dia}
                </Text>
              </TouchableOpacity>
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
          <TouchableOpacity onPress={handlePrevMonth}>
            <Ionicons name="chevron-back" size={24} color="#2A6B7C" />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleNextMonth}>
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

export default AgendaScreen;