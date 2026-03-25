import { Link } from 'react-router-dom';
import { formatDate } from '../utils/formatDate';

function ProjectCard({ project, onEdit, onDelete }) {
  return (
    <article className="rounded-[28px] border border-white/10 bg-slate-900/80 p-6 shadow-panel">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.25em] text-brand-300">Projeto</p>
          <h3 className="mt-3 text-2xl font-semibold text-white">{project.name}</h3>
        </div>

        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => onEdit(project)}
            className="rounded-2xl border border-white/10 px-3 py-2 text-sm font-medium text-slate-200 hover:bg-white/5"
          >
            Editar
          </button>
          <button
            type="button"
            onClick={() => onDelete(project)}
            className="rounded-2xl border border-rose-500/20 px-3 py-2 text-sm font-medium text-rose-200 hover:bg-rose-500/10"
          >
            Excluir
          </button>
        </div>
      </div>

      <p className="mt-4 text-sm leading-6 text-slate-300">
        {project.description || 'Sem descricao informada.'}
      </p>

      <div className="mt-6 flex items-center justify-between gap-4">
        <span className="text-xs text-slate-500">Criado em {formatDate(project.createdAt)}</span>
        <Link
          to={`/projects/${project.id}`}
          className="rounded-2xl bg-brand-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-brand-400"
        >
          Abrir projeto
        </Link>
      </div>
    </article>
  );
}

export default ProjectCard;
