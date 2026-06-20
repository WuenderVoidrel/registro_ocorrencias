import { StyleSheet, Text, TouchableOpacity } from 'react-native';

// Componente reutilizavel de botao (COMPONENTIZACAO - requisito do trabalho).
// Em vez de repetir TouchableOpacity + estilo em toda tela, chamamos <Botao />.
// A prop "variante" troca a cor conforme a acao (primaria, secundaria, perigo).
type Props = {
  titulo: string;
  onPress: () => void;
  variante?: 'primario' | 'secundario' | 'perigo';
};

export default function Botao({ titulo, onPress, variante = 'primario' }: Props) {
  return (
    <TouchableOpacity style={[styles.botao, styles[variante]]} onPress={onPress} activeOpacity={0.8}>
      <Text style={styles.texto}>{titulo}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  botao: { paddingVertical: 13, paddingHorizontal: 16, borderRadius: 10, alignItems: 'center', marginVertical: 6 },
  primario: { backgroundColor: '#1f7a3d' },
  secundario: { backgroundColor: '#3b5bdb' },
  perigo: { backgroundColor: '#c92a2a' },
  texto: { color: '#fff', fontWeight: 'bold', fontSize: 15 },
});
