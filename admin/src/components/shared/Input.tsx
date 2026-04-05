const Input = ({
  type,
  placeholder,
  className = "w-full p-3 rounded-lg bg-white/20 text-white placeholder-gray-300 outline-none text-sm",
  name,
  value,
  onChange
}: {
  type: string;
  placeholder: string;
  className?: string;
  name?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  return <input type={type} placeholder={placeholder} className={className} name={name} value={value} onChange={onChange} />;
};

export default Input;
