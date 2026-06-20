import { createNativeStackNavigator } from '@react-navigation/native-stack';

import CadastroScreen from '../screens/CadastroScreen';
import DetalheScreen from '../screens/DetalheScreen';
import ListaScreen from '../screens/ListaScreen';
import { RootStackParamList } from '../types/navigation';

// Navegacao em PILHA (Stack) - padrao da Aula 07.
// Cada <Stack.Screen> e uma tela registrada; ao navegar, o app "empilha" telas
// e o botao de voltar desempilha. initialRouteName define a tela inicial.
const Stack = createNativeStackNavigator<RootStackParamList>();

export default function StackRoutes() {
  return (
    <Stack.Navigator
      initialRouteName="Lista"
      screenOptions={{
        headerStyle: { backgroundColor: '#1f7a3d' },
        headerTintColor: '#fff',
        headerTitleStyle: { fontWeight: 'bold' },
      }}
    >
      <Stack.Screen name="Lista" component={ListaScreen} options={{ title: 'Ocorrências de Campo' }} />
      <Stack.Screen name="Cadastro" component={CadastroScreen} options={{ title: 'Nova Ocorrência' }} />
      <Stack.Screen name="Detalhe" component={DetalheScreen} options={{ title: 'Detalhe da Ocorrência' }} />
    </Stack.Navigator>
  );
}
