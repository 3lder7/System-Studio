import React, { useState } from 'react';
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
  const [horario, setHorario] = useState(new Date());
  const [isPickerVisible, setPickerVisible] = useState(false);
  const [cliente, setCliente] = useState('');
  const [servico, setServico] = useState('');
  const [status, setStatus] = useState('pendente');

  const handleTimeChange = (event: any, selectedTime?: Date) => {
    setPickerVisible(false);
    if (selectedTime) {
      setHorario(selectedTime);
    }
  };

  const handleAdd = () => {
    if (!cliente || !servico) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
      return;
    }

    const newAppointment = {
      id: Date.now(),
      horario: horario.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
      cliente,
      servico,
      status,
    };

    console.log('Novo compromisso:', newAppointment);
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

        {/* Horário */}
        <TouchableOpacity
          style={styles.input}
          onPress={() => setPickerVisible(true)}
        >
          <Text>
            {horario.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
          </Text>
        </TouchableOpacity>

        {isPickerVisible && (
          <DateTimePicker
            value={horario}
            mode="time"
            display="spinner"
            onChange={handleTimeChange}
            textColor="black" // Para garantir visibilidade no iOS
          />
        )}

        {/* Nome do Cliente */}
        <TextInput
          style={styles.input}
          placeholder="Nome do Cliente"
          placeholderTextColor="#999"
          value={cliente}
          onChangeText={setCliente}
        />

        {/* Serviço a Ser Feito */}
        <TextInput
          style={styles.input}
          placeholder="Serviço"
          placeholderTextColor="#999"
          value={servico}
          onChangeText={setServico}
        />

        {/* Botão Adicionar */}
        <TouchableOpacity style={styles.button} onPress={handleAdd}>
          <Text style={styles.buttonText}>Adicionar</Text>
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
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: '#2A6B7C',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
    backgroundColor: '#FFF',
    justifyContent: 'center',
  },
  button: {
    backgroundColor: '#2A6B7C',
    borderRadius: 8,
    paddingVertical: 15,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default AddCompromissos;