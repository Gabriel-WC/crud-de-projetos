function LoadingScreen({ label = 'Carregando...' }) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950 px-4 text-slate-100">
      <div className="rounded-3xl border border-white/10 bg-white/5 px-6 py-5 shadow-panel backdrop-blur">
        <div className="flex items-center gap-3">
          <span className="h-3 w-3 animate-pulse rounded-full bg-brand-400" />
          <p className="text-sm font-medium">{label}</p>
        </div>
      </div>
    </div>
  );
}

export default LoadingScreen;
