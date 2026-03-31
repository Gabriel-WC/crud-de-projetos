function AlertMessage({ type = 'error', message }) {
  if (!message) {
    return null;
  }

  const styles =
    type === 'success'
      ? 'border-4 border-[#41295a] bg-[#b7f9c5] text-[#235038]'
      : 'border-4 border-[#41295a] bg-[#ffd1e4] text-[#7b2853]';

  return <div className={`rounded-[22px] px-4 py-3 text-sm font-bold shadow-sticker ${styles}`}>{message}</div>;
}

export default AlertMessage;
