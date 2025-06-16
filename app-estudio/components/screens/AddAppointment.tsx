import React, { useState } from 'react';
import styles from '../../styles/AddAppointment.styles';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  SafeAreaView,
  StatusBar,
  Platform,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

type RootStackParamList = {
  Home: undefined;
  AddAppointment: { addAppointment: (newAppointment: any) => void };
};

type Props = NativeStackScreenProps<RootStackParamList, 'AddAppointment'>;

const AddCompromissos: React.FC<Props> = ({ route, navigation }) => {
  const addAppointment = route.params?.addAppointment || (() => {});

  const [dataConsulta, setDataConsulta] = useState(new Date());
  const [horario, setHorario] = useState(new Date());
  const [isDatePickerVisible, setDatePickerVisible] = useState(false);
  const [isTimePickerVisible, setTimePickerVisible] = useState(false);

  const [cliente, setCliente] = useState('');
  const [servico, setServico] = useState('');
  const [valor, setValor] = useState('');
  const [status, setStatus] = useState('Pendente');

  const showDatePicker = () => setDatePickerVisible(true);
  const showTimePicker = () => setTimePickerVisible(true);

  const handleDateChange = (event: any, selectedDate?: Date) => {
    const currentDate = selectedDate || dataConsulta;
    if (event.type === 'set' || Platform.OS === 'ios') {
      setDataConsulta(currentDate);
    }
    setDatePickerVisible(false);
  };

  const handleTimeChange = (event: any, selectedTime?: Date) => {
    const currentTime = selectedTime || horario;
    if (event.type === 'set' || Platform.OS === 'ios') {
      setHorario(currentTime);
    }
    setTimePickerVisible(false);
  };

  const handleAdd = () => {
    if (!cliente || !servico || !valor) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
      return;
    }

    const formattedDate = dataConsulta.toLocaleDateString('pt-BR');
    const formattedTime = horario.toLocaleTimeString('pt-BR', {
      hour: '2-digit',
      minute: '2-digit',
    });

    const newAppointment = {
      id: Date.now(),
      data: formattedDate,
      horario: formattedTime,
      cliente,
      servico,
      valor,
      status,
    };

    addAppointment(newAppointment);
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={Platform.OS === 'android' ? '#F8F9FA' : undefined}
      />
      <View style={styles.container}>
        <Text style={styles.title}>Adicionar Compromisso</Text>

        <TouchableOpacity style={styles.input} onPress={showDatePicker}>
          <Text style={styles.inputText}>
            {dataConsulta.toLocaleDateString('pt-BR')}
          </Text>
        </TouchableOpacity>

        {isDatePickerVisible && (
          <DateTimePicker
            value={dataConsulta}
            mode="date"
            display="default"
            onChange={handleDateChange}
            minimumDate={new Date()}
          />
        )}

        <TouchableOpacity style={styles.input} onPress={showTimePicker}>
          <Text style={styles.inputText}>
            {horario.toLocaleTimeString('pt-BR', {
              hour: '2-digit',
              minute: '2-digit',
            })}
          </Text>
        </TouchableOpacity>

        {isTimePickerVisible && (
          <DateTimePicker
            value={horario}
            mode="time"
            display="default"
            onChange={handleTimeChange}
          />
        )}

        <TextInput
          style={styles.input}
          placeholder="Nome do Cliente"
          placeholderTextColor="#999"
          value={cliente}
          onChangeText={setCliente}
        />

        <TextInput
          style={styles.input}
          placeholder="Serviço"
          placeholderTextColor="#999"
          value={servico}
          onChangeText={setServico}
        />

        <TextInput
          style={styles.input}
          placeholder="Valor do Serviço (R$)"
          placeholderTextColor="#999"
          keyboardType="numeric"
          value={valor}
          onChangeText={setValor}
        />

        <TouchableOpacity style={styles.button} onPress={handleAdd}>
          <Text style={styles.buttonText}>Adicionar</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default AddCompromissos;
