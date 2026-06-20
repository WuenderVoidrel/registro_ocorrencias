import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { Ocorrencia } from '../types/ocorrencia';

// Componente reutilizavel que exibe UMA ocorrencia dentro da lista (COMPONENTIZACAO).
// Recebe a ocorrencia e o que fazer ao tocar (onPress) - quem decide e a tela.
type Props = {
  ocorrencia: Ocorrencia;
  onPress: () => void;
};

export default function OcorrenciaCard({ ocorrencia, onPress }: Props) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.8}>
      {ocorrencia.fotoUri ? (
        <Image source={{ uri: ocorrencia.fotoUri }} style={styles.foto} />
      ) : (
        <View style={[styles.foto, styles.semFoto]}>
          <Text style={styles.semFotoTexto}>sem foto</Text>
        </View>
      )}
      <View style={styles.info}>
        <Text style={styles.titulo} numberOfLines={1}>{ocorrencia.titulo}</Text>
        <Text style={styles.descricao} numberOfLines={2}>{ocorrencia.descricao}</Text>
        {ocorrencia.latitude != null && ocorrencia.longitude != null && (
          <Text style={styles.coord}>📍 {ocorrencia.latitude.toFixed(4)}, {ocorrencia.longitude.toFixed(4)}</Text>
        )}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    marginVertical: 5,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 1 },
  },
  foto: { width: 64, height: 64, borderRadius: 8, backgroundColor: '#e9ecef' },
  semFoto: { alignItems: 'center', justifyContent: 'center' },
  semFotoTexto: { color: '#adb5bd', fontSize: 11 },
  info: { flex: 1, marginLeft: 12, justifyContent: 'center' },
  titulo: { fontSize: 16, fontWeight: 'bold', color: '#212529' },
  descricao: { color: '#495057', marginTop: 2 },
  coord: { color: '#1f7a3d', fontSize: 12, marginTop: 4 },
});
