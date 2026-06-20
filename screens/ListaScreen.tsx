import { useFocusEffect } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useSQLiteContext } from 'expo-sqlite';
import { useCallback, useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';

import Botao from '../components/Botao';
import OcorrenciaCard from '../components/OcorrenciaCard';
import { listarOcorrencias } from '../repositories/ocorrenciaRepository';
import { RootStackParamList } from '../types/navigation';
import { Ocorrencia } from '../types/ocorrencia';

type Props = NativeStackScreenProps<RootStackParamList, 'Lista'>;

export default function ListaScreen({ navigation }: Props) {
  const db = useSQLiteContext(); // pega o banco disponibilizado pelo SQLiteProvider
  const [ocorrencias, setOcorrencias] = useState<Ocorrencia[]>([]);

  // useFocusEffect: recarrega a lista toda vez que esta tela volta a aparecer
  // (ex: depois de cadastrar/editar/excluir e voltar pra ca).
  useFocusEffect(
    useCallback(() => {
      carregar();
    }, []),
  );

  async function carregar() {
    const dados = await listarOcorrencias(db);
    setOcorrencias(dados);
  }

  return (
    <View style={styles.container}>
      <Botao titulo="+ Nova ocorrência" onPress={() => navigation.navigate('Cadastro')} />

      {ocorrencias.length === 0 ? (
        <Text style={styles.vazio}>
          Nenhuma ocorrência registrada ainda.{'\n'}Toque em "Nova ocorrência" para começar.
        </Text>
      ) : (
        <FlatList
          data={ocorrencias}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => (
            <OcorrenciaCard ocorrencia={item} onPress={() => navigation.navigate('Detalhe', { id: item.id })} />
          )}
          contentContainerStyle={{ paddingBottom: 24 }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#f1f3f5' },
  vazio: { textAlign: 'center', color: '#868e96', marginTop: 40, lineHeight: 22 },
});
