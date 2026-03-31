import { formatDate } from '../utils/formatDate';

const columns = [
  { key: 'backlog', title: 'Backlog', accent: 'from-[#ffd96f] to-[#ffbf47]', card: 'bg-[#fff0b7]' },
  { key: 'doing', title: 'Doing', accent: 'from-[#9fe7ff] to-[#71d7ff]', card: 'bg-[#dff7ff]' },
  { key: 'done', title: 'Done', accent: 'from-[#b7f9c5] to-[#8ee9b0]', card: 'bg-[#e7ffef]' },
];

const order = ['backlog', 'doing', 'done'];

function nextStatus(status, direction) {
  const currentIndex = order.indexOf(status);
  const targetIndex = currentIndex + direction;

  if (targetIndex < 0 || targetIndex >= order.length) {
    return status;
  }

  return order[targetIndex];
}

function KanbanBoard({ tasks, filter, onStatusChange, onEdit, onDelete }) {
  const visibleTasks = filter === 'all' ? tasks : tasks.filter((task) => task.status === filter);

  return (
    <div className="grid gap-5 xl:grid-cols-3">
      {columns.map((column) => {
        const columnTasks = visibleTasks.filter((task) => task.status === column.key);

        return (
          <section key={column.key} className="rounded-[30px] border-4 border-[#41295a] bg-[#fffdf7] p-4 shadow-panel">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <div className={`h-3 w-20 rounded-full bg-gradient-to-r ${column.accent}`} />
                <h3 className="mt-3 font-display text-2xl font-semibold text-[#41295a]">{column.title}</h3>
              </div>
              <span className="rounded-full border-4 border-[#41295a] bg-[#fff1a8] px-3 py-1 text-xs font-bold text-[#41295a] shadow-sticker">
                {columnTasks.length} tarefa(s)
              </span>
            </div>

            <div className="space-y-3">
              {columnTasks.length === 0 ? (
                <div className="rounded-[28px] border-4 border-dashed border-[#41295a] px-4 py-8 text-center text-sm font-semibold text-[#8d69aa]">
                  Nenhuma tarefa nesta coluna.
                </div>
              ) : null}

              {columnTasks.map((task) => (
                <article
                  key={task.id}
                  className={`rounded-[28px] border-4 border-[#41295a] p-4 shadow-sticker transition hover:-translate-y-1 ${column.card}`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h4 className="font-display text-xl font-semibold text-[#41295a]">{task.title}</h4>
                      <p className="mt-2 text-sm leading-6 text-[#6b4b89]">
                        {task.description || 'Sem descricao informada.'}
                      </p>
                    </div>
                    <select
                      value={task.status}
                      onChange={(event) => onStatusChange(task, event.target.value)}
                      className="rounded-[18px] border-4 border-[#41295a] bg-white px-3 py-2 text-xs font-bold text-[#41295a] outline-none"
                    >
                      <option value="backlog">Backlog</option>
                      <option value="doing">Doing</option>
                      <option value="done">Done</option>
                    </select>
                  </div>

                  <div className="mt-4 flex flex-wrap items-center gap-2 text-xs font-semibold text-[#8d69aa]">
                    <span>Criado em {formatDate(task.createdAt)}</span>
                  </div>

                  <div className="mt-5 flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={() => onStatusChange(task, nextStatus(task.status, -1))}
                      disabled={task.status === 'backlog'}
                      className="rounded-[18px] border-4 border-[#41295a] bg-white px-3 py-2 text-xs font-bold text-[#41295a] shadow-sticker disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      Voltar
                    </button>
                    <button
                      type="button"
                      onClick={() => onStatusChange(task, nextStatus(task.status, 1))}
                      disabled={task.status === 'done'}
                      className="rounded-[18px] border-4 border-[#41295a] bg-[#9fe7ff] px-3 py-2 text-xs font-bold text-[#41295a] shadow-sticker disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      Avancar
                    </button>
                    <button
                      type="button"
                      onClick={() => onEdit(task)}
                      className="rounded-[18px] border-4 border-[#41295a] bg-[#fff1a8] px-3 py-2 text-xs font-bold text-[#41295a] shadow-sticker"
                    >
                      Editar
                    </button>
                    <button
                      type="button"
                      onClick={() => onDelete(task)}
                      className="rounded-[18px] border-4 border-[#41295a] bg-[#ffd1e4] px-3 py-2 text-xs font-bold text-[#7b2853] shadow-sticker"
                    >
                      Excluir
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}

export default KanbanBoard;
