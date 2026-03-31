function EmptyState({ title, description, actionLabel, onAction }) {
  return (
    <div className="rounded-[32px] border-4 border-dashed border-[#41295a] bg-[#fffdf7] px-6 py-10 text-center shadow-panel">
      <h3 className="font-display text-3xl font-semibold text-[#41295a]">{title}</h3>
      <p className="mx-auto mt-3 max-w-xl text-base leading-7 text-[#755392]">{description}</p>
      {actionLabel ? (
        <button
          type="button"
          onClick={onAction}
          className="mt-6 rounded-[22px] border-4 border-[#41295a] bg-[#ff91c1] px-5 py-3 text-sm font-bold text-[#41295a] shadow-sticker transition hover:-translate-y-0.5 hover:bg-[#ff7eb6]"
        >
          {actionLabel}
        </button>
      ) : null}
    </div>
  );
}

export default EmptyState;
