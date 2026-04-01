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
      subtitle={'Acesse sua conta para acompanhar projetos, tarefas e o andamento do board.'}
      footerText={'Ainda não possui cadastro?'}
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
          placeholder={'você@empresa.com'}
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
          className="w-full rounded-[22px] border-4 border-[#41295a] bg-[#111111] px-4 py-3 text-sm font-bold text-white shadow-sticker transition hover:bg-[#000000] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? 'Entrando...' : 'Entrar'}
        </button>
      </form>

      <div className="my-5 flex items-center gap-3">
        <div className="h-1 flex-1 rounded-full bg-[#ffd96f]" />
        <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#8d69aa]">ou</span>
        <div className="h-1 flex-1 rounded-full bg-[#9fe7ff]" />
      </div>

      <button
        type="button"
        onClick={handleGoogleLogin}
        disabled={googleAction.loading}
        className="flex w-full items-center justify-center gap-3 rounded-[22px] border-4 border-[#41295a] bg-white px-4 py-3 text-sm font-bold text-[#41295a] shadow-sticker transition hover:bg-[#fff7dc] disabled:cursor-not-allowed disabled:opacity-60"
      >
        <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border-4 border-[#41295a] bg-white shadow-sticker">
          <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4">
            <path fill="#EA4335" d="M12 10.2v3.9h5.4c-.2 1.2-.9 2.2-1.9 3l3 2.3c1.8-1.7 2.8-4.1 2.8-7 0-.7-.1-1.5-.2-2.2H12Z" />
            <path fill="#34A853" d="M12 21c2.5 0 4.6-.8 6.1-2.3l-3-2.3c-.8.6-1.9 1-3.1 1-2.4 0-4.5-1.6-5.2-3.9l-3.1 2.4C5.1 18.9 8.3 21 12 21Z" />
            <path fill="#4A90E2" d="M6.8 13.5c-.2-.6-.3-1.1-.3-1.7s.1-1.2.3-1.7l-3.1-2.4C3 9.1 2.6 10.5 2.6 12s.4 2.9 1.1 4.2l3.1-2.7Z" />
            <path fill="#FBBC05" d="M12 6.5c1.4 0 2.7.5 3.7 1.4l2.8-2.8C16.6 3.5 14.5 2.6 12 2.6c-3.7 0-6.9 2.1-8.3 5.1l3.1 2.4c.7-2.3 2.8-3.6 5.2-3.6Z" />
          </svg>
        </span>
        {googleAction.loading ? 'Conectando com Google...' : 'Entrar com Google'}
      </button>

      <p className="mt-5 text-xs font-semibold leading-6 text-[#8d69aa]">
        {'A autenticação usa Firebase Authentication com persistência de sessão para manter seu acesso ativo.'}
      </p>
    </AuthLayout>
  );
}

export default LoginPage;
