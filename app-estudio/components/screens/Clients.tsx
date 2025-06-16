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
