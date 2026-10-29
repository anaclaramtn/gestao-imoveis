import {
  ID_STATUS,
  ID_TIPO_NEGOCIACAO,
  status,
  tiposImovel,
  tiposNegociacao,
} from "../dados/tabelasAuxiliares";

/*
  Regras e opções do cadastro de imóveis.

  Formato de um imóvel (o mesmo planejado para o banco):
  {
    id: "KR-001",                    // gerado automaticamente ao salvar
    nome,
    id_tipo_imovel,                  // → tabela tipo_imovel (Casa, Apartamento...)
    id_tipo_negociacao,              // → tabela tipo_negociacao (À venda, Aluguel...)
    id_status,                       // → tabela status (Publicado, Rascunho)
    preco,                           // em reais (número inteiro)
    endereco: { cep, rua, numero, complemento, bairro, cidade, estado },
    numero_quartos, numero_suites, numero_banheiros, numero_vagas,
    area_construida, terreno,        // em m²
    comodidades: ["Piscina", ...],
    sobre_imovel,
    fotos: [{ id, url }],            // a primeira é a capa
  }
*/

// Converte uma tabela auxiliar ({ id, nome }) para as opções dos dropdowns ({ valor, texto })
const paraOpcoes = (tabela) => tabela.map(({ id, nome }) => ({ valor: id, texto: nome }));

export const OPCOES_TIPO = paraOpcoes(tiposImovel);
export const OPCOES_NEGOCIACAO = paraOpcoes(tiposNegociacao);
export const OPCOES_STATUS = paraOpcoes(status);

export const OPCOES_ESTADO = [
  ["AC", "Acre"], ["AL", "Alagoas"], ["AP", "Amapá"], ["AM", "Amazonas"], ["BA", "Bahia"],
  ["CE", "Ceará"], ["DF", "Distrito Federal"], ["ES", "Espírito Santo"], ["GO", "Goiás"],
  ["MA", "Maranhão"], ["MT", "Mato Grosso"], ["MS", "Mato Grosso do Sul"], ["MG", "Minas Gerais"],
  ["PA", "Pará"], ["PB", "Paraíba"], ["PR", "Paraná"], ["PE", "Pernambuco"], ["PI", "Piauí"],
  ["RJ", "Rio de Janeiro"], ["RN", "Rio Grande do Norte"], ["RS", "Rio Grande do Sul"],
  ["RO", "Rondônia"], ["RR", "Roraima"], ["SC", "Santa Catarina"], ["SP", "São Paulo"],
  ["SE", "Sergipe"], ["TO", "Tocantins"],
].map(([sigla, nome]) => ({ valor: sigla, texto: nome }));

// Aluguel e Alugada mostram o preço "por mês"
export function ehAluguel(idTipoNegociacao) {
  return idTipoNegociacao === ID_TIPO_NEGOCIACAO.aluguel || idTipoNegociacao === ID_TIPO_NEGOCIACAO.alugada;
}

export function ehPublicado(idStatus) {
  return idStatus === ID_STATUS.publicado;
}

// Nome amigável de cada campo, usado na janela de "campos faltando"
export const NOMES_DOS_CAMPOS = {
  nome: "Nome do imóvel",
  id_tipo_imovel: "Tipo de imóvel",
  id_tipo_negociacao: "Tipo de negociação",
  preco: "Preço",
  sobre_imovel: "Sobre o imóvel",
  cep: "CEP",
  rua: "Rua",
  numero: "Número",
  bairro: "Bairro",
  cidade: "Cidade",
  estado: "Estado",
  area_construida: "Área construída",
  terreno: "Terreno",
  numero_quartos: "Quartos",
  numero_suites: "Suítes",
  numero_banheiros: "Banheiros",
  numero_vagas: "Vagas de garagem",
  comodidades: "Comodidades (pelo menos uma)",
};

const CAMPOS_DO_ENDERECO = ["cep", "rua", "numero", "bairro", "cidade", "estado"];

// Rascunho: basta nome e endereço (o complemento é sempre opcional)
const OBRIGATORIOS_RASCUNHO = ["nome", ...CAMPOS_DO_ENDERECO];

// Publicado: todos os campos acima (fotos e complemento são opcionais)
const OBRIGATORIOS_PUBLICAR = Object.keys(NOMES_DOS_CAMPOS);

// Devolve a lista de campos que faltam para salvar o formulário no status escolhido.
export function camposFaltando(formulario) {
  const obrigatorios = ehPublicado(formulario.id_status) ? OBRIGATORIOS_PUBLICAR : OBRIGATORIOS_RASCUNHO;

  return obrigatorios.filter((campo) => {
    const valor = formulario[campo];
    if (Array.isArray(valor)) return valor.length === 0;
    return String(valor ?? "").trim() === "";
  });
}

/*
  O formulário trabalha com todos os campos "achatados" e como texto
  (é assim que os inputs funcionam). Estas duas funções convertem
  entre o formato do formulário e o formato do imóvel.
*/
const CAMPOS_NUMERICOS = [
  "preco", "area_construida", "terreno",
  "numero_quartos", "numero_suites", "numero_banheiros", "numero_vagas",
];

export function formularioVazio() {
  return {
    nome: "",
    id_tipo_imovel: "", // "" = nenhum escolhido ainda
    id_tipo_negociacao: ID_TIPO_NEGOCIACAO.aVenda,
    id_status: ID_STATUS.rascunho,
    preco: "", sobre_imovel: "",
    cep: "", rua: "", numero: "", complemento: "", bairro: "", cidade: "", estado: "",
    area_construida: "", terreno: "",
    numero_quartos: "", numero_suites: "", numero_banheiros: "", numero_vagas: "",
    comodidades: [], fotos: [],
  };
}

export function imovelParaFormulario(imovel) {
  const formulario = { ...formularioVazio(), ...imovel, ...imovel.endereco };
  delete formulario.endereco;
  delete formulario.id;
  formulario.id_tipo_imovel = imovel.id_tipo_imovel ?? "";

  for (const campo of CAMPOS_NUMERICOS) {
    formulario[campo] = imovel[campo] == null ? "" : String(imovel[campo]);
  }
  return formulario;
}

export function formularioParaImovel(formulario, id) {
  const { cep, rua, numero, complemento, bairro, cidade, estado, ...resto } = formulario;
  const imovel = { ...resto, id, endereco: { cep, rua, numero, complemento, bairro, cidade, estado } };

  // Tipo ainda não escolhido (só possível em rascunho) vira null
  if (formulario.id_tipo_imovel === "") imovel.id_tipo_imovel = null;

  // Campo numérico vazio vira null (rascunhos podem ter campos em branco)
  for (const campo of CAMPOS_NUMERICOS) {
    imovel[campo] = formulario[campo] === "" ? null : Number(formulario[campo]);
  }
  return imovel;
}
