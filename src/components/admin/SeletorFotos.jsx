import { useRef } from "react";

/*
  Área de fotos do imóvel: adicionar várias de uma vez, remover e escolher a capa.
  A primeira foto da lista é sempre a capa.
    value:    array de fotos [{ id, url }]
    onChange: recebe o novo array

  Por enquanto as fotos ficam só no navegador (URL temporária).
  Depois, ao salvar, elas serão enviadas para o Cloud Storage.
*/
export default function SeletorFotos({ value, onChange, erro }) {
  const entrada = useRef(null);

  function adicionar(evento) {
    const novas = [...evento.target.files].map((arquivo) => ({
      id: crypto.randomUUID(),
      url: URL.createObjectURL(arquivo),
      arquivo,
    }));
    onChange([...value, ...novas]);
    evento.target.value = ""; // permite escolher o mesmo arquivo de novo
  }

  function remover(foto) {
    if (foto.arquivo) URL.revokeObjectURL(foto.url);
    onChange(value.filter((atual) => atual.id !== foto.id));
  }

  function tornarCapa(foto) {
    onChange([foto, ...value.filter((atual) => atual.id !== foto.id)]);
  }

  return (
    <div>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(150px,1fr))] gap-3 max-[480px]:grid-cols-2">
        <button
          type="button"
          className={`flex aspect-[4/3] cursor-pointer flex-col items-center justify-center gap-1 rounded-admin border border-dashed text-xs font-semibold text-admin-destaque transition-colors hover:bg-white/5 ${
            erro && value.length === 0 ? "border-admin-erro" : "border-admin-destaque/60"
          }`}
          onClick={() => entrada.current.click()}
        >
          <span className="text-2xl leading-none font-light">+</span>
          Adicionar fotos
        </button>

        <input ref={entrada} type="file" accept="image/*" multiple hidden onChange={adicionar} />

        {value.map((foto, indice) => (
          <div key={foto.id} className="group relative aspect-[4/3] overflow-hidden rounded-admin bg-admin-sem-foto">
            <img src={foto.url} alt={`Foto ${indice + 1} do imóvel`} className="h-full w-full object-cover" />

            {indice === 0 ? (
              <span className="absolute top-2 left-2 rounded-full bg-admin-primaria px-2 py-0.5 text-[10px] font-bold uppercase text-white">
                ★ Capa
              </span>
            ) : (
              <button
                type="button"
                className="absolute bottom-2 left-2 cursor-pointer rounded-full bg-black/70 px-2 py-0.5 text-[10px] font-semibold text-white opacity-0 transition-opacity group-hover:opacity-100 focus-visible:opacity-100 max-[720px]:opacity-100"
                onClick={() => tornarCapa(foto)}
              >
                Tornar capa
              </button>
            )}

            <button
              type="button"
              className="absolute top-2 right-2 flex h-6 w-6 cursor-pointer items-center justify-center rounded-full bg-black/70 text-sm text-white transition-colors hover:bg-admin-primaria"
              onClick={() => remover(foto)}
              aria-label={`Remover foto ${indice + 1}`}
            >
              ×
            </button>
          </div>
        ))}
      </div>

      <p className="mt-3 text-xs text-admin-texto-suave">
        A primeira foto é a capa do anúncio. Passe o mouse sobre outra foto para torná-la capa.
      </p>
    </div>
  );
}
