import { useParams, Link } from "react-router-dom";

export const Sobre = () => {
  //hook de parametros
  const { id } = useParams<{ id: string }>();

  return (
    <main style={{ maxWidth: 720, margin: "2rem auto", padding: "0 1rem" }}>
      <h1>Sobre</h1>

      {id ? (
        <p>
          Sobre selecionado: <b>{id}</b>.
        </p>
      ) : (
        <p>Nenhum item selecionado.</p>
      )}

      <nav style={{ marginTop: 20 }}>
        <Link to="/trabalho" style={{ textDecoration: "none", color: "black" }}>
          ← Voltar para Home
        </Link>
      </nav>
    </main>
  );
};
