import { useCallback, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import AvisoSucesso from "../../components/admin/AvisoSucesso";
import ConfirmarExclusao from "../../components/admin/ConfirmarExclusao";
import EstadoVazio from "../../components/admin/EstadoVazio";
import LinhaImovel from "../../components/admin/LinhaImovel";
import Botao from "../../components/comuns/Botao";
import CampoTexto from "../../components/comuns/CampoTexto";
import Paginacao from "../../components/comuns/Paginacao";
import Seletor from "../../components/comuns/Seletor";
import * as imoveisLocal from "../../services/imoveisLocal";
import { normalizarTexto } from "../../utils/formatadores";
import { OPCOES_STATUS } from "../../utils/imovel";

// Cabeçalho da tabela
const ESTILO_TH = "px-4 py-3.5 text-left text-[10px] font-bold uppercase tracking-[0.04em] text-admin-destaque";

// "Todos" + as opções da tabela de status (Publicado, Rascunho)
const OPCOES_FILTRO_STATUS = [{ valor: "todos", texto: "Todos os status" }, ...OPCOES_STATUS];

const iconeLupa = (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="11" cy="11" r="7" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);

export default function ListaImoveis() {
  const navigate = useNavigate();
  const location = useLocation();

  // Mensagem enviada pela tela de cadastro/edição depois de salvar
  const [mensagemSucesso, setMensagemSucesso] = useState(location.state?.mensagemSucesso ?? null);
  const fecharMensagem = useCallback(() => setMensagemSucesso(null), []);

  // Apaga a mensagem do histórico, para ela não reaparecer ao recarregar a página
  useEffect(() => {
    if (location.state?.mensagemSucesso) navigate(location.pathname, { replace: true, state: null });
  }, [location, navigate]);

  // Por enquanto vem do "banco" em memória. Depois, virá do Firestore.
  const [imoveis, setImoveis] = useState(imoveisLocal.listar);

  const [busca, setBusca] = useState("");
  const [status, setStatus] = useState("todos");
  const [pagina, setPagina] = useState(1);
  const [porPagina, setPorPagina] = useState(5);
  const [imovelParaExcluir, setImovelParaExcluir] = useState(null);

  // 1) Filtra pela busca e pelo status
  const termo = normalizarTexto(busca.trim());
  const filtrados = imoveis.filter((imovel) => {
    const combinaBusca =
      normalizarTexto(imovel.nome).includes(termo) ||
      normalizarTexto(imovel.id).includes(termo);

    const combinaStatus = status === "todos" || imovel.id_status === status;

    return combinaBusca && combinaStatus;
  });

  // 2) Recorta só os imóveis da página atual
  const totalPaginas = Math.max(1, Math.ceil(filtrados.length / porPagina));
  const paginaAtual = Math.min(pagina, totalPaginas);
  const inicio = (paginaAtual - 1) * porPagina;
  const visiveis = filtrados.slice(inicio, inicio + porPagina);

  // Ao mudar um filtro, volta para a primeira página
  function mudarBusca(valor) {
    setBusca(valor);
    setPagina(1);
  }

  function mudarStatus(valor) {
    setStatus(valor);
    setPagina(1);
  }

  function mudarPorPagina(valor) {
    setPorPagina(valor);
    setPagina(1);
  }

  const cadastrar = () => navigate("/admin/imoveis/novo");
  const editar = (imovel) => navigate(`/admin/imoveis/${imovel.id}/editar`);

  // Por enquanto exclui do "banco" em memória (volta ao recarregar a página).
  function excluir(imovelExcluido) {
    imoveisLocal.excluir(imovelExcluido.id);
    setImoveis(imoveisLocal.listar());
    setImovelParaExcluir(null);
    setMensagemSucesso(`Imóvel "${imovelExcluido.nome}" (${imovelExcluido.id}) excluído com sucesso.`);
  }

  return (
    <>
      {/* key: reinicia o tempo da faixa quando chega uma mensagem nova */}
      {mensagemSucesso && (
        <AvisoSucesso key={mensagemSucesso} onFechar={fecharMensagem}>
          {mensagemSucesso}
        </AvisoSucesso>
      )}

      <div className="mb-7 flex items-start justify-between gap-4 max-[720px]:flex-col max-[720px]:items-stretch">
        <div>
          <h1 className="mb-1.5 font-titulo text-[clamp(1.75rem,4vw,2.25rem)] leading-[1.1] font-medium">
            Gerenciamento de Imóveis
          </h1>
          <p className="text-[13px] text-admin-texto-suave">
            Cadastre, edite e controle a visibilidade dos imóveis no catálogo público.
          </p>
        </div>

        <Botao onClick={cadastrar}>Cadastrar imóvel</Botao>
      </div>

      <div className="mb-6 flex gap-3 max-[720px]:flex-col">
        <CampoTexto
          className="flex-1"
          type="search"
          placeholder="Buscar por nome ou código..."
          aria-label="Buscar por nome ou código"
          icone={iconeLupa}
          value={busca}
          onChange={(e) => mudarBusca(e.target.value)}
        />

        <Seletor
          className="w-[165px] max-[720px]:w-full"
          aria-label="Filtrar por status"
          opcoes={OPCOES_FILTRO_STATUS}
          value={status}
          onChange={mudarStatus}
        />
      </div>

      {visiveis.length > 0 ? (
        <div className="overflow-hidden rounded-admin-cartao border border-admin-borda bg-admin-superficie">
          {/* No celular a tabela vira lista de cartões (o visual de cada um está em LinhaImovel) */}
          <table className="w-full border-collapse max-[720px]:block">
            <thead className="max-[720px]:hidden">
              <tr>
                <th className={ESTILO_TH}>Foto</th>
                <th className={ESTILO_TH}>Imóvel</th>
                <th className={ESTILO_TH}>Código</th>
                <th className={ESTILO_TH}>Preço</th>
                <th className={ESTILO_TH}>Status</th>
                <th className={`${ESTILO_TH} text-right`}>Ações</th>
              </tr>
            </thead>
            <tbody className="max-[720px]:block">
              {visiveis.map((imovel) => (
                <LinhaImovel
                  key={imovel.id}
                  imovel={imovel}
                  onEditar={editar}
                  onExcluir={setImovelParaExcluir}
                />
              ))}
            </tbody>
          </table>
        </div>
      ) : imoveis.length === 0 ? (
        <EstadoVazio
          titulo="Nenhum imóvel cadastrado"
          descricao="Comece cadastrando seu primeiro imóvel para exibi-lo no catálogo público."
        >
          <Botao onClick={cadastrar}>Cadastrar imóvel</Botao>
        </EstadoVazio>
      ) : (
        <EstadoVazio
          titulo="Nenhum imóvel encontrado"
          descricao="Nenhum imóvel corresponde à busca ou ao filtro selecionado."
        />
      )}

      <div className="mt-6 flex flex-wrap items-center justify-between gap-4 max-[720px]:flex-col-reverse">
        <p className="text-xs text-admin-texto-suave">
          {filtrados.length > 0
            ? `Exibindo ${inicio + 1}-${inicio + visiveis.length} de ${filtrados.length} imóveis`
            : "Nenhum imóvel para exibir"}
        </p>

        <Paginacao
          paginaAtual={paginaAtual}
          totalPaginas={totalPaginas}
          porPagina={porPagina}
          onMudarPagina={setPagina}
          onMudarPorPagina={mudarPorPagina}
        />
      </div>

      {imovelParaExcluir && (
        <ConfirmarExclusao
          imovel={imovelParaExcluir}
          onCancelar={() => setImovelParaExcluir(null)}
          onConfirmar={excluir}
        />
      )}
    </>
  );
}
