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
import { NativeStackScreenProps } from '@react-navigation/native-stack';

type RootStackParamList = {
  Home: undefined;
  AddAppointment: { addAppointment: (newAppointment: any) => void };
};

type Props = NativeStackScreenProps<RootStackParamList, 'AddAppointment'>;

const AddCompromissos: React.FC<Props> = ({ route, navigation }) => {
  const addAppointment = route.params?.addAppointment || (() => {});
  const [horario, setHorario] = useState('');
  const [cliente, setCliente] = useState('');
  const [servico, setServico] = useState('');
  const [status, setStatus] = useState('pendente');

  const handleAdd = () => {
    console.log("Botão pressionado");
    if (!horario || !cliente || !servico) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
      return;
    }

    const newAppointment = {
      id: Date.now(),
      horario,
      cliente,
      servico,
      status,
    };

    console.log("Novo compromisso:", newAppointment);
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
        <TextInput
          style={styles.input}
          placeholder="Horário (ex: 09:00)"
          value={horario}
          onChangeText={setHorario}
        />
        <TextInput
          style={styles.input}
          placeholder="Nome do Cliente"
          value={cliente}
          onChangeText={setCliente}
        />
        <TextInput
          style={styles.input}
          placeholder="Serviço"
          value={servico}
          onChangeText={setServico}
        />
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
