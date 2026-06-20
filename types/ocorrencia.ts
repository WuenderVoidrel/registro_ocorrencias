// Tipos do dominio "Ocorrencia de Campo".
// Ocorrencia      = registro completo, ja salvo no banco (por isso tem id).
// NovaOcorrencia  = dados que o formulario monta ANTES de salvar
//                   (sem id, pois o id e gerado pelo SQLite via AUTOINCREMENT).
export type Ocorrencia = {
  id: number;
  titulo: string;
  descricao: string;
  fotoUri: string | null;
  latitude: number | null;
  longitude: number | null;
  criadoEm: string;
};

export type NovaOcorrencia = {
  titulo: string;
  descricao: string;
  fotoUri: string | null;
  latitude: number | null;
  longitude: number | null;
  criadoEm: string;
};
