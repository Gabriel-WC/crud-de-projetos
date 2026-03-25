import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

function AppShell() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  async function handleLogout() {
    await logout();
    navigate('/login');
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="mx-auto grid min-h-screen max-w-7xl lg:grid-cols-[280px_1fr]">
        <aside className="border-b border-white/10 bg-slate-900/80 p-6 backdrop-blur lg:border-b-0 lg:border-r">
          <div className="mb-10">
            <p className="text-xs uppercase tracking-[0.3em] text-brand-300">Mini Jira</p>
            <h1 className="mt-3 text-3xl font-semibold">Project Flow</h1>
            <p className="mt-3 text-sm text-slate-400">
              Controle projetos, tarefas e o andamento do time em um unico painel.
            </p>
          </div>

          <nav className="space-y-2">
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                `block rounded-2xl px-4 py-3 text-sm font-medium transition ${
                  isActive ? 'bg-brand-500 text-white' : 'bg-white/5 text-slate-300 hover:bg-white/10'
                }`
              }
            >
              Dashboard
            </NavLink>
          </nav>

          <div className="mt-10 rounded-3xl border border-white/10 bg-white/5 p-4">
            <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Sessao</p>
            <p className="mt-2 break-all text-sm font-medium text-slate-100">{user?.email}</p>
            <button
              type="button"
              onClick={handleLogout}
              className="mt-4 w-full rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-sm font-semibold text-white transition hover:bg-white/20"
            >
              Sair
            </button>
          </div>
        </aside>

        <main className="p-4 sm:p-6 lg:p-10">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default AppShell;
