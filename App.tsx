import { NavigationContainer } from '@react-navigation/native';
import { SQLiteProvider } from 'expo-sqlite';
import { StatusBar } from 'expo-status-bar';

import { inicializarBanco } from './database/database';
import StackRoutes from './routes/stack.routes';

// Ponto de entrada do app. Duas "cascas" envolvem tudo:
// 1) SQLiteProvider  -> abre o banco "ocorrencias.db" e roda inicializarBanco (cria a tabela).
//                       Qualquer tela usa useSQLiteContext() pra acessar esse banco.
// 2) NavigationContainer -> habilita a navegacao entre telas (Aula 07).
export default function App() {
  return (
    <SQLiteProvider databaseName="ocorrencias.db" onInit={inicializarBanco}>
      <NavigationContainer>
        <StatusBar style="light" />
        <StackRoutes />
      </NavigationContainer>
    </SQLiteProvider>
  );
}
