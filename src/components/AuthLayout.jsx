import { Link } from 'react-router-dom';

function AuthLayout({ title, subtitle, children, footerText, footerLink, footerLabel }) {
  return (
    <div className="min-h-screen overflow-hidden bg-[radial-gradient(circle_at_top_left,_rgba(255,196,54,0.35),_transparent_20%),radial-gradient(circle_at_top_right,_rgba(255,126,182,0.35),_transparent_22%),radial-gradient(circle_at_bottom_left,_rgba(34,197,247,0.28),_transparent_18%),linear-gradient(180deg,_#fff8dc,_#ffe9f6_52%,_#ddf4ff)] px-4 py-10 text-[#41295a]">
      <div className="pointer-events-none absolute left-8 top-8 h-24 w-24 rounded-full bg-[#fff1a8] opacity-70 blur-xl" />
      <div className="pointer-events-none absolute bottom-10 right-10 h-32 w-32 rounded-full bg-[#ffb7d9] opacity-70 blur-xl" />
      <div className="mx-auto grid min-h-[calc(100vh-5rem)] max-w-6xl gap-10 lg:grid-cols-[1.1fr_0.9fr]">
        <section className="relative flex flex-col justify-between rounded-[38px] border-4 border-[#41295a] bg-[#fffdf7] p-8 shadow-panel sm:p-12">
          <div>
            <span className="inline-flex rounded-full border-4 border-[#41295a] bg-[#fff1a8] px-4 py-2 text-sm font-bold uppercase tracking-[0.2em] text-[#41295a] shadow-sticker">
              Mini Jira
            </span>
            <h1 className="mt-6 max-w-xl font-display text-4xl font-semibold leading-tight text-[#41295a] sm:text-5xl">
              Transforme tarefas em missoes divertidas e super organizadas.
            </h1>
            <p className="mt-6 max-w-lg text-lg leading-8 text-[#6b4b89]">
              Um cantinho alegre para planejar projetos, mover cartoes pelo board e acompanhar
              cada etapa com mais cor, ritmo e personalidade.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            <div className="rotate-[-2deg] rounded-[30px] border-4 border-[#41295a] bg-[#ffd96f] p-4 shadow-sticker">
              <p className="font-display text-3xl font-semibold text-[#41295a]">3</p>
              <p className="mt-2 text-sm font-semibold text-[#5b3d7a]">Fases da aventura</p>
            </div>
            <div className="translate-y-4 rounded-[30px] border-4 border-[#41295a] bg-[#9fe7ff] p-4 shadow-sticker">
              <p className="font-display text-3xl font-semibold text-[#41295a]">100%</p>
              <p className="mt-2 text-sm font-semibold text-[#5b3d7a]">Espaco so seu</p>
            </div>
            <div className="rotate-[2deg] rounded-[30px] border-4 border-[#41295a] bg-[#ffbdd8] p-4 shadow-sticker">
              <p className="font-display text-3xl font-semibold text-[#41295a]">Firebase</p>
              <p className="mt-2 text-sm font-semibold text-[#5b3d7a]">Motor na nuvem</p>
            </div>
          </div>
        </section>

        <section className="flex items-center justify-center">
          <div className="w-full max-w-md rounded-[38px] border-4 border-[#41295a] bg-[#fffdf7] p-8 shadow-panel">
            <div className="mb-8">
              <h2 className="font-display text-4xl font-semibold text-[#41295a]">{title}</h2>
              <p className="mt-2 text-base leading-7 text-[#6b4b89]">{subtitle}</p>
            </div>

            {children}

            <p className="mt-6 text-sm font-medium text-[#755392]">
              {footerText}{' '}
              <Link to={footerLink} className="font-bold text-[#ff4f95] hover:text-[#e93e83]">
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
