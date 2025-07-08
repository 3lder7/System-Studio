import AsyncStorage from '@react-native-async-storage/async-storage';

// Salva um valor (objeto, array, string, etc) em uma chave
export async function salvarItem<T>(chave: string, valor: T): Promise<void> {
  try {
    await AsyncStorage.setItem(chave, JSON.stringify(valor));
  } catch (e) {
    console.error('Erro ao salvar no AsyncStorage:', e);
  }
}

// Carrega um valor salvo em uma chave
export async function carregarItem<T>(chave: string): Promise<T | null> {
  try {
    const json = await AsyncStorage.getItem(chave);
    return json ? JSON.parse(json) : null;
  } catch (e) {
    console.error('Erro ao carregar do AsyncStorage:', e);
    return null;
  }
}