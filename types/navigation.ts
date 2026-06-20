// Lista de rotas (telas) do app e os parametros que cada uma recebe.
// Tipar isso deixa o navigation.navigate(...) seguro: o TypeScript avisa
// se voce errar o nome de uma tela ou esquecer um parametro obrigatorio.
export type RootStackParamList = {
  Lista: undefined;
  Cadastro: { id?: number } | undefined; // sem id = cadastrar nova; com id = editar
  Detalhe: { id: number };
};
