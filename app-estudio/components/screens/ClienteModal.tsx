import React, { useState } from 'react';
import { Modal, View, Text, TextInput, TouchableOpacity } from 'react-native';

type Cliente = {
  id: string;
  nome: string;
  numero: string;
  observacao: string;
};

type Props = {
  visible: boolean;
  onClose: () => void;
  onSave: (cliente: Cliente) => void;
  styles: any;
  cliente?: Cliente | null;
};

const ClienteModal: React.FC<Props> = ({ visible, onClose, onSave, styles, cliente }) => {
  const [nome, setNome] = useState(cliente?.nome || '');
  const [numero, setNumero] = useState(cliente?.numero || '');
  const [observacao, setObservacao] = useState(cliente?.observacao || '');

  React.useEffect(() => {
    setNome(cliente?.nome || '');
    setNumero(cliente?.numero || '');
    setObservacao(cliente?.observacao || '');
  }, [cliente, visible]);

  const handleSave = () => {
    if (!nome.trim() || !numero.trim()) return;
    onSave({
      id: cliente?.id || Date.now().toString(),
      nome,
      numero,
      observacao,
    });
    setNome('');
    setNumero('');
    setObservacao('');
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Adicionar Cliente</Text>
          <TextInput
            placeholder="Nome"
            placeholderTextColor="#888"
            style={styles.input}
            value={nome}
            onChangeText={setNome}
          />
          <TextInput
            placeholder="Número"
            placeholderTextColor="#888"
            style={styles.input}
            value={numero}
            onChangeText={setNumero}
            keyboardType="phone-pad"
          />
          <TextInput
            placeholder="Observação"
            placeholderTextColor="#888"
            style={styles.input}
            value={observacao}
            onChangeText={setObservacao}
          />
          <View style={styles.modalButtons}>
            <TouchableOpacity onPress={onClose} style={styles.cancelButton}>
              <Text style={styles.buttonText}>Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleSave} style={styles.saveButton}>
              <Text style={styles.buttonText}>Salvar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ClienteModal;