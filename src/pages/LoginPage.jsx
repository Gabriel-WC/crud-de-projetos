import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import AlertMessage from '../components/AlertMessage';
import AuthLayout from '../components/AuthLayout';
import FormField from '../components/FormField';
import { useAuth } from '../contexts/AuthContext';
import { useAsyncAction } from '../hooks/useAsyncAction';

function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, loginWithGoogle } = useAuth();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const { execute, loading, error } = useAsyncAction(login);
  const googleAction = useAsyncAction(loginWithGoogle);

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    await execute(formData.email, formData.password);
    navigate(location.state?.from?.pathname || '/');
  }

  async function handleGoogleLogin() {
    await googleAction.execute();
    navigate(location.state?.from?.pathname || '/');
  }

  return (
    <AuthLayout
      title="Entrar"
      subtitle="Acesse sua conta para acompanhar projetos e tarefas."
      footerText="Ainda nao possui cadastro?"
      footerLink="/register"
      footerLabel="Criar conta"
    >
      <form className="space-y-4" onSubmit={handleSubmit}>
        <AlertMessage message={error || googleAction.error} />
        <FormField
          label="Email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="voce@empresa.com"
          required
        />
        <FormField
          label="Senha"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Digite sua senha"
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-2xl bg-brand-500 px-4 py-3 text-sm font-semibold text-white transition hover:bg-brand-400 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? 'Entrando...' : 'Entrar'}
        </button>
      </form>

      <div className="my-5 flex items-center gap-3">
        <div className="h-px flex-1 bg-white/10" />
        <span className="text-xs uppercase tracking-[0.25em] text-slate-500">ou</span>
        <div className="h-px flex-1 bg-white/10" />
      </div>

      <button
        type="button"
        onClick={handleGoogleLogin}
        disabled={googleAction.loading}
        className="flex w-full items-center justify-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-white transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-60"
      >
        <span className="text-base">G</span>
        {googleAction.loading ? 'Conectando com Google...' : 'Entrar com Google'}
      </button>

      <p className="mt-5 text-xs text-slate-500">
        A autenticacao usa Firebase Authentication com persistencia de sessao.
      </p>
    </AuthLayout>
  );
}

export default LoginPage;
