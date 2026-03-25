function AlertMessage({ type = 'error', message }) {
  if (!message) {
    return null;
  }

  const styles =
    type === 'success'
      ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-200'
      : 'border-rose-500/30 bg-rose-500/10 text-rose-200';

  return <div className={`rounded-2xl border px-4 py-3 text-sm ${styles}`}>{message}</div>;
}

export default AlertMessage;
