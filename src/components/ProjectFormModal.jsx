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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#41295a]/35 px-4 backdrop-blur-sm">
      <div className="w-full max-w-xl rounded-[34px] border-4 border-[#41295a] bg-[#fffdf7] p-6 shadow-panel">
        <div className="mb-6 flex items-start justify-between gap-4">
          <div>
            <h3 className="font-display text-3xl font-semibold text-[#41295a]">
              {initialValues ? 'Editar projeto' : 'Novo projeto'}
            </h3>
            <p className="mt-2 text-base leading-7 text-[#755392]">
              {'Defina o nome e uma descrição clara para facilitar o acompanhamento.'}
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
            label="Nome do projeto"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Ex: Portal do cliente"
            required
          />

          <label className="block">
            <span className="mb-2 block text-sm font-bold text-[#5b3d7a]">{'Descrição'}</span>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Descreva escopo, objetivo e contexto"
              rows="4"
              className="w-full rounded-[22px] border-4 border-[#41295a] bg-white px-4 py-3 text-sm font-medium text-[#41295a] outline-none transition placeholder:text-[#9ca3af] focus:border-[#111111]"
            />
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
              {loading ? 'Salvando...' : 'Salvar projeto'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ProjectFormModal;
