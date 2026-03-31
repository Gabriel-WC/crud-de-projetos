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
      <section className="rounded-[36px] border-4 border-[#41295a] bg-[radial-gradient(circle_at_top_right,_rgba(255,255,255,0.65),_transparent_24%),linear-gradient(135deg,_#ffef9d,_#ffb8d7_48%,_#9fe7ff)] p-6 shadow-panel sm:p-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-[#ff4f95]">Dashboard</p>
            <h2 className="mt-3 font-display text-4xl font-semibold text-[#41295a]">
              Seu quartel-general mais fofo e organizado
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-7 text-[#5b3d7a]">
              Crie aventuras, acompanhe o progresso e deixe cada tarefa deslizar pelo board com
              muito mais personalidade.
            </p>
          </div>

          <button
            type="button"
            onClick={openCreateModal}
            className="rounded-[22px] border-4 border-[#41295a] bg-[#fffdf7] px-5 py-3 text-sm font-bold text-[#41295a] shadow-sticker transition hover:-translate-y-0.5"
          >
            Novo projeto
          </button>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          <div className="rounded-[28px] border-4 border-[#41295a] bg-[#fff8cc] p-5 shadow-sticker">
            <p className="text-sm font-bold text-[#6b4b89]">Projetos ativos</p>
            <p className="mt-3 font-display text-4xl font-semibold text-[#41295a]">{totalProjects}</p>
          </div>
          <div className="rounded-[28px] border-4 border-[#41295a] bg-[#ffe0ef] p-5 shadow-sticker">
            <p className="text-sm font-bold text-[#6b4b89]">Ultimo projeto</p>
            <p className="mt-3 text-lg font-bold text-[#41295a]">
              {latestProject?.name || 'Nenhum projeto ainda'}
            </p>
          </div>
          <div className="rounded-[28px] border-4 border-[#41295a] bg-[#dff7ff] p-5 shadow-sticker">
            <p className="text-sm font-bold text-[#6b4b89]">Fluxo recomendado</p>
            <p className="mt-3 text-lg font-bold text-[#41295a]">Backlog -&gt; Doing -&gt; Done</p>
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
