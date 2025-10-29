import { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

export const Trabalho = () => {
  // Estado das tarefas (com inicialização a partir do localStorage)
  const [tarefas, setTarefas] = useState<string[]>(() => {
    try {
      const salvo = localStorage.getItem("tarefas");
      return salvo ? JSON.parse(salvo) : [];
    } catch {
      return [];
    }
  });

  // Estado do texto digitado no input
  const [texto, setTexto] = useState("");
  // Ref para focar o input após adicionar
  const inputRef = useRef<HTMLInputElement>(null);

  // Estado para edição
  const [editandoIndex, setEditandoIndex] = useState<number | null>(null);

  // Salva no localStorage sempre que a lista mudar
  useEffect(() => {
    //onde fica salvo o dados do localstorage?
    // no próprio navegador, inspecionar, application, local storage
    //como ver os dados salvos?
    //use o localStorage.getItem("tarefas") no console do navegador
    localStorage.setItem("tarefas", JSON.stringify(tarefas));
  }, [tarefas]);

  // Adicionar tarefa
  const adicionar = useCallback(() => {
    const t = texto.trim();
    if (!t) return;

    if (tarefas.includes(t) && editandoIndex === null) {
      console.log("Tarefa já existe!");
      return;
    }

    if (editandoIndex !== null) {
      // Se está editando, atualiza a tarefa
      setTarefas((prev) =>
        prev.map((item, idx) => (idx === editandoIndex ? t : item))
      );
      setEditandoIndex(null);
    } else {
      // Caso contrário, adiciona uma nova
      setTarefas((prev) => [...prev, t]);
    }

    setTexto("");
    inputRef.current?.focus();
  }, [texto, editandoIndex, tarefas]);

  // Remover tarefa
  const remover = useCallback((index: number) => {
    setTarefas((prev) => prev.filter((_, i) => i !== index));
  }, []);

  // Editar tarefa
  const editar = useCallback((index: number) => {
    setTexto(tarefas[index]);
    setEditandoIndex(index);
    inputRef.current?.focus();
  }, [tarefas]);

  // Permite adicionar com Enter
  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") adicionar();
  };

  return (
    // Estrutura principal
    <main style={{ maxWidth: 720, margin: "2rem auto", padding: "0 1rem" }}>
      <h1>Home</h1>
      <p>Navegue para a página <code>Sobre</code></p>
      <nav style={{ display: "flex", gap: 12, marginBottom: 24 }}>
        <Link to="/sobre/10">/sobre/10</Link>
        <Link to="/sobre/15">/sobre/15</Link>
        <Link to="/sobre/42">/sobre/42</Link>
      </nav>

      <section>
        <h2>Lista de Tarefas</h2>

        {/* Input e botão */}
        <div style={{ display: "flex", gap: 8, margin: "12px 0" }}>
          <input
            ref={inputRef}
            type="text"
            placeholder="Digite uma tarefa..."
            value={texto}
            onChange={(e) => setTexto(e.target.value)}
            onKeyDown={onKeyDown}
            style={{ flex: 1, padding: "8px 12px" }}
          />
          <button onClick={adicionar}>
            {editandoIndex !== null ? "Salvar" : "Adicionar"}
          </button>
        </div>

        {/* Lista */}
        <ul style={{ paddingLeft: 18, lineHeight: 1.8 }}>
          {tarefas.length === 0 && <li>Nenhuma tarefa adicionada</li>}
          {tarefas.map((t, idx) => (
            <li key={`${t}-${idx}`}>
              {t}{" "}
              <button
                className="btn btn-warning"
                onClick={() => editar(idx)}
                style={{ marginLeft: 8, color: "black" }}
              >
                Editar
              </button>
              <button
                className="btn btn-danger"
                onClick={() => remover(idx)}
                style={{ marginLeft: 8, color: "white" }}
              >
                Remover
              </button>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
};
