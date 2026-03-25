import { formatDate } from '../utils/formatDate';

const columns = [
  { key: 'backlog', title: 'Backlog', accent: 'from-slate-500 to-slate-600' },
  { key: 'doing', title: 'Doing', accent: 'from-amber-400 to-orange-500' },
  { key: 'done', title: 'Done', accent: 'from-emerald-400 to-teal-500' },
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
          <section key={column.key} className="rounded-[28px] border border-white/10 bg-slate-900/80 p-4 shadow-panel">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <div className={`h-2 w-16 rounded-full bg-gradient-to-r ${column.accent}`} />
                <h3 className="mt-3 text-xl font-semibold text-white">{column.title}</h3>
              </div>
              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold text-slate-300">
                {columnTasks.length} tarefa(s)
              </span>
            </div>

            <div className="space-y-3">
              {columnTasks.length === 0 ? (
                <div className="rounded-3xl border border-dashed border-white/10 px-4 py-8 text-center text-sm text-slate-500">
                  Nenhuma tarefa nesta coluna.
                </div>
              ) : null}

              {columnTasks.map((task) => (
                <article key={task.id} className="rounded-3xl border border-white/10 bg-slate-950/40 p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h4 className="text-base font-semibold text-white">{task.title}</h4>
                      <p className="mt-2 text-sm leading-6 text-slate-400">
                        {task.description || 'Sem descricao informada.'}
                      </p>
                    </div>
                    <select
                      value={task.status}
                      onChange={(event) => onStatusChange(task, event.target.value)}
                      className="rounded-xl border border-white/10 bg-slate-900 px-3 py-2 text-xs text-white outline-none"
                    >
                      <option value="backlog">Backlog</option>
                      <option value="doing">Doing</option>
                      <option value="done">Done</option>
                    </select>
                  </div>

                  <div className="mt-4 flex flex-wrap items-center gap-2 text-xs text-slate-500">
                    <span>Criado em {formatDate(task.createdAt)}</span>
                  </div>

                  <div className="mt-5 flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={() => onStatusChange(task, nextStatus(task.status, -1))}
                      disabled={task.status === 'backlog'}
                      className="rounded-2xl border border-white/10 px-3 py-2 text-xs font-semibold text-slate-200 disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      Voltar
                    </button>
                    <button
                      type="button"
                      onClick={() => onStatusChange(task, nextStatus(task.status, 1))}
                      disabled={task.status === 'done'}
                      className="rounded-2xl border border-white/10 px-3 py-2 text-xs font-semibold text-slate-200 disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      Avancar
                    </button>
                    <button
                      type="button"
                      onClick={() => onEdit(task)}
                      className="rounded-2xl border border-white/10 px-3 py-2 text-xs font-semibold text-slate-200"
                    >
                      Editar
                    </button>
                    <button
                      type="button"
                      onClick={() => onDelete(task)}
                      className="rounded-2xl border border-rose-500/20 px-3 py-2 text-xs font-semibold text-rose-200"
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
