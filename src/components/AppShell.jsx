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
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(255,226,154,0.45),_transparent_18%),radial-gradient(circle_at_top_right,_rgba(255,180,208,0.35),_transparent_24%),linear-gradient(180deg,_#fff9df_0%,_#ffeefa_50%,_#e8f7ff_100%)] text-[#41295a]">
      <div className="mx-auto grid min-h-screen max-w-7xl lg:grid-cols-[280px_1fr]">
        <aside className="border-b-4 border-[#41295a] bg-[#fff3b3] p-6 lg:border-b-0 lg:border-r-4">
          <div className="mb-10">
            <span className="inline-flex rounded-full border-4 border-[#41295a] bg-[#fffdf7] px-4 py-2 text-xs font-bold uppercase tracking-[0.28em] text-[#ff4f95] shadow-sticker">
              Mini Jira
            </span>
            <h1 className="mt-4 font-display text-4xl font-semibold text-[#41295a]">Project Flow</h1>
            <p className="mt-3 text-base leading-7 text-[#6b4b89]">
              {'Controle projetos, mova cartões e acompanhe o progresso com uma interface mais leve.'}
            </p>
          </div>

          <nav className="space-y-2">
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                `block rounded-[24px] border-4 border-[#41295a] px-4 py-3 text-base font-bold transition ${
                  isActive
                    ? 'translate-x-1 bg-[#ff91c1] text-[#41295a] shadow-sticker'
                    : 'bg-[#fffdf7] text-[#6b4b89] hover:-translate-y-0.5 hover:bg-[#ffffff]'
                }`
              }
            >
              Dashboard
            </NavLink>
          </nav>

          <div className="mt-10 rounded-[30px] border-4 border-[#41295a] bg-[#fffdf7] p-4 shadow-sticker">
            <p className="text-xs uppercase tracking-[0.2em] text-[#ff4f95]">{'Sessão'}</p>
            <p className="mt-2 break-all text-sm font-semibold text-[#5b3d7a]">{user?.email}</p>
            <button
              type="button"
              onClick={handleLogout}
              className="mt-4 w-full rounded-[22px] border-4 border-[#41295a] bg-[#9fe7ff] px-4 py-3 text-sm font-bold text-[#41295a] transition hover:bg-[#82dbfb]"
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
