import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

// 1. Interface para o tipo Cliente
interface Cliente {
  id: number;
  nome: string;
  email: string;
  telefone: string;
  status: "ativo" | "inativo";
}

export const Clientes = () => {
  const navigate = useNavigate();
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [loading, setLoading] = useState(true);
  const [filtro, setFiltro] = useState("");

  // 2. Simulando busca de dados (substitua por sua API real)
  useEffect(() => {
    const fetchClientes = async () => {
      try {
        setLoading(true);
        // Simulando delay de API
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Dados mockados - substitua pela sua API
        const dadosMockados: Cliente[] = [
          { id: 1, nome: "João Silva", email: "joao@email.com", telefone: "(11) 9999-9999", status: "ativo" },
          { id: 2, nome: "Maria Santos", email: "maria@email.com", telefone: "(11) 8888-8888", status: "ativo" },
          { id: 3, nome: "Pedro Oliveira", email: "pedro@email.com", telefone: "(11) 7777-7777", status: "inativo" },
          { id: 4, nome: "Ana Costa", email: "ana@email.com", telefone: "(11) 6666-6666", status: "ativo" },
        ];
        
        setClientes(dadosMockados);
      } catch (error) {
        console.error("Erro ao buscar clientes:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchClientes();
  }, []);

  // 3. Filtro de clientes
  const clientesFiltrados = clientes.filter(cliente =>
    cliente.nome.toLowerCase().includes(filtro.toLowerCase()) ||
    cliente.email.toLowerCase().includes(filtro.toLowerCase())
  );

  // 4. Função para navegação
  const handleNavigateToUsers = () => {
    navigate('/usuarios');
  };

  // 5. Função para visualizar detalhes do cliente
  const handleVerDetalhes = (clienteId: number) => {
    navigate(`/clientes/${clienteId}`);
  };

  // 6. Função para alternar status do cliente
  const handleToggleStatus = (clienteId: number) => {
    setClientes(prev => prev.map(cliente =>
      cliente.id === clienteId
        ? { ...cliente, status: cliente.status === "ativo" ? "inativo" : "ativo" }
        : cliente
    ));
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: "50vh" }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Carregando...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container-fluid">
      {/* Header da página */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h1 className="h3 mb-0">Gestão de Clientes</h1>
          <p className="text-muted">Gerencie seus clientes cadastrados</p>
        </div>
        <button
          type="button"
          className="btn btn-primary"
          onClick={handleNavigateToUsers}
        >
          Ver Usuários
        </button>
      </div>

      {/* Estatísticas rápidas */}
      <div className="row mb-4">
        <div className="col-md-3">
          <div className="card bg-primary text-white">
            <div className="card-body">
              <h5 className="card-title">Total</h5>
              <p className="card-text h4">{clientes.length}</p>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card bg-success text-white">
            <div className="card-body">
              <h5 className="card-title">Ativos</h5>
              <p className="card-text h4">
                {clientes.filter(c => c.status === "ativo").length}
              </p>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card bg-warning text-white">
            <div className="card-body">
              <h5 className="card-title">Inativos</h5>
              <p className="card-text h4">
                {clientes.filter(c => c.status === "inativo").length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Barra de ferramentas */}
      <div className="card mb-4">
        <div className="card-body">
          <div className="row">
            <div className="col-md-6">
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Buscar por nome ou email..."
                  value={filtro}
                  onChange={(e) => setFiltro(e.target.value)}
                />
                <button className="btn btn-outline-secondary" type="button">
                  🔍
                </button>
              </div>
            </div>
            <div className="col-md-6 text-end">
              <button className="btn btn-success">
                + Novo Cliente
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Lista de clientes */}
      <div className="card">
        <div className="card-body">
          {clientesFiltrados.length === 0 ? (
            <div className="text-center py-4">
              <p className="text-muted">
                {filtro ? "Nenhum cliente encontrado para a busca." : "Nenhum cliente cadastrado."}
              </p>
            </div>
          ) : (
            <div className="table-responsive">
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th>Nome</th>
                    <th>Email</th>
                    <th>Telefone</th>
                    <th>Status</th>
                    <th>Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {clientesFiltrados.map((cliente) => (
                    <tr key={cliente.id}>
                      <td>
                        <strong>{cliente.nome}</strong>
                      </td>
                      <td>{cliente.email}</td>
                      <td>{cliente.telefone}</td>
                      <td>
                        <span
                          className={`badge ${
                            cliente.status === "ativo"
                              ? "bg-success"
                              : "bg-warning"
                          }`}
                        >
                          {cliente.status}
                        </span>
                      </td>
                      <td>
                        <div className="btn-group" role="group">
                          <button
                            type="button"
                            className="btn btn-outline-primary btn-sm"
                            onClick={() => handleVerDetalhes(cliente.id)}
                          >
                            Ver
                          </button>
                          <button
                            type="button"
                            className={`btn btn-sm ${
                              cliente.status === "ativo"
                                ? "btn-outline-warning"
                                : "btn-outline-success"
                            }`}
                            onClick={() => handleToggleStatus(cliente.id)}
                          >
                            {cliente.status === "ativo" ? "Inativar" : "Ativar"}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Footer informativo */}
      <div className="mt-4 text-center text-muted">
        <small>
          Mostrando {clientesFiltrados.length} de {clientes.length} clientes
        </small>
      </div>
    </div>
  );
};