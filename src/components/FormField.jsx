function FormField({ label, name, type = 'text', placeholder, value, onChange, required = false }) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-bold text-[#5b3d7a]">{label}</span>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className="w-full rounded-[22px] border-4 border-[#41295a] bg-white px-4 py-3 text-sm font-medium text-[#41295a] outline-none transition placeholder:text-[#b88ccf] focus:-translate-y-0.5 focus:border-[#ff6ca8]"
      />
    </label>
  );
}

export default FormField;
