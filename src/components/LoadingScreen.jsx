function LoadingScreen({ label = 'Carregando...' }) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[linear-gradient(180deg,_#fff9df,_#ffeefa_50%,_#e8f7ff)] px-4 text-[#41295a]">
      <div className="rounded-[30px] border-4 border-[#41295a] bg-[#fffdf7] px-6 py-5 shadow-panel">
        <div className="flex items-center gap-3">
          <span className="h-4 w-4 animate-bounce rounded-full bg-[#ff6ca8]" />
          <p className="text-sm font-bold">{label}</p>
        </div>
      </div>
    </div>
  );
}

export default LoadingScreen;
