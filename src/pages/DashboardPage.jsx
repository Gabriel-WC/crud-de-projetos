import { useEffect, useMemo, useState } from 'react';
import AlertMessage from '../components/AlertMessage';
import EmptyState from '../components/EmptyState';
import ProjectCard from '../components/ProjectCard';
import ProjectFormModal from '../components/ProjectFormModal';
import { useAuth } from '../contexts/AuthContext';
import { useAsyncAction } from '../hooks/useAsyncAction';
import {
  createProject,
  deleteProject,
  subscribeToProjects,
  updateProject,
} from '../services/projectService';

function DashboardPage() {
  const { user } = useAuth();
  const [projects, setProjects] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [projectBeingEdited, setProjectBeingEdited] = useState(null);
  const [feedback, setFeedback] = useState('');

  const createAction = useAsyncAction(async (formData) => {
    await createProject({
      ...formData,
      ownerId: user.uid,
    });
    setFeedback('Projeto salvo com sucesso.');
    closeModal();
  });

  const updateAction = useAsyncAction(async (formData) => {
    await updateProject(projectBeingEdited.id, formData);
    setFeedback('Projeto atualizado com sucesso.');
    closeModal();
  });

  const removeAction = useAsyncAction(async (project) => {
    await deleteProject(project.id);
    setFeedback(`Projeto "${project.name}" removido.`);
  });

  useEffect(() => {
    const unsubscribe = subscribeToProjects(user.uid, setProjects);
    return unsubscribe;
  }, [user.uid]);

  useEffect(() => {
    if (!feedback) {
      return undefined;
    }

    const timeoutId = window.setTimeout(() => {
      setFeedback('');
    }, 3000);

    return () => window.clearTimeout(timeoutId);
  }, [feedback]);

  function closeModal() {
    setModalOpen(false);
    setProjectBeingEdited(null);
  }

  function openCreateModal() {
    setProjectBeingEdited(null);
    setModalOpen(true);
  }

  function openEditModal(project) {
    setProjectBeingEdited(project);
    setModalOpen(true);
  }

  async function handleDelete(project) {
    const confirmed = window.confirm(
      `Deseja realmente excluir o projeto "${project.name}"? Todas as tarefas vinculadas tambem serao removidas.`,
    );

    if (!confirmed) {
      return;
    }

    await removeAction.execute(project);
  }

  async function handleSubmit(formData) {
    if (projectBeingEdited) {
      await updateAction.execute(formData);
      return;
    }

    await createAction.execute(formData);
  }

  const totalProjects = projects.length;
  const latestProject = useMemo(() => projects[0], [projects]);

  return (
    <div className="space-y-8">
      <section className="rounded-[32px] border border-white/10 bg-[linear-gradient(135deg,rgba(37,99,235,0.25),rgba(15,23,42,0.95)),radial-gradient(circle_at_top_right,rgba(56,189,248,0.22),transparent_28%)] p-6 shadow-panel sm:p-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-brand-100">Dashboard</p>
            <h2 className="mt-3 text-4xl font-semibold text-white">Seus projetos em um painel central</h2>
            <p className="mt-4 max-w-2xl text-sm leading-6 text-slate-200">
              Crie projetos, acompanhe o progresso e abra cada board para organizar tarefas entre backlog,
              doing e done.
            </p>
          </div>

          <button
            type="button"
            onClick={openCreateModal}
            className="rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-slate-100"
          >
            Novo projeto
          </button>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          <div className="rounded-3xl border border-white/10 bg-slate-950/20 p-5">
            <p className="text-sm text-slate-300">Projetos ativos</p>
            <p className="mt-3 text-4xl font-semibold text-white">{totalProjects}</p>
          </div>
          <div className="rounded-3xl border border-white/10 bg-slate-950/20 p-5">
            <p className="text-sm text-slate-300">Ultimo projeto</p>
            <p className="mt-3 text-lg font-semibold text-white">
              {latestProject?.name || 'Nenhum projeto ainda'}
            </p>
          </div>
          <div className="rounded-3xl border border-white/10 bg-slate-950/20 p-5">
            <p className="text-sm text-slate-300">Fluxo recomendado</p>
            <p className="mt-3 text-lg font-semibold text-white">Backlog -&gt; Doing -&gt; Done</p>
          </div>
        </div>
      </section>

      <AlertMessage type="success" message={feedback} />
      <AlertMessage message={createAction.error || updateAction.error || removeAction.error} />

      {projects.length === 0 ? (
        <EmptyState
          title="Nenhum projeto criado"
          description="Comece cadastrando seu primeiro projeto para organizar tarefas, status e entregas."
          actionLabel="Criar primeiro projeto"
          onAction={openCreateModal}
        />
      ) : (
        <section className="grid gap-5 xl:grid-cols-2">
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onEdit={openEditModal}
              onDelete={handleDelete}
            />
          ))}
        </section>
      )}

      <ProjectFormModal
        open={modalOpen}
        onClose={closeModal}
        onSubmit={handleSubmit}
        loading={createAction.loading || updateAction.loading}
        error={createAction.error || updateAction.error}
        initialValues={projectBeingEdited}
      />
    </div>
  );
}

export default DashboardPage;
