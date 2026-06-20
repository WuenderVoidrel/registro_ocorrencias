import { SQLiteDatabase } from 'expo-sqlite';

import { NovaOcorrencia, Ocorrencia } from '../types/ocorrencia';

// Camada de acesso ao banco (padrao "repository" da Aula 08): cada funcao
// recebe o "db" e faz UMA operacao SQL. Separar isso das telas mantem o codigo
// organizado e facil de testar/explicar. Aqui estao as 4 operacoes do CRUD.

// READ (lista) - todas as ocorrencias, da mais nova para a mais antiga.
export async function listarOcorrencias(db: SQLiteDatabase): Promise<Ocorrencia[]> {
  return db.getAllAsync<Ocorrencia>('SELECT * FROM ocorrencias ORDER BY id DESC;');
}

// READ (uma) - usada na tela de detalhe.
export async function buscarOcorrencia(db: SQLiteDatabase, id: number): Promise<Ocorrencia | null> {
  const resultado = await db.getFirstAsync<Ocorrencia>('SELECT * FROM ocorrencias WHERE id = ?;', [id]);
  return resultado ?? null;
}

// CREATE - insere uma nova ocorrencia. Os "?" sao parametros (evitam SQL injection).
export async function inserirOcorrencia(db: SQLiteDatabase, o: NovaOcorrencia): Promise<void> {
  await db.runAsync(
    'INSERT INTO ocorrencias (titulo, descricao, fotoUri, latitude, longitude, criadoEm) VALUES (?, ?, ?, ?, ?, ?);',
    [o.titulo, o.descricao, o.fotoUri, o.latitude, o.longitude, o.criadoEm],
  );
}

// UPDATE - atualiza uma ocorrencia existente (mantem a data de criacao original).
export async function atualizarOcorrencia(db: SQLiteDatabase, id: number, o: NovaOcorrencia): Promise<void> {
  await db.runAsync(
    'UPDATE ocorrencias SET titulo = ?, descricao = ?, fotoUri = ?, latitude = ?, longitude = ? WHERE id = ?;',
    [o.titulo, o.descricao, o.fotoUri, o.latitude, o.longitude, id],
  );
}

// DELETE - remove uma ocorrencia pelo id.
export async function excluirOcorrencia(db: SQLiteDatabase, id: number): Promise<void> {
  await db.runAsync('DELETE FROM ocorrencias WHERE id = ?;', [id]);
}
