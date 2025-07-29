import React, { useState, useEffect } from 'react';
import styles from '../../styles/Clients.styles';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  FlatList,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { salvarItem, carregarItem } from '../storage'; 
import ClienteModal from './ClienteModal';

type Cliente = {
  id: string;
  nome: string;
  numero: string;
  observacao: string;
};

const ClientesScreen = () => {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [clienteEditando, setClienteEditando] = useState<Cliente | null>(null);

  // Carregar clientes ao iniciar
  useEffect(() => {
    carregarItem<Cliente[]>('clientes').then((dados) => {
      if (dados) setClientes(dados);
    });
  }, []);

  // Salvar clientes sempre que mudar
  useEffect(() => {
    salvarItem('clientes', clientes);
  }, [clientes]);

  const editarCliente = (cliente: Cliente) => {
    setClienteEditando(cliente);
    setModalVisible(true);
  };

  const salvarClienteEditado = (cliente: Cliente) => {
    setClientes((prev) =>
      prev.map((c) => (c.id === cliente.id ? cliente : c))
    );
    setClienteEditando(null);
    setModalVisible(false);
  };

  const adicionarCliente = (novoCliente: Cliente) => {
    if (clienteEditando) {
      salvarClienteEditado(novoCliente);
    } else {
      setClientes((prev) => [...prev, novoCliente]);
      setModalVisible(false);
    }
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
        <View style={{ flexDirection: 'row', gap: 10 }}>
          <TouchableOpacity onPress={() => editarCliente(item)}>
            <Ionicons name="create" size={20} color="#2A6B7C" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => removerCliente(item.id)}>
            <Ionicons name="trash" size={20} color="#FF5C5C" />
          </TouchableOpacity>
        </View>
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
      <ClienteModal
        visible={modalVisible}
        onClose={() => {
          setModalVisible(false);
          setClienteEditando(null);
        }}
        onSave={adicionarCliente}
        styles={styles}
        cliente={clienteEditando}
      />
    </View>
  );
};

export default ClientesScreen;