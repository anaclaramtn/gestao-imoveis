import { NOMES_DOS_CAMPOS } from "../../utils/imovel";
import Botao from "../comuns/Botao";
import Modal from "../comuns/Modal";
import IconeAviso from "./IconeAviso";

// Janela exibida ao tentar salvar com campos obrigatórios em branco.
//   paraPublicar: true quando o imóvel está marcado como "Publicado"
//   campos: lista dos campos que faltam (chaves de NOMES_DOS_CAMPOS)
export default function AvisoCamposFaltando({ paraPublicar, campos, onFechar }) {
  return (
    <Modal
      titulo="Preencha todos os campos"
      icone={<IconeAviso />}
      onFechar={onFechar}
      acoes={
        <Botao onClick={onFechar} autoFocus>
          Entendi.
        </Botao>
      }
    >
      <p className="text-admin-texto">
        {paraPublicar
          ? "Para publicar o imóvel, todos os campos precisam estar preenchidos. Ainda falta:"
          : "Para salvar como rascunho, preencha pelo menos o nome e o endereço. Ainda falta:"}
      </p>

      <ul className="mt-3 max-h-48 list-disc overflow-auto pl-5 text-[13px] font-semibold text-admin-destaque">
        {campos.map((campo) => (
          <li key={campo}>{NOMES_DOS_CAMPOS[campo]}</li>
        ))}
      </ul>

      {paraPublicar && (
        <p className="mt-3 text-xs text-admin-texto-suave">
          Se preferir, salve como rascunho e complete depois.
        </p>
      )}
    </Modal>
  );
}
