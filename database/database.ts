import { SQLiteDatabase } from 'expo-sqlite';

// Roda UMA vez, quando o banco e aberto (chamada pelo onInit do SQLiteProvider, em App.tsx).
// Cria a tabela "ocorrencias" se ela ainda nao existir. Mesmo padrao da Aula 08.
export async function inicializarBanco(db: SQLiteDatabase) {
  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS ocorrencias (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      titulo TEXT NOT NULL,
      descricao TEXT NOT NULL,
      fotoUri TEXT,
      latitude REAL,
      longitude REAL,
      criadoEm TEXT NOT NULL
    );
  `);
}
