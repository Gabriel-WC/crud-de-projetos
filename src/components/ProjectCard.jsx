import { Link } from 'react-router-dom';
import { formatDate } from '../utils/formatDate';

function ProjectCard({ project, onEdit, onDelete }) {
  return (
    <article className="rounded-[30px] border-4 border-[#41295a] bg-[#fffdf7] p-6 shadow-panel transition hover:-translate-y-1">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.25em] text-[#ff4f95]">Projeto</p>
          <h3 className="mt-3 font-display text-3xl font-semibold text-[#41295a]">{project.name}</h3>
        </div>

        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => onEdit(project)}
            className="rounded-[18px] border-4 border-[#41295a] bg-[#9fe7ff] px-3 py-2 text-sm font-bold text-[#41295a] shadow-sticker"
          >
            Editar
          </button>
          <button
            type="button"
            onClick={() => onDelete(project)}
            className="rounded-[18px] border-4 border-[#41295a] bg-[#ffd1e4] px-3 py-2 text-sm font-bold text-[#7b2853] shadow-sticker"
          >
            Excluir
          </button>
        </div>
      </div>

      <p className="mt-4 text-base leading-7 text-[#755392]">
        {project.description || 'Sem descricao informada.'}
      </p>

      <div className="mt-6 flex items-center justify-between gap-4">
        <span className="text-xs font-semibold text-[#8d69aa]">Criado em {formatDate(project.createdAt)}</span>
        <Link
          to={`/projects/${project.id}`}
          className="rounded-[18px] border-4 border-[#41295a] bg-[#ff91c1] px-4 py-2 text-sm font-bold text-[#41295a] shadow-sticker transition hover:-translate-y-0.5"
        >
          Abrir projeto
        </Link>
      </div>
    </article>
  );
}

export default ProjectCard;
