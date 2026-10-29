import { nomePorId, tiposImovel } from "../../dados/tabelasAuxiliares";
import { formatadorDeMoeda } from "../../utils/formatadores";
import { ehAluguel, ehPublicado } from "../../utils/imovel";
import EtiquetaStatus from "./EtiquetaStatus";

/*
  No computador é uma linha de tabela comum.
  No celular (até 720px) cada linha vira um "cartão" em grade:
    foto | nome e local
    foto | código   status
    foto | preço    ações
*/
const ESTILO_LINHA =
  "max-[720px]:grid max-[720px]:grid-cols-[76px_1fr_auto] max-[720px]:items-center max-[720px]:gap-x-3 max-[720px]:gap-y-1.5 max-[720px]:border-t max-[720px]:border-admin-borda max-[720px]:p-3.5 max-[720px]:first:border-t-0";

const ESTILO_CELULA =
  "border-t border-admin-borda px-4 py-3 align-middle text-[13px] max-[720px]:border-none max-[720px]:p-0";

const ESTILO_FOTO = "h-10 w-[60px] rounded max-[720px]:h-[76px] max-[720px]:w-[76px]";

const ESTILO_ACAO =
  "ml-1.5 inline-flex h-7 w-7 cursor-pointer items-center justify-center rounded-full border-none bg-white p-0 text-admin-icone-acao transition-transform hover:scale-[1.08] max-[720px]:h-8 max-[720px]:w-8";

// Uma linha da tabela de imóveis. Recebe o objeto do imóvel (hoje dos dados
// de exemplo, depois do Firestore) e avisa a página quando editar/excluir é clicado.
export default function LinhaImovel({ imovel, onEditar, onExcluir }) {
  // Rascunhos podem não ter preço nem tipo ainda
  const preco = imovel.preco == null ? "—" : formatadorDeMoeda.format(imovel.preco);
  const local = `${imovel.endereco.bairro}, ${imovel.endereco.cidade}`;
  const tipo = nomePorId(tiposImovel, imovel.id_tipo_imovel);
  const capa = imovel.fotos[0];

  return (
    <tr className={ESTILO_LINHA}>
      <td className={`${ESTILO_CELULA} max-[720px]:row-span-3 max-[720px]:self-start`}>
        {capa ? (
          <img src={capa.url} alt="" className={`${ESTILO_FOTO} block object-cover`} />
        ) : (
          <div className={`${ESTILO_FOTO} flex items-center justify-center bg-admin-sem-foto text-[10px] text-admin-texto-suave`}>
            Foto
          </div>
        )}
      </td>

      <td className={`${ESTILO_CELULA} max-[720px]:col-span-2`}>
        <strong className="mb-1 block text-sm font-semibold">{imovel.nome}</strong>
        <span className="text-xs text-admin-texto-suave">{tipo ? `${tipo} · ${local}` : local}</span>
      </td>

      <td className={`${ESTILO_CELULA} whitespace-nowrap max-[720px]:col-start-2 max-[720px]:row-start-2 max-[720px]:text-xs max-[720px]:text-admin-texto-suave`}>
        {imovel.id}
      </td>

      <td className={`${ESTILO_CELULA} whitespace-nowrap font-semibold text-admin-destaque max-[720px]:col-start-2 max-[720px]:row-start-3`}>
        {preco}
        {imovel.preco != null && ehAluguel(imovel.id_tipo_negociacao) && "/mês"}
      </td>

      <td className={`${ESTILO_CELULA} max-[720px]:col-start-3 max-[720px]:row-start-2 max-[720px]:text-right`}>
        <EtiquetaStatus publicado={ehPublicado(imovel.id_status)} />
      </td>

      <td className={`${ESTILO_CELULA} whitespace-nowrap text-right max-[720px]:col-start-3 max-[720px]:row-start-3`}>
        <button type="button" className={ESTILO_ACAO} onClick={() => onEditar(imovel)} aria-label={`Editar ${imovel.nome}`}>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
            <path d="M18.5 2.5a2.1 2.1 0 0 1 3 3L12 15l-4 1 1-4z" />
          </svg>
        </button>

        <button type="button" className={ESTILO_ACAO} onClick={() => onExcluir(imovel)} aria-label={`Excluir ${imovel.nome}`}>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <polyline points="3 6 5 6 21 6" />
            <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
            <path d="M10 11v6M14 11v6" />
            <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
          </svg>
        </button>
      </td>
    </tr>
  );
}
