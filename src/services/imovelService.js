import {
  collection,
  getDocs,
  query,
  where
} from "firebase/firestore";

import { db } from "../firebase/config";

export async function listarImoveis() {
  const consulta = query(
    collection(db, "imoveis"),
    where("publicado", "==", true)
  );

  const resultado = await getDocs(consulta);

  return resultado.docs.map((documento) => ({
    id: documento.id,
    ...documento.data()
  }));
}