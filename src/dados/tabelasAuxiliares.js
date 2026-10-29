/*
  Cópia de exemplo das tabelas auxiliares do banco.
  A tabela de imóveis guarda só o id de cada uma:
    id_tipo_imovel     → tipo_imovel
    id_tipo_negociacao → tipo_negociacao
    id_status          → status

  Quando o banco estiver ligado, essas listas virão de lá.
  Os ids das constantes ID_* precisam bater com os ids reais do banco.
*/

export const tiposImovel = [
  { id: 1, nome: "Apartamento" },
  { id: 2, nome: "Casa" },
  { id: 3, nome: "Casa de Campo" },
  { id: 4, nome: "Casa de Condomínio" },
  { id: 5, nome: "Casa de Luxo" },
  { id: 6, nome: "Casa de Praia" },
  { id: 7, nome: "Chalé" },
  { id: 8, nome: "Cobertura" },
  { id: 9, nome: "Duplex" },
  { id: 10, nome: "Flat" },
  { id: 11, nome: "Galpão" },
  { id: 12, nome: "Loft" },
  { id: 13, nome: "Mansão" },
  { id: 14, nome: "Pousada" },
  { id: 15, nome: "Sala Comercial" },
  { id: 16, nome: "Studio" },
  { id: 17, nome: "Terreno" },
];

export const ID_TIPO_NEGOCIACAO = { aVenda: 1, aluguel: 2, vendida: 3, alugada: 4 };

export const tiposNegociacao = [
  { id: ID_TIPO_NEGOCIACAO.aVenda, nome: "À venda" },
  { id: ID_TIPO_NEGOCIACAO.aluguel, nome: "Aluguel" },
  { id: ID_TIPO_NEGOCIACAO.vendida, nome: "Vendida" },
  { id: ID_TIPO_NEGOCIACAO.alugada, nome: "Alugada" },
];

export const ID_STATUS = { publicado: 1, rascunho: 2 };

export const status = [
  { id: ID_STATUS.publicado, nome: "Publicado" },
  { id: ID_STATUS.rascunho, nome: "Rascunho" },
];

// Devolve o nome a partir do id (ex.: nomePorId(tiposImovel, 2) → "Casa")
export function nomePorId(tabela, id) {
  return tabela.find((linha) => linha.id === id)?.nome ?? "";
}
