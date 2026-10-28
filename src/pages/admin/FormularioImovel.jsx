import { useNavigate, useParams } from "react-router-dom";

import Botao from "../../components/comuns/Botao";

// Placeholder: a mesma tela serve para cadastrar (/admin/imoveis/novo)
// e editar (/admin/imoveis/:id/editar). O ":id" da URL chega pelo useParams.
export default function FormularioImovel() {
  const navigate = useNavigate();
  const { id } = useParams();
  const editando = Boolean(id);

  return (
    <>
      <h1 style={{ fontFamily: "var(--admin-fonte-titulo)", fontWeight: 500 }}>
        {editando ? `Editar imóvel (id: ${id})` : "Cadastrar imóvel"}
      </h1>
      <p style={{ color: "var(--admin-texto-suave)" }}>Tela provisória.</p>

      <Botao variante="secundaria" onClick={() => navigate("/admin/painel")}>
        Voltar para a lista
      </Botao>
    </>
  );
}
