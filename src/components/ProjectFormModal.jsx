import { useEffect, useState } from 'react';
import AlertMessage from './AlertMessage';
import FormField from './FormField';

const initialState = {
  name: '',
  description: '',
};

function ProjectFormModal({ open, onClose, onSubmit, loading, error, initialValues }) {
  const [formData, setFormData] = useState(initialState);

  useEffect(() => {
    if (open) {
      setFormData(
        initialValues
          ? {
              name: initialValues.name || '',
              description: initialValues.description || '',
            }
          : initialState,
      );
    }
  }, [initialValues, open]);

  if (!open) {
    return null;
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    await onSubmit(formData);
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 px-4 backdrop-blur-sm">
      <div className="w-full max-w-xl rounded-[28px] border border-white/10 bg-slate-900 p-6 shadow-panel">
        <div className="mb-6 flex items-start justify-between gap-4">
          <div>
            <h3 className="text-2xl font-semibold text-white">
              {initialValues ? 'Editar projeto' : 'Novo projeto'}
            </h3>
            <p className="mt-2 text-sm text-slate-400">
              Defina o nome e uma descricao clara para facilitar o acompanhamento.
            </p>
          </div>
          <button type="button" onClick={onClose} className="text-slate-400 hover:text-white">
            Fechar
          </button>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <AlertMessage message={error} />
          <FormField
            label="Nome do projeto"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Ex: Portal do cliente"
            required
          />

          <label className="block">
            <span className="mb-2 block text-sm font-medium text-slate-200">Descricao</span>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Descreva escopo, objetivo e contexto"
              rows="4"
              className="w-full rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-brand-400"
            />
          </label>

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="rounded-2xl border border-white/10 px-4 py-3 text-sm font-semibold text-slate-200 hover:bg-white/5"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={loading}
              className="rounded-2xl bg-brand-500 px-4 py-3 text-sm font-semibold text-white transition hover:bg-brand-400 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? 'Salvando...' : 'Salvar projeto'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ProjectFormModal;
