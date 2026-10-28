import { useEffect, useState } from "react";
import "./Home.css";
import { listarImoveis } from "../../services/imovelService";
import { formatadorDeMoeda } from "../../utils/formatadores";
import { Link } from "react-router-dom";
import Header from "../../components/publico/Header";

export default function Home() {
  return (
    <header className="bg-[#080707] text-white">
      <Header />
    </header>
      
      
      )
}
