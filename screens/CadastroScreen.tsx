import { NativeStackScreenProps } from '@react-navigation/native-stack';
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';
import { useSQLiteContext } from 'expo-sqlite';
import { useEffect, useState } from 'react';
import { Alert, Image, ScrollView, StyleSheet, Text, TextInput } from 'react-native';

import Botao from '../components/Botao';
import { atualizarOcorrencia, buscarOcorrencia, inserirOcorrencia } from '../repositories/ocorrenciaRepository';
import { RootStackParamList } from '../types/navigation';

type Props = NativeStackScreenProps<RootStackParamList, 'Cadastro'>;

export default function CadastroScreen({ route, navigation }: Props) {
  const db = useSQLiteContext();
  const editId = route.params?.id ?? null; // se veio um id, estamos EDITANDO

  // useState: estado local de cada campo do formulario.
  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [fotoUri, setFotoUri] = useState<string | null>(null);
  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);

  // useEffect: se for edicao, carrega os dados atuais quando a tela abre.
  useEffect(() => {
    if (editId != null) {
      navigation.setOptions({ title: 'Editar Ocorrência' });
      buscarOcorrencia(db, editId).then((o) => {
        if (!o) return;
        setTitulo(o.titulo);
        setDescricao(o.descricao);
        setFotoUri(o.fotoUri);
        setLatitude(o.latitude);
        setLongitude(o.longitude);
      });
    }
  }, []);

  // HARDWARE 1 - CAMERA. Fluxo da Aula 09: pedir permissao -> checar -> usar.
  async function tirarFoto() {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permissão negada', 'Precisamos acessar a câmera para registrar a foto.');
      return;
    }
    const foto = await ImagePicker.launchCameraAsync({ quality: 0.6, allowsEditing: false });
    if (foto.canceled) return;
    setFotoUri(foto.assets[0].uri);
  }

  // HARDWARE 2 - GPS. Mesmo fluxo de permissao.
  async function capturarLocalizacao() {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permissão negada', 'Precisamos acessar a localização para marcar o local.');
      return;
    }
    const loc = await Location.getCurrentPositionAsync({});
    setLatitude(loc.coords.latitude);
    setLongitude(loc.coords.longitude);
  }

  async function salvar() {
    if (titulo.trim() === '' || descricao.trim() === '') {
      Alert.alert('Atenção', 'Preencha pelo menos o título e a descrição.');
      return;
    }
    const dados = {
      titulo,
      descricao,
      fotoUri,
      latitude,
      longitude,
      criadoEm: new Date().toISOString(),
    };
    if (editId != null) {
      await atualizarOcorrencia(db, editId, dados); // UPDATE
    } else {
      await inserirOcorrencia(db, dados); // CREATE
    }
    navigation.goBack(); // volta pra lista (que recarrega sozinha via useFocusEffect)
  }

  return (
    <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
      <Text style={styles.label}>Título</Text>
      <TextInput
        style={styles.input}
        placeholder="Ex: Colhedora parada na frente 3"
        value={titulo}
        onChangeText={setTitulo}
      />

      <Text style={styles.label}>Descrição</Text>
      <TextInput
        style={[styles.input, styles.area]}
        placeholder="Descreva o que aconteceu"
        value={descricao}
        onChangeText={setDescricao}
        multiline
      />

      <Botao titulo={fotoUri ? '📷 Tirar outra foto' : '📷 Tirar foto'} variante="secundario" onPress={tirarFoto} />
      {fotoUri && <Image source={{ uri: fotoUri }} style={styles.previa} />}

      <Botao
        titulo={latitude != null ? '📍 Atualizar localização' : '📍 Capturar localização'}
        variante="secundario"
        onPress={capturarLocalizacao}
      />
      {latitude != null && longitude != null && (
        <Text style={styles.coord}>Local: {latitude.toFixed(5)}, {longitude.toFixed(5)}</Text>
      )}

      <Botao titulo="Salvar ocorrência" onPress={salvar} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, backgroundColor: '#f1f3f5' },
  label: { fontWeight: 'bold', color: '#343a40', marginTop: 10, marginBottom: 4 },
  input: { backgroundColor: '#fff', borderRadius: 8, borderWidth: 1, borderColor: '#dee2e6', padding: 12, fontSize: 15 },
  area: { height: 100, textAlignVertical: 'top' },
  previa: { width: '100%', height: 200, borderRadius: 10, marginVertical: 8 },
  coord: { color: '#1f7a3d', fontWeight: 'bold', marginVertical: 6 },
});
