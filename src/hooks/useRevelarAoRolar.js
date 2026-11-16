import { useEffect, useRef, useState } from "react";

// Devolve [ref, visivel]. `visivel` vira true na primeira vez que o elemento aparece na tela.
// `ativo` permite esperar o conteúdo existir (ex.: dados carregando) antes de observar.
export function useRevelarAoRolar(ativo = true) {
  const ref = useRef(null);
  // Navegadores sem IntersectionObserver mostram tudo de uma vez
  const [visivel, setVisivel] = useState(() => typeof IntersectionObserver === "undefined");

  useEffect(() => {
    const elemento = ref.current;
    if (!ativo || !elemento || visivel) return;

    const observador = new IntersectionObserver(
      ([entrada]) => {
        if (entrada.isIntersecting) {
          setVisivel(true);
          observador.disconnect();
        }
      },
      { threshold: 0.15 },
    );
    observador.observe(elemento);
    return () => observador.disconnect();
  }, [ativo, visivel]);

  return [ref, visivel];
}
