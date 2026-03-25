import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AlertMessage from '../components/AlertMessage';
import AuthLayout from '../components/AuthLayout';
import FormField from '../components/FormField';
import { useAuth } from '../contexts/AuthContext';
import { useAsyncAction } from '../hooks/useAsyncAction';

function RegisterPage() {
  const navigate = useNavigate();
  const { register, loginWithGoogle } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const { execute, loading, error } = useAsyncAction(register);
  const googleAction = useAsyncAction(loginWithGoogle);

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    await execute(formData);
    navigate('/');
  }

  async function handleGoogleRegister() {
    await googleAction.execute();
    navigate('/');
  }

  return (
    <AuthLayout
      title="Criar conta"
      subtitle="Cadastre-se para criar projetos, tarefas e acompanhar o fluxo."
      footerText="Ja possui uma conta?"
      footerLink="/login"
      footerLabel="Fazer login"
    >
      <form className="space-y-4" onSubmit={handleSubmit}>
        <AlertMessage message={error || googleAction.error} />
        <FormField
          label="Nome"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Seu nome"
          required
        />
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
          placeholder="Crie uma senha segura"
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-2xl bg-brand-500 px-4 py-3 text-sm font-semibold text-white transition hover:bg-brand-400 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? 'Criando conta...' : 'Criar conta'}
        </button>
      </form>

      <div className="my-5 flex items-center gap-3">
        <div className="h-px flex-1 bg-white/10" />
        <span className="text-xs uppercase tracking-[0.25em] text-slate-500">ou</span>
        <div className="h-px flex-1 bg-white/10" />
      </div>

      <button
        type="button"
        onClick={handleGoogleRegister}
        disabled={googleAction.loading}
        className="flex w-full items-center justify-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-white transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-60"
      >
        <span className="text-base">G</span>
        {googleAction.loading ? 'Conectando com Google...' : 'Continuar com Google'}
      </button>
    </AuthLayout>
  );
}

export default RegisterPage;
