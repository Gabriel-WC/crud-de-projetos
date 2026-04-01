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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#41295a]/35 px-4 backdrop-blur-sm">
      <div className="w-full max-w-xl rounded-[34px] border-4 border-[#41295a] bg-[#fffdf7] p-6 shadow-panel">
        <div className="mb-6 flex items-start justify-between gap-4">
          <div>
            <h3 className="font-display text-3xl font-semibold text-[#41295a]">
              {initialValues ? 'Editar tarefa' : 'Nova tarefa'}
            </h3>
            <p className="mt-2 text-base leading-7 text-[#755392]">
              {'Organize o trabalho por etapa e acompanhe o que precisa avançar.'}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-[18px] border-4 border-[#41295a] bg-[#e5e7eb] px-3 py-2 text-sm font-bold text-[#111827] shadow-sticker"
          >
            Fechar
          </button>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <AlertMessage message={error} />
          <FormField
            label={'Título'}
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Ex: Implementar tela de dashboard"
            required
          />

          <label className="block">
            <span className="mb-2 block text-sm font-bold text-[#5b3d7a]">{'Descrição'}</span>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder={'Defina detalhes e critério de conclusão'}
              rows="4"
              className="w-full rounded-[22px] border-4 border-[#41295a] bg-white px-4 py-3 text-sm font-medium text-[#41295a] outline-none transition placeholder:text-[#9ca3af] focus:border-[#111111]"
            />
          </label>

          <label className="block">
            <span className="mb-2 block text-sm font-bold text-[#5b3d7a]">Status</span>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full rounded-[22px] border-4 border-[#41295a] bg-white px-4 py-3 text-sm font-bold text-[#41295a] outline-none transition focus:border-[#111111]"
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
              className="rounded-[20px] border-4 border-[#41295a] bg-white px-4 py-3 text-sm font-bold text-[#41295a] shadow-sticker"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={loading}
              className="rounded-[20px] border-4 border-[#41295a] bg-[#111111] px-4 py-3 text-sm font-bold text-white shadow-sticker transition hover:bg-[#000000] disabled:cursor-not-allowed disabled:opacity-60"
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
