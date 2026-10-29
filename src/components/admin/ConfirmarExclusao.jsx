import Botao from "../comuns/Botao";
import Modal from "../comuns/Modal";
import IconeAviso from "./IconeAviso";

// Janela que pede confirmação antes de excluir um imóvel.
export default function ConfirmarExclusao({ imovel, onCancelar, onConfirmar }) {
  return (
    <Modal
      titulo="Excluir imóvel"
      icone={<IconeAviso />}
      onFechar={onCancelar}
      acoes={
        <>
          {/* autoFocus: o foco começa no botão seguro, para um Enter sem querer não excluir */}
          <Botao variante="neutra" onClick={onCancelar} autoFocus>
            Cancelar
          </Botao>
          <Botao onClick={() => onConfirmar(imovel)}>Excluir Imóvel</Botao>
        </>
      }
    >
      <p className="text-admin-texto">
        Tem certeza que deseja excluir permanentemente o imóvel{" "}
        <strong className="font-semibold text-admin-destaque">
          "{imovel.nome}" ({imovel.id})
        </strong>
        ?
      </p>
      <p className="mt-3 text-xs font-semibold text-admin-icone-acao">
        Esta ação não poderá ser desfeita. O anúncio sairá do catálogo imediatamente.
      </p>
    </Modal>
  );
}
