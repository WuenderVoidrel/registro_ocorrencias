import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useSQLiteContext } from 'expo-sqlite';
import { useEffect, useState } from 'react';
import { Alert, Image, Linking, ScrollView, StyleSheet, Text } from 'react-native';

import Botao from '../components/Botao';
import { buscarOcorrencia, excluirOcorrencia } from '../repositories/ocorrenciaRepository';
import { RootStackParamList } from '../types/navigation';
import { Ocorrencia } from '../types/ocorrencia';

type Props = NativeStackScreenProps<RootStackParamList, 'Detalhe'>;

export default function DetalheScreen({ route, navigation }: Props) {
  const db = useSQLiteContext();
  const { id } = route.params; // id recebido da tela de lista
  const [ocorrencia, setOcorrencia] = useState<Ocorrencia | null>(null);

  // Carrega a ocorrencia ao abrir a tela.
  useEffect(() => {
    buscarOcorrencia(db, id).then(setOcorrencia);
  }, []);

  // Abre as coordenadas no app de mapas do celular (sem depender de chave de API).
  function abrirNoMapa() {
    if (ocorrencia?.latitude == null || ocorrencia.longitude == null) return;
    const url = `https://www.google.com/maps/search/?api=1&query=${ocorrencia.latitude},${ocorrencia.longitude}`;
    Linking.openURL(url);
  }

  function confirmarExclusao() {
    Alert.alert('Excluir', 'Deseja remover esta ocorrência?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Excluir',
        style: 'destructive',
        onPress: async () => {
          await excluirOcorrencia(db, id);
          navigation.goBack();
        },
      },
    ]);
  }

  if (!ocorrencia) {
    return <Text style={styles.carregando}>Carregando...</Text>;
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.titulo}>{ocorrencia.titulo}</Text>
      <Text style={styles.descricao}>{ocorrencia.descricao}</Text>

      {ocorrencia.fotoUri && <Image source={{ uri: ocorrencia.fotoUri }} style={styles.foto} />}

      {ocorrencia.latitude != null && ocorrencia.longitude != null && (
        <>
          <Text style={styles.coord}>📍 {ocorrencia.latitude.toFixed(5)}, {ocorrencia.longitude.toFixed(5)}</Text>
          <Botao titulo="Ver no mapa" variante="secundario" onPress={abrirNoMapa} />
        </>
      )}

      <Text style={styles.data}>Registrado em {new Date(ocorrencia.criadoEm).toLocaleString('pt-BR')}</Text>

      <Botao titulo="Editar" variante="secundario" onPress={() => navigation.navigate('Cadastro', { id: ocorrencia.id })} />
      <Botao titulo="Excluir" variante="perigo" onPress={confirmarExclusao} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, backgroundColor: '#f1f3f5' },
  carregando: { padding: 24, textAlign: 'center', color: '#868e96' },
  titulo: { fontSize: 22, fontWeight: 'bold', color: '#212529' },
  descricao: { fontSize: 15, color: '#495057', marginTop: 6 },
  foto: { width: '100%', height: 240, borderRadius: 10, marginVertical: 12 },
  coord: { color: '#1f7a3d', fontWeight: 'bold', marginTop: 6 },
  data: { color: '#868e96', fontSize: 12, marginTop: 12, marginBottom: 8 },
});
