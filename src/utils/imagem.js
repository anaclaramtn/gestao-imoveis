/*
  Compressão de fotos no navegador. Como as fotos ficam dentro do Firestore
  (limite de 1 MB por documento), cada uma é redimensionada e salva como JPEG em texto (data URL).
*/
const LIMITE_DOCUMENTO = 900_000; // caracteres; margem de segurança abaixo de 1 MB

async function desenhar(origem, maiorLado, qualidade) {
  const imagem = await createImageBitmap(origem);
  const escala = Math.min(1, maiorLado / Math.max(imagem.width, imagem.height));
  const canvas = document.createElement("canvas");
  canvas.width = Math.round(imagem.width * escala);
  canvas.height = Math.round(imagem.height * escala);
  canvas.getContext("2d").drawImage(imagem, 0, 0, canvas.width, canvas.height);
  imagem.close();
  return canvas.toDataURL("image/jpeg", qualidade);
}

// `origem` é um File ou Blob. Reduz a qualidade até caber no limite do Firestore.
export async function comprimirFoto(origem) {
  let lado = 1280;
  let qualidade = 0.75;
  let resultado = await desenhar(origem, lado, qualidade);

  while (resultado.length > LIMITE_DOCUMENTO && lado > 480) {
    lado = Math.round(lado * 0.8);
    qualidade = Math.max(0.5, qualidade - 0.05);
    resultado = await desenhar(origem, lado, qualidade);
  }
  return resultado;
}

// Miniatura pequena usada na lista do painel
export function criarMiniatura(origem) {
  return desenhar(origem, 320, 0.7);
}
