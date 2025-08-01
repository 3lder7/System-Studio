import React, { useState, useEffect } from 'react';
import styles from '../../styles/Clients.styles';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Alert,
  SafeAreaView,
  TextInput,
  KeyboardAvoidingView,
  Platform,
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

type ClienteItemProps = {
  item: Cliente;
  onEdit: (cliente: Cliente) => void;
  onRemove: (id: string) => void;
};

const ClienteItem = React.memo(({ item, onEdit, onRemove }: ClienteItemProps) => (
  <View style={styles.clienteCard}>
    <View style={styles.clienteHeader}>
      <Text style={styles.clienteNome}>{item.nome}</Text>
      <View style={{ flexDirection: 'row', gap: 10 }}>
        <TouchableOpacity onPress={() => onEdit(item)}>
          <Ionicons name="create" size={20} color="#2A6B7C" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => onRemove(item.id)}>
          <Ionicons name="trash" size={20} color="#FF5C5C" />
        </TouchableOpacity>
      </View>
    </View>
    <Text style={styles.clienteInfo}>📞 {item.numero}</Text>
    <Text style={styles.clienteInfo}>📝 {item.observacao}</Text>
  </View>
));

const ClientesScreen = () => {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [clienteEditando, setClienteEditando] = useState<Cliente | null>(null);
  const [busca, setBusca] = useState('');
  const clientesFiltrados = clientes.filter(c =>
    c.nome.toLowerCase().includes(busca.toLowerCase()) ||
    c.numero.includes(busca)
  );

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

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{ flex: 1 }}>
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color="#2A6B7C" style={styles.searchIcon} />
          <TextInput
            style={[styles.input, { marginBottom: 10, paddingLeft: 40 }]} // Adiciona padding para a lupa
            placeholder="Buscar cliente..."
            value={busca}
            onChangeText={setBusca}
          />
        </View>
        <FlatList
          data={clientesFiltrados}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <ClienteItem item={item} onEdit={editarCliente} onRemove={removerCliente} />
          )}
          ListEmptyComponent={
            <Text style={styles.emptyText}>Nenhum cliente encontrado.</Text>
          }
          contentContainerStyle={{ padding: 20, flexGrow: 1 }}
        />
        <TouchableOpacity style={styles.floatingButton} onPress={() => setModalVisible(true)}>
          <Ionicons name="add" size={25} color="#FFF" />
        </TouchableOpacity>
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
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ClientesScreen;
