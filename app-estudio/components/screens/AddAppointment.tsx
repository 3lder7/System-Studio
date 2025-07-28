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
  Modal,
  FlatList,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { salvarItem, carregarItem } from '../storage';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import ClienteModal from '../screens/ClienteModal'; // Corrija o import

type RootStackParamList = {
  Home: undefined;
  AddAppointment: undefined; 
};

type Props = NativeStackScreenProps<RootStackParamList, 'AddAppointment'>;

type Cliente = {
  id: string;
  nome: string;
  numero: string;
  observacao: string;
};

const AddCompromissos: React.FC<Props> = ({ route, navigation }) => {
  const [dataConsulta, setDataConsulta] = useState(new Date());
  const [horario, setHorario] = useState(new Date());
  const [isDatePickerVisible, setDatePickerVisible] = useState(false);
  const [isTimePickerVisible, setTimePickerVisible] = useState(false);

  const [cliente, setCliente] = useState('');
  const [servico, setServico] = useState('');
  const [valor, setValor] = useState('');
  const [status, setStatus] = useState('Pendente');

  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [clienteSelecionado, setClienteSelecionado] = useState<Cliente | null>(null);
  const [clienteModalVisible, setClienteModalVisible] = useState(false);
  const [novoClienteModalVisible, setNovoClienteModalVisible] = useState(false);

  // Carregar clientes ao abrir tela
  React.useEffect(() => {
    carregarItem<Cliente[]>('clientes').then((dados) => {
      if (dados) setClientes(dados);
    });
  }, []);

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

  const handleAdd = async () => {
    if (!clienteSelecionado || !servico || !valor) {
      Alert.alert('Erro', 'Por favor, selecione um cliente e preencha todos os campos.');
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
      cliente: clienteSelecionado.nome,
      servico,
      valor,
      status,
    };

    // Carrega compromissos existentes
    const compromissos = (await carregarItem<any[]>('compromissos')) || [];
    // Adiciona o novo
    const novosCompromissos = [...compromissos, newAppointment];
    // Salva no AsyncStorage
    await salvarItem('compromissos', novosCompromissos);

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

        {/* Seleção de Cliente */}
        <TouchableOpacity
          style={styles.input}
          onPress={() => setClienteModalVisible(true)}
        >
          <Text style={styles.inputText}>
            {clienteSelecionado ? clienteSelecionado.nome : 'Selecione um cliente'}
          </Text>
        </TouchableOpacity>

        {/* Modal de seleção de cliente */}
        <Modal visible={clienteModalVisible} animationType="slide" transparent>
          <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.3)', justifyContent: 'center', padding: 20 }}>
            <View style={{ backgroundColor: '#FFF', borderRadius: 10, padding: 20, maxHeight: 400 }}>
              <Text style={{ fontWeight: 'bold', fontSize: 18, marginBottom: 10 }}>Selecione um cliente</Text>
              <FlatList
                data={clientes}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={{ padding: 12, borderBottomWidth: 1, borderBottomColor: '#eee' }}
                    onPress={() => {
                      setClienteSelecionado(item);
                      setClienteModalVisible(false);
                    }}
                  >
                    <Text style={{ fontSize: 16 }}>{item.nome}</Text>
                    <Text style={{ color: '#888', fontSize: 13 }}>{item.numero}</Text>
                  </TouchableOpacity>
                )}
                ListEmptyComponent={<Text style={{ color: '#999', textAlign: 'center', margin: 20 }}>Nenhum cliente cadastrado.</Text>}
              />
              <TouchableOpacity
                style={{ marginTop: 15, alignSelf: 'flex-end' }}
                onPress={() => {
                  setClienteModalVisible(false);
                  setNovoClienteModalVisible(true);
                }}
              >
                <Text style={{ color: '#2A6B7C', fontWeight: 'bold' }}>+ Adicionar novo cliente</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{ marginTop: 10, alignSelf: 'flex-end' }}
                onPress={() => setClienteModalVisible(false)}
              >
                <Text style={{ color: '#888' }}>Cancelar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        {/* Modal para adicionar novo cliente */}
        <ClienteModal
          visible={novoClienteModalVisible}
          onClose={() => setNovoClienteModalVisible(false)}
          onSave={async (novoCliente) => {
            const novosClientes = [...clientes, novoCliente];
            setClientes(novosClientes);
            await salvarItem('clientes', novosClientes);
            setClienteSelecionado(novoCliente);
            setNovoClienteModalVisible(false);
          }}
          styles={styles}
        />

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
