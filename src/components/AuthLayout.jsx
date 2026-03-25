import { Link } from 'react-router-dom';

function AuthLayout({ title, subtitle, children, footerText, footerLink, footerLabel }) {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(37,99,235,0.35),_transparent_32%),linear-gradient(135deg,_#020617,_#0f172a_55%,_#1e293b)] px-4 py-10 text-white">
      <div className="mx-auto grid min-h-[calc(100vh-5rem)] max-w-6xl gap-10 lg:grid-cols-[1.1fr_0.9fr]">
        <section className="flex flex-col justify-between rounded-[32px] border border-white/10 bg-white/5 p-8 shadow-panel backdrop-blur sm:p-12">
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-brand-200">Mini Jira</p>
            <h1 className="mt-6 max-w-xl text-4xl font-semibold leading-tight sm:text-5xl">
              Gerencie projetos com um fluxo claro, rapido e visual.
            </h1>
            <p className="mt-6 max-w-lg text-base text-slate-300">
              Autenticacao segura, CRUD completo e um board Kanban para acompanhar backlog,
              execucao e entregas em uma experiencia moderna.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            <div className="rounded-3xl border border-white/10 bg-slate-950/30 p-4">
              <p className="text-2xl font-semibold">3</p>
              <p className="mt-2 text-sm text-slate-300">Etapas no workflow</p>
            </div>
            <div className="rounded-3xl border border-white/10 bg-slate-950/30 p-4">
              <p className="text-2xl font-semibold">100%</p>
              <p className="mt-2 text-sm text-slate-300">Dados isolados por usuario</p>
            </div>
            <div className="rounded-3xl border border-white/10 bg-slate-950/30 p-4">
              <p className="text-2xl font-semibold">Firebase</p>
              <p className="mt-2 text-sm text-slate-300">Backend serverless</p>
            </div>
          </div>
        </section>

        <section className="flex items-center justify-center">
          <div className="w-full max-w-md rounded-[32px] border border-white/10 bg-slate-900/80 p-8 shadow-panel backdrop-blur">
            <div className="mb-8">
              <h2 className="text-3xl font-semibold">{title}</h2>
              <p className="mt-2 text-sm text-slate-400">{subtitle}</p>
            </div>

            {children}

            <p className="mt-6 text-sm text-slate-400">
              {footerText}{' '}
              <Link to={footerLink} className="font-semibold text-brand-300 hover:text-brand-200">
                {footerLabel}
              </Link>
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}

export default AuthLayout;
