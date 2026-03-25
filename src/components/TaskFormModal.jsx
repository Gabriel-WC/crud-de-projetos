import { useEffect, useState } from 'react';
import AlertMessage from './AlertMessage';
import FormField from './FormField';

const initialState = {
  title: '',
  description: '',
  status: 'backlog',
};

function TaskFormModal({ open, onClose, onSubmit, loading, error, initialValues }) {
  const [formData, setFormData] = useState(initialState);

  useEffect(() => {
    if (open) {
      setFormData(
        initialValues
          ? {
              title: initialValues.title || '',
              description: initialValues.description || '',
              status: initialValues.status || 'backlog',
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
              {initialValues ? 'Editar tarefa' : 'Nova tarefa'}
            </h3>
            <p className="mt-2 text-sm text-slate-400">
              Organize o trabalho por etapa e acompanhe o que precisa avancar.
            </p>
          </div>
          <button type="button" onClick={onClose} className="text-slate-400 hover:text-white">
            Fechar
          </button>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <AlertMessage message={error} />
          <FormField
            label="Titulo"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Ex: Implementar tela de dashboard"
            required
          />

          <label className="block">
            <span className="mb-2 block text-sm font-medium text-slate-200">Descricao</span>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Defina detalhes e criterio de conclusao"
              rows="4"
              className="w-full rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-brand-400"
            />
          </label>

          <label className="block">
            <span className="mb-2 block text-sm font-medium text-slate-200">Status</span>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-sm text-white outline-none transition focus:border-brand-400"
            >
              <option value="backlog">Backlog</option>
              <option value="doing">Doing</option>
              <option value="done">Done</option>
            </select>
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
              {loading ? 'Salvando...' : 'Salvar tarefa'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default TaskFormModal;
