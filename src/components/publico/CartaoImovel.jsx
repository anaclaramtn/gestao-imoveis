import { Link } from "react-router-dom";

import { tiposImovel, tiposNegociacao, nomePorId } from "../../dados/tabelasAuxiliares";
import { formatadorDeMoeda } from "../../utils/formatadores";
import { ehAluguel } from "../../utils/imovel";

// Cartão de um imóvel publicado; leva para a página de detalhes.
export default function CartaoImovel({ imovel }) {
  const capa = imovel.fotos?.[0]?.url;
  const { endereco = {} } = imovel;

  const caracteristicas = [
    imovel.numero_quartos != null && `${imovel.numero_quartos} quartos`,
    imovel.numero_banheiros != null && `${imovel.numero_banheiros} banh.`,
    imovel.numero_vagas != null && `${imovel.numero_vagas} vagas`,
    imovel.area_construida != null && `${imovel.area_construida} m²`,
  ].filter(Boolean);

  return (
    <Link
      to={`/imoveis/${imovel.id}`}
      className="group block overflow-hidden rounded-[0.45rem] border border-[var(--color-borda)] bg-[var(--color-cartao)] transition-[transform,border-color,box-shadow] duration-[180ms] hover:-translate-y-[3px] hover:border-[var(--color-rosa)] hover:shadow-[0_10px_28px_rgba(0,0,0,0.24)] motion-reduce:transition-none motion-reduce:hover:translate-y-0"
    >
      <div className="relative aspect-[4/3] bg-[var(--color-superficie-elevada)]">
        {capa ? (
          <img src={capa} alt={imovel.nome} loading="lazy" className="h-full w-full object-cover" />
        ) : (
          <div className="flex h-full items-center justify-center text-xs text-[var(--color-texto-mudo)]">Sem foto</div>
        )}
        <span className="absolute top-3 left-3 rounded-full bg-[var(--color-primaria)] px-3 py-1 text-xs font-bold tracking-[0.04em] text-white uppercase">
          {nomePorId(tiposNegociacao, imovel.id_tipo_negociacao)}
        </span>
      </div>

      <div className="p-5">
        <p className="m-0 text-xs font-bold tracking-[0.06em] text-[var(--color-dourado)] uppercase">
          {nomePorId(tiposImovel, imovel.id_tipo_imovel)}
        </p>
        <h3 className="m-0 mt-1 font-serif text-2xl leading-tight font-medium text-[var(--color-texto)]">{imovel.nome}</h3>
        <p className="m-0 mt-1 text-sm text-[var(--color-texto-mudo)]">
          {[endereco.bairro, endereco.cidade].filter(Boolean).join(" · ")}
        </p>

        {caracteristicas.length > 0 && (
          <p className="m-0 mt-3 text-sm text-[var(--color-texto-suave)]">{caracteristicas.join("  ·  ")}</p>
        )}

        {imovel.preco != null && (
          <p className="m-0 mt-3 font-serif text-2xl font-medium text-[var(--color-texto)]">
            {formatadorDeMoeda.format(imovel.preco)}
            {ehAluguel(imovel.id_tipo_negociacao) && <span className="text-sm font-normal text-[var(--color-texto-mudo)]"> /mês</span>}
          </p>
        )}
      </div>
    </Link>
  );
}
