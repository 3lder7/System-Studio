import React, { useState, useEffect } from 'react';
import styles from '../../styles/Payments.styles';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { carregarItem } from '../storage';
import { Ionicons } from '@expo/vector-icons';

const PagamentosScreen = () => {
  const [activeTab, setActiveTab] = useState<'diario' | 'semanal' | 'mensal'>('diario');
  const [pagamentos, setPagamentos] = useState<any[]>([]);

  useEffect(() => {
    carregarItem<any[]>('compromissos').then((dados) => {
      if (dados) setPagamentos(dados.filter((c) => c.status === 'Pago'));
    });
  }, []);

  const filtrarPagamentos = () => {
    const hoje = new Date();
    if (activeTab === 'diario') {
      return pagamentos.filter((p) => p.data === hoje.toLocaleDateString('pt-BR'));
    }
    if (activeTab === 'semanal') {
      // Filtrar por semana atual
      // ...implementar lógica...
      return pagamentos; // Exemplo simplificado
    }
    if (activeTab === 'mensal') {
      return pagamentos.filter(
        (p) => p.data.split('/')[1] === String(hoje.getMonth() + 1)
      );
    }
    return pagamentos;
  };

  const pagamentosFiltrados = filtrarPagamentos();
  const total = pagamentosFiltrados.reduce((sum, p) => sum + parseFloat(p.valor), 0);

  return (
    <View style={styles.container}>
      <View style={styles.tabBar}>
        <TouchableOpacity onPress={() => setActiveTab('diario')}>
          <Text style={[styles.tabItem, activeTab === 'diario' && styles.tabActive]}>Diário</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setActiveTab('semanal')}>
          <Text style={[styles.tabItem, activeTab === 'semanal' && styles.tabActive]}>Semanal</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setActiveTab('mensal')}>
          <Text style={[styles.tabItem, activeTab === 'mensal' && styles.tabActive]}>Mensal</Text>
        </TouchableOpacity>
      </View>

      {/* Card resumo */}
      <View style={{ padding: 20, backgroundColor: '#fff', borderRadius: 10, margin: 20, elevation: 2 }}>
        <Text style={{ fontSize: 18, color: '#2A6B7C', fontWeight: 'bold' }}>
          Total recebido: R$ {total.toFixed(2)}
        </Text>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {pagamentosFiltrados.length === 0 ? (
          <View style={{ alignItems: 'center', marginTop: 40 }}>
            <Ionicons name="card" size={48} color="#CCC" />
            <Text style={styles.placeholder}>Nenhum pagamento registrado.</Text>
          </View>
        ) : (
          pagamentosFiltrados.map((p) => (
            <View key={p.id} style={{ backgroundColor: '#fff', borderRadius: 8, padding: 15, marginBottom: 12, elevation: 1 }}>
              <Text style={{ fontWeight: 'bold', color: '#2A6B7C' }}>{p.cliente}</Text>
              <Text style={{ color: '#666' }}>{p.servico}</Text>
              <Text style={{ color: '#2A6B7C', fontWeight: 'bold' }}>Valor: R$ {p.valor}</Text>
              <Text style={{ color: '#999' }}>{p.data} às {p.horario}</Text>
            </View>
          ))
        )}
      </ScrollView>
    </View>
  );
};

export default PagamentosScreen;


