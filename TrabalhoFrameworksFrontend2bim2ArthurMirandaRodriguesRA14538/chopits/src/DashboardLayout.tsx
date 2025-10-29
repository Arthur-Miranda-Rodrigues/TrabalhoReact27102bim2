import React,{ useState } from "react";
import type { ReactNode} from "react"
import { BrowserRouter, Routes, Route, NavLink, useNavigate } from "react-router-dom";

/**
 * DashboardLayout.tsx
 * Tudo em um arquivo: layout + pages de exemplo + rotas.
 * Requer: bootstrap (importado em index.tsx) e react-router-dom v6+
 */

/* ---------- Tipagens ---------- */
type PropsWithChildren = { children?: ReactNode };

/* ---------- Componentes de página de exemplo ---------- */
const HomePage: React.FC = () => (
  <div>
    <h2>Home</h2>
    <p>Bem-vindo ao painel. Use o menu lateral para navegar.</p>
  </div>
);

const ClientesPage: React.FC = () => (
  <div>
    <h2>Clientes</h2>
    <p>Lista de clientes / ferramentas relacionadas.</p>
  </div>
);

const UsuariosPage: React.FC = () => (
  <div>
    <h2>Usuários</h2>
    <p>Gerenciamento de usuários do sistema.</p>
  </div>
);

/* ---------- Ícones simples (SVG inline) ---------- */
const IconHome = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden>
    <path d="M3 11.5L12 4l9 7.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M5 21V12h14v9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);
const IconUsers = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden>
    <path d="M17 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <circle cx="12" cy="7" r="4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);
const IconClients = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden>
    <rect x="3" y="4" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M8 21h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

/* ---------- DashboardLayout principal ---------- */
export const DashboardLayout: React.FC<PropsWithChildren> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(true);
  const navigate = useNavigate();

  const handleLogout = () => {
    // Aqui você pode limpar tokens, chamar API, etc.
    alert("Logout (simulado). Redirecionando para login...");
    navigate("/"); // exemplo
  };

  return (
    <div className="d-flex" style={{ minHeight: "100vh", overflow: "hidden" }}>
      {/* Estilos específicos para o layout (injetado localmente) */}
      <style>{`
        /* Larguras do sidebar */
        .sidebar {
          width: 250px;
          transition: width .25s ease;
          background: #1f2937; /* tom sóbrio */
          color: #e6eef8;
        }
        .sidebar.collapsed {
          width: 70px;
        }
        .sidebar .nav-link {
          color: #d1def3;
        }
        .sidebar .nav-link.active {
          background: rgba(255,255,255,0.06);
          color: #fff;
        }
        .sidebar .brand {
          font-weight: 700;
          letter-spacing: .4px;
        }
        .content-area {
          flex: 1 1 auto;
          padding: 1.25rem;
          background: #f6f8fb;
          overflow: auto;
        }
        /* Mobile: make sidebar overlay and collapsible */
        @media (max-width: 768px) {
          .sidebar {
            position: fixed;
            z-index: 1030;
            height: 100vh;
            left: 0;
            top: 0;
            transform: translateX(-100%);
            transition: transform .22s ease;
            box-shadow: 0 6px 20px rgba(0,0,0,0.12);
          }
          .sidebar.open {
            transform: translateX(0);
          }
          .overlay {
            position: fixed;
            inset: 0;
            background: rgba(0,0,0,0.35);
            z-index: 1020;
          }
        }
      `}</style>

      {/* Sidebar */}
      <aside
        className={`sidebar d-flex flex-column p-2 ${sidebarOpen ? "" : "collapsed"}`}
        aria-label="Sidebar"
      >
        <div className="d-flex align-items-center mb-3 px-2">
          <div className="me-auto d-flex align-items-center">
            <div className="brand" style={{ fontSize: sidebarOpen ? 20 : 16 }}>
              {/* Logo / título */}
              <span style={{ display: "inline-block", width: 36, height: 36, borderRadius: 8, background: "#3b82f6", marginRight: sidebarOpen ? 10 : 0 }} />
              {sidebarOpen && <span>Painel</span>}
            </div>
          </div>

          {/* Toggle apenas para mostrar/ocultar sidebar na versão web */}
          <button
            className="btn btn-sm btn-outline-light"
            onClick={() => setSidebarOpen(v => !v)}
            aria-label="Toggle sidebar"
            title="Alternar menu"
          >
            {sidebarOpen ? "«" : "»"}
          </button>
        </div>

        <nav className="nav flex-column px-1">
          <NavLink to="/home" end className="nav-link d-flex align-items-center py-2 px-2 rounded">
            <span className="me-2"><IconHome /></span>
            {sidebarOpen && <span>Home</span>}
          </NavLink>

          <NavLink to="/clientes" className="nav-link d-flex align-items-center py-2 px-2 rounded">
            <span className="me-2"><IconClients /></span>
            {sidebarOpen && <span>Clientes</span>}
          </NavLink>

          <NavLink to="/usuarios" className="nav-link d-flex align-items-center py-2 px-2 rounded">
            <span className="me-2"><IconUsers /></span>
            {sidebarOpen && <span>Usuários</span>}
          </NavLink>
        </nav>

        <div className="mt-auto px-2 pb-3">
          {sidebarOpen ? (
            <div className="small text-muted">Versão 1.0 • &copy; sua empresa</div>
          ) : (
            <div className="text-center small text-muted">v1</div>
          )}
        </div>
      </aside>

      {/* Overlay para mobile quando sidebar aberta */}
      {/* Exibimos overlay se a largura for mobile e sidebar estiver aberta */}
      <div
        className={`d-md-none ${sidebarOpen ? "overlay" : ""}`}
        onClick={() => setSidebarOpen(false)}
        style={{ display: sidebarOpen ? undefined : "none" }}
        aria-hidden
      />

      {/* Main content */}
      <main className="d-flex flex-column w-100">
        {/* Header */}
        <header className="d-flex align-items-center justify-content-between px-3 py-2 border-bottom bg-white">
          <div className="d-flex align-items-center">
            {/* botão para abrir sidebar no mobile */}
            <button
              className="btn btn-outline-secondary d-md-none me-2"
              onClick={() => setSidebarOpen(true)}
              aria-label="Abrir menu"
            >
              ☰
            </button>

            <div className="d-flex align-items-center">
              <h5 className="mb-0 me-3">Dashboard</h5>
              <small className="text-muted">Painel administrativo</small>
            </div>
          </div>

          <div className="d-flex align-items-center">
            <div className="me-3 text-end">
              <div style={{ fontSize: 14 }}>Olá, <strong>Admin</strong>!</div>
              <div className="small text-muted">administrador</div>
            </div>

            <button className="btn btn-outline-primary me-2" onClick={() => alert("Abrir perfil (simulado)")}>
              Perfil
            </button>

            <button className="btn btn-danger" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </header>

        {/* Conteúdo */}
        <section className="content-area">
          <div className="container-fluid">
            {children}
          </div>
        </section>
      </main>
    </div>
  );
};

/* ---------- App com rotas (pronto para uso) ---------- */
export const DashboardApp: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<DashboardLayout><HomePage /></DashboardLayout>} />
      <Route path="/clientes" element={<DashboardLayout><ClientesPage /></DashboardLayout>} />
      <Route path="/usuarios" element={<DashboardLayout><UsuariosPage /></DashboardLayout>} />

      {/* Exemplo: rota 404 */}
      <Route path="*" element={<DashboardLayout><div><h2>404</h2><p>Página não encontrada</p></div></DashboardLayout>} />
    </Routes>
  );
};

/* ---------- Componente wrapper para renderizar com BrowserRouter (útil para index.tsx) ---------- */
const DashboardRoot: React.FC = () => (
  <BrowserRouter>
    <DashboardApp />
  </BrowserRouter>
);

export default DashboardRoot;
