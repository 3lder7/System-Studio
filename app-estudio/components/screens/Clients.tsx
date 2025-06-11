import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  TextInput,
  FlatList,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

type Cliente = {
  id: string;
  nome: string;
  numero: string;
  observacao: string;
};

const ClientesScreen = () => {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [nome, setNome] = useState('');
  const [numero, setNumero] = useState('');
  const [observacao, setObservacao] = useState('');

  const adicionarCliente = () => {
    if (!nome.trim() || !numero.trim()) {
      Alert.alert('Erro', 'Nome e número são obrigatórios.');
      return;
    }

    const novoCliente = {
      id: Date.now().toString(),
      nome,
      numero,
      observacao,
    };

    setClientes((prev) => [...prev, novoCliente]);
    setNome('');
    setNumero('');
    setObservacao('');
    setModalVisible(false);
  };

  const removerCliente = (id: string) => {
    Alert.alert(
      'Remover Cliente',
      'Tem certeza que deseja remover este cliente?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Remover',
          style: 'destructive',
          onPress: () =>
            setClientes((prev) => prev.filter((cliente) => cliente.id !== id)),
        },
      ]
    );
  };

  const renderItem = ({ item }) => (
    <View style={styles.clienteCard}>
      <View style={styles.clienteHeader}>
        <Text style={styles.clienteNome}>{item.nome}</Text>
        <TouchableOpacity onPress={() => removerCliente(item.id)}>
          <Ionicons name="trash" size={20} color="#FF5C5C" />
        </TouchableOpacity>
      </View>
      <Text style={styles.clienteInfo}>📞 {item.numero}</Text>
      <Text style={styles.clienteInfo}>📝 {item.observacao}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={clientes}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        ListEmptyComponent={
          <Text style={styles.emptyText}>Nenhum cliente adicionado ainda.</Text>
        }
        contentContainerStyle={{ padding: 20 }}
      />

      {/* Botão flutuante */}
      <TouchableOpacity style={styles.floatingButton} onPress={() => setModalVisible(true)}>
        <Ionicons name="add" size={25} color="#FFF" />
      </TouchableOpacity>

      {/* Modal para adicionar cliente */}
      <Modal visible={modalVisible} animationType="slide" transparent>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Adicionar Cliente</Text>
            <TextInput
              placeholder="Nome"
              style={styles.input}
              value={nome}
              onChangeText={setNome}
            />
            <TextInput
              placeholder="Número"
              style={styles.input}
              value={numero}
              onChangeText={setNumero}
              keyboardType="phone-pad"
            />
            <TextInput
              placeholder="Observação"
              style={styles.input}
              value={observacao}
              onChangeText={setObservacao}
            />
            <View style={styles.modalButtons}>
              <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.cancelButton}>
                <Text style={styles.buttonText}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={adicionarCliente} style={styles.saveButton}>
                <Text style={styles.buttonText}>Salvar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default ClientesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 40,
    color: '#999',
    fontSize: 16,
  },
  clienteCard: {
    backgroundColor: '#FFFFFF',
    padding: 15,
    marginBottom: 12,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  clienteHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  clienteNome: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2A6B7C',
  },
  clienteInfo: {
    marginTop: 4,
    color: '#555',
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
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 20,
  },
  modalContent: {
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
    color: '#2A6B7C',
  },
  input: {
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 8,
    padding: 10,
    marginBottom: 12,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 10,
  },
  cancelButton: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    backgroundColor: '#CCC',
    borderRadius: 8,
  },
  saveButton: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    backgroundColor: '#2A6B7C',
    borderRadius: 8,
  },
  buttonText: {
    color: '#FFF',
    fontWeight: '300',
  },
});
