import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import AvisoCamposFaltando from "../../components/admin/AvisoCamposFaltando";
import CampoComodidades from "../../components/admin/CampoComodidades";
import EstadoVazio from "../../components/admin/EstadoVazio";
import SecaoFormulario from "../../components/admin/SecaoFormulario";
import SeletorFotos from "../../components/admin/SeletorFotos";
import Botao from "../../components/comuns/Botao";
import CampoTexto from "../../components/comuns/CampoTexto";
import Seletor from "../../components/comuns/Seletor";
import SeletorSegmentado from "../../components/comuns/SeletorSegmentado";
import * as imoveisLocal from "../../services/imoveisLocal";
import {
  OPCOES_ESTADO,
  OPCOES_NEGOCIACAO,
  OPCOES_STATUS,
  OPCOES_TIPO,
  camposFaltando,
  ehAluguel,
  ehPublicado,
  formularioParaImovel,
  formularioVazio,
  imovelParaFormulario,
} from "../../utils/imovel";

// Deixa só os números, com um limite de dígitos
function soDigitos(texto, maximo) {
  return texto.replace(/\D/g, "").slice(0, maximo);
}

// 60170001 → 60170-001
function formatarCep(texto) {
  const digitos = soDigitos(texto, 8);
  return digitos.length > 5 ? `${digitos.slice(0, 5)}-${digitos.slice(5)}` : digitos;
}

// 2850000 → 2.850.000
function formatarMilhar(digitos) {
  return digitos ? Number(digitos).toLocaleString("pt-BR") : "";
}

/*
  Uma só tela para cadastrar (/admin/imoveis/novo) e editar (/admin/imoveis/:id/editar).
  Regras para salvar:
    - Rascunho: precisa de nome e endereço.
    - Publicado: precisa de todos os campos (só o complemento é opcional).
*/
export default function FormularioImovel() {
  const navigate = useNavigate();
  const { id } = useParams();
  const imovelExistente = id ? imoveisLocal.buscarPorId(id) : null;

  const [formulario, setFormulario] = useState(() =>
    imovelExistente ? imovelParaFormulario(imovelExistente) : formularioVazio(),
  );
  const [camposComErro, setCamposComErro] = useState([]);
  const [camposDoAviso, setCamposDoAviso] = useState(null);

  if (id && !imovelExistente) {
    return (
      <EstadoVazio titulo="Imóvel não encontrado" descricao={`Não existe nenhum imóvel com o código ${id}.`}>
        <Botao onClick={() => navigate("/admin/painel")}>Voltar para a lista</Botao>
      </EstadoVazio>
    );
  }

  function alterar(campo, valor) {
    setFormulario((atual) => ({ ...atual, [campo]: valor }));

    // Trocar entre Publicado/Rascunho muda o que é obrigatório: limpa as marcações de erro
    setCamposComErro((atuais) => (campo === "id_status" ? [] : atuais.filter((c) => c !== campo)));
  }

  // Propriedades comuns de um campo de texto ligado ao formulário
  function ligarCampo(campo, { obrigatorio = true, formatar } = {}) {
    return {
      value: formulario[campo],
      onChange: (evento) => alterar(campo, formatar ? formatar(evento.target.value) : evento.target.value),
      obrigatorio,
      erro: camposComErro.includes(campo),
    };
  }

  // Campo numérico pequeno (quartos, área...): só dígitos, até 5
  function ligarNumero(campo) {
    return { ...ligarCampo(campo, { formatar: (texto) => soDigitos(texto, 5) }), inputMode: "numeric" };
  }

  function salvar(evento) {
    evento.preventDefault();

    const faltando = camposFaltando(formulario);
    if (faltando.length > 0) {
      setCamposComErro(faltando);
      setCamposDoAviso(faltando);
      return;
    }

    // Por enquanto salva no "banco" em memória. Depois, aqui entra o Firestore.
    const salvo = imoveisLocal.salvar(formularioParaImovel(formulario, id));

    // Deu certo: volta para a lista, que mostra a mensagem de sucesso
    const mensagem = id
      ? `Alterações em "${salvo.nome}" (${salvo.id}) salvas com sucesso!`
      : `Imóvel "${salvo.nome}" cadastrado com sucesso com o código ${salvo.id}!`;

    window.scrollTo(0, 0);
    navigate("/admin/painel", { state: { mensagemSucesso: mensagem } });
  }

  return (
    <form onSubmit={salvar} noValidate>
      <div className="mb-7">
        <div className="flex flex-wrap items-center gap-3">
          <h1 className="font-titulo text-[clamp(1.75rem,4vw,2.25rem)] leading-[1.1] font-medium">
            {id ? "Editar imóvel" : "Cadastrar imóvel"}
          </h1>
          {id && (
            <span className="rounded-full border border-admin-borda px-2.5 py-0.5 text-xs font-semibold text-admin-destaque">
              {id}
            </span>
          )}
        </div>
        <p className="mt-1.5 text-[13px] text-admin-texto-suave">
          {id
            ? "Atualize as informações do imóvel."
            : "Preencha as informações do imóvel. O código (KR-…) é gerado automaticamente ao salvar."}
        </p>
      </div>

      <div className="flex flex-col gap-6">
        <SecaoFormulario titulo="Fotos do imóvel">
          <SeletorFotos
            value={formulario.fotos}
            onChange={(fotos) => alterar("fotos", fotos)}
            erro={camposComErro.includes("fotos")}
          />
        </SecaoFormulario>

        <SecaoFormulario titulo="Informações básicas">
          <div className="grid grid-cols-[minmax(0,1fr)_240px] gap-4 max-[720px]:grid-cols-1">
            <CampoTexto rotulo="Nome do imóvel" placeholder="Ex.: Casa Horizonte" {...ligarCampo("nome")} />
            <Seletor
              rotulo="Tipo de imóvel"
              obrigatorio
              opcoes={OPCOES_TIPO}
              value={formulario.id_tipo_imovel}
              onChange={(idTipo) => alterar("id_tipo_imovel", idTipo)}
              erro={camposComErro.includes("id_tipo_imovel")}
              className="w-full"
            />
          </div>

          <div className="mt-4 grid grid-cols-2 gap-4 max-[720px]:grid-cols-1">
            <SeletorSegmentado
              rotulo="Tipo de negociação"
              obrigatorio
              opcoes={OPCOES_NEGOCIACAO}
              value={formulario.id_tipo_negociacao}
              onChange={(idNegociacao) => alterar("id_tipo_negociacao", idNegociacao)}
              colunasCelular={2}
            />
            <CampoTexto
              rotulo={ehAluguel(formulario.id_tipo_negociacao) ? "Valor do aluguel (por mês)" : "Preço"}
              icone={<span className="text-sm">R$</span>}
              inputMode="numeric"
              placeholder="0"
              {...ligarCampo("preco", { formatar: (texto) => soDigitos(texto, 12) })}
              value={formatarMilhar(formulario.preco)}
            />
          </div>

          <CampoTexto
            className="mt-4"
            rotulo="Sobre o imóvel"
            multilinha
            placeholder="Descreva os ambientes, acabamentos, diferenciais e a vizinhança..."
            {...ligarCampo("sobre_imovel")}
          />
        </SecaoFormulario>

        <SecaoFormulario titulo="Localização">
          <div className="grid grid-cols-[160px_minmax(0,1fr)_120px] gap-4 max-[720px]:grid-cols-2">
            <CampoTexto rotulo="CEP" inputMode="numeric" placeholder="00000-000" {...ligarCampo("cep", { formatar: formatarCep })} />
            <CampoTexto
              className="max-[720px]:order-first max-[720px]:col-span-2"
              rotulo="Rua"
              placeholder="Ex.: Av. das Nações"
              {...ligarCampo("rua")}
            />
            <CampoTexto rotulo="Número" placeholder="Ex.: 1000" {...ligarCampo("numero")} />
          </div>

          <div className="mt-4 grid grid-cols-2 gap-4 max-[720px]:grid-cols-1">
            <CampoTexto rotulo="Complemento" placeholder="Ex.: Apto 402, Bloco B (opcional)" {...ligarCampo("complemento", { obrigatorio: false })} />
            <CampoTexto rotulo="Bairro" placeholder="Ex.: Alphaville" {...ligarCampo("bairro")} />
          </div>

          <div className="mt-4 grid grid-cols-[minmax(0,1fr)_240px] gap-4 max-[720px]:grid-cols-1">
            <CampoTexto rotulo="Cidade" placeholder="Ex.: Fortaleza" {...ligarCampo("cidade")} />
            <Seletor
              rotulo="Estado"
              obrigatorio
              opcoes={OPCOES_ESTADO}
              value={formulario.estado}
              onChange={(estado) => alterar("estado", estado)}
              erro={camposComErro.includes("estado")}
              className="w-full"
            />
          </div>
        </SecaoFormulario>

        <SecaoFormulario titulo="Detalhes & comodidades">
          <div className="grid grid-cols-6 gap-4 max-[960px]:grid-cols-3 max-[480px]:grid-cols-2">
            <CampoTexto rotulo="Área constr. (m²)" placeholder="0" {...ligarNumero("area_construida")} />
            <CampoTexto rotulo="Terreno (m²)" placeholder="0" {...ligarNumero("terreno")} />
            <CampoTexto rotulo="Quartos" placeholder="0" {...ligarNumero("numero_quartos")} />
            <CampoTexto rotulo="Suítes" placeholder="0" {...ligarNumero("numero_suites")} />
            <CampoTexto rotulo="Banheiros" placeholder="0" {...ligarNumero("numero_banheiros")} />
            <CampoTexto rotulo="Vagas" placeholder="0" {...ligarNumero("numero_vagas")} />
          </div>

          <div className="mt-6">
            <CampoComodidades
              value={formulario.comodidades}
              onChange={(comodidades) => alterar("comodidades", comodidades)}
              obrigatorio
              erro={camposComErro.includes("comodidades")}
            />
          </div>
        </SecaoFormulario>

        <SecaoFormulario titulo="Status do anúncio">
          <SeletorSegmentado
            className="max-w-[320px] max-[480px]:max-w-none"
            opcoes={OPCOES_STATUS}
            value={formulario.id_status}
            onChange={(idStatus) => alterar("id_status", idStatus)}
          />
          <p className="mt-3 text-xs text-admin-texto-suave">
            {ehPublicado(formulario.id_status)
              ? "Aparece no catálogo público. Para publicar, todos os campos precisam estar preenchidos."
              : "Fica salvo apenas no painel. Para salvar como rascunho, basta o nome e o endereço."}
          </p>
        </SecaoFormulario>
      </div>

      <div className="mt-8 flex items-center justify-between gap-4 border-t border-admin-borda pt-6 max-[720px]:flex-col max-[720px]:items-stretch">
        <p className="text-xs text-admin-texto-suave">* Campos obrigatórios para publicar.</p>

        <div className="flex gap-3 max-[720px]:grid max-[720px]:grid-cols-2">
          <Botao variante="neutra" onClick={() => navigate("/admin/painel")}>
            Cancelar
          </Botao>
          <Botao type="submit">Salvar imóvel</Botao>
        </div>
      </div>

      {camposDoAviso && (
        <AvisoCamposFaltando
          paraPublicar={ehPublicado(formulario.id_status)}
          campos={camposDoAviso}
          onFechar={() => setCamposDoAviso(null)}
        />
      )}
    </form>
  );
}
