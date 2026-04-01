import { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import AlertMessage from '../components/AlertMessage';
import EmptyState from '../components/EmptyState';
import KanbanBoard from '../components/KanbanBoard';
import LoadingScreen from '../components/LoadingScreen';
import TaskFormModal from '../components/TaskFormModal';
import { useAuth } from '../contexts/AuthContext';
import { useAsyncAction } from '../hooks/useAsyncAction';
import { getProject } from '../services/projectService';
import { createTask, deleteTask, subscribeToTasks, updateTask } from '../services/taskService';
import { formatDate } from '../utils/formatDate';

function ProjectDetailsPage() {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [project, setProject] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [taskModalOpen, setTaskModalOpen] = useState(false);
  const [taskBeingEdited, setTaskBeingEdited] = useState(null);
  const [filter, setFilter] = useState('all');
  const [feedback, setFeedback] = useState('');

  const createAction = useAsyncAction(async (formData) => {
    await createTask({
      ...formData,
      projectId,
      assignedTo: user.uid,
    });
    setFeedback('Tarefa criada com sucesso.');
    closeTaskModal();
  });

  const updateAction = useAsyncAction(async (formData) => {
    await updateTask(taskBeingEdited.id, formData);
    setFeedback('Tarefa atualizada com sucesso.');
    closeTaskModal();
  });

  const removeAction = useAsyncAction(async (task) => {
    await deleteTask(task.id);
    setFeedback(`Tarefa "${task.title}" removida.`);
  });

  const statusAction = useAsyncAction(async ({ task, status }) => {
    if (task.status === status) {
      return;
    }

    await updateTask(task.id, { status });
    setFeedback(`Tarefa "${task.title}" movida para ${status}.`);
  });

  useEffect(() => {
    async function loadProject() {
      setLoading(true);
      const projectData = await getProject(projectId);

      if (!projectData || projectData.ownerId !== user.uid) {
        navigate('/');
        return;
      }

      setProject(projectData);
      setLoading(false);
    }

    loadProject();
  }, [navigate, projectId, user.uid]);

  useEffect(() => {
    const unsubscribe = subscribeToTasks(projectId, user.uid, setTasks);
    return unsubscribe;
  }, [projectId, user.uid]);

  useEffect(() => {
    if (!feedback) {
      return undefined;
    }

    const timeoutId = window.setTimeout(() => {
      setFeedback('');
    }, 3000);

    return () => window.clearTimeout(timeoutId);
  }, [feedback]);

  function closeTaskModal() {
    setTaskModalOpen(false);
    setTaskBeingEdited(null);
  }

  function openCreateTaskModal() {
    setTaskBeingEdited(null);
    setTaskModalOpen(true);
  }

  function openEditTaskModal(task) {
    setTaskBeingEdited(task);
    setTaskModalOpen(true);
  }

  async function handleDelete(task) {
    const confirmed = window.confirm(`Deseja realmente excluir a tarefa "${task.title}"?`);

    if (!confirmed) {
      return;
    }

    await removeAction.execute(task);
  }

  async function handleTaskSubmit(formData) {
    if (taskBeingEdited) {
      await updateAction.execute(formData);
      return;
    }

    await createAction.execute(formData);
  }

  const counters = useMemo(
    () => ({
      backlog: tasks.filter((task) => task.status === 'backlog').length,
      doing: tasks.filter((task) => task.status === 'doing').length,
      done: tasks.filter((task) => task.status === 'done').length,
    }),
    [tasks],
  );

  if (loading || !project) {
    return <LoadingScreen label="Carregando projeto..." />;
  }

  return (
    <div className="space-y-8">
      <section className="rounded-[36px] border-4 border-[#41295a] bg-[#fffdf7] p-6 shadow-panel sm:p-8">
        <Link to="/" className="text-sm font-bold text-[#ff4f95] hover:text-[#e93e83]">
          {'<-'} Voltar para dashboard
        </Link>

        <div className="mt-6 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.25em] text-[#ff4f95]">Projeto</p>
            <h2 className="mt-3 font-display text-4xl font-semibold text-[#41295a]">{project.name}</h2>
            <p className="mt-4 max-w-3xl text-base leading-7 text-[#755392]">
              {project.description || 'Sem descrição informada.'}
            </p>
            <p className="mt-4 text-xs font-semibold text-[#8d69aa]">Criado em {formatDate(project.createdAt)}</p>
          </div>

          <button
            type="button"
            onClick={openCreateTaskModal}
            className="rounded-[22px] border-4 border-[#41295a] bg-[#ff91c1] px-5 py-3 text-sm font-bold text-[#41295a] shadow-sticker transition hover:-translate-y-0.5"
          >
            Nova tarefa
          </button>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-4">
          <div className="rounded-[28px] border-4 border-[#41295a] bg-[#fff1a8] p-5 shadow-sticker">
            <p className="text-sm font-bold text-[#6b4b89]">Total</p>
            <p className="mt-3 font-display text-3xl font-semibold text-[#41295a]">{tasks.length}</p>
          </div>
          <div className="rounded-[28px] border-4 border-[#41295a] bg-[#fff8cc] p-5 shadow-sticker">
            <p className="text-sm font-bold text-[#6b4b89]">Backlog</p>
            <p className="mt-3 font-display text-3xl font-semibold text-[#41295a]">{counters.backlog}</p>
          </div>
          <div className="rounded-[28px] border-4 border-[#41295a] bg-[#dff7ff] p-5 shadow-sticker">
            <p className="text-sm font-bold text-[#6b4b89]">Doing</p>
            <p className="mt-3 font-display text-3xl font-semibold text-[#41295a]">{counters.doing}</p>
          </div>
          <div className="rounded-[28px] border-4 border-[#41295a] bg-[#e7ffef] p-5 shadow-sticker">
            <p className="text-sm font-bold text-[#6b4b89]">Done</p>
            <p className="mt-3 font-display text-3xl font-semibold text-[#41295a]">{counters.done}</p>
          </div>
        </div>
      </section>

      <section className="flex flex-col gap-4 rounded-[32px] border-4 border-[#41295a] bg-[#fffdf7] p-5 shadow-panel lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h3 className="font-display text-2xl font-semibold text-[#41295a]">Kanban board</h3>
          <p className="mt-2 text-base text-[#755392]">
            {'Filtre tarefas por status e altere o workflow rapidamente.'}
          </p>
        </div>

        <label className="flex items-center gap-3 text-sm font-bold text-[#6b4b89]">
          Filtro
          <select
            value={filter}
            onChange={(event) => setFilter(event.target.value)}
            className="rounded-[22px] border-4 border-[#41295a] bg-white px-4 py-3 text-sm font-bold text-[#41295a] outline-none"
          >
            <option value="all">Todos</option>
            <option value="backlog">Backlog</option>
            <option value="doing">Doing</option>
            <option value="done">Done</option>
          </select>
        </label>
      </section>

      <AlertMessage type="success" message={feedback} />
      <AlertMessage
        message={createAction.error || updateAction.error || removeAction.error || statusAction.error}
      />

      {tasks.length === 0 ? (
        <EmptyState
          title="Nenhuma tarefa criada"
          description={'Cadastre a primeira tarefa deste projeto para começar a organizar o fluxo.'}
          actionLabel="Criar tarefa"
          onAction={openCreateTaskModal}
        />
      ) : (
        <KanbanBoard
          tasks={tasks}
          filter={filter}
          onStatusChange={(task, status) => statusAction.execute({ task, status })}
          onEdit={openEditTaskModal}
          onDelete={handleDelete}
        />
      )}

      <TaskFormModal
        open={taskModalOpen}
        onClose={closeTaskModal}
        onSubmit={handleTaskSubmit}
        loading={createAction.loading || updateAction.loading}
        error={createAction.error || updateAction.error}
        initialValues={taskBeingEdited}
      />
    </div>
  );
}

export default ProjectDetailsPage;
