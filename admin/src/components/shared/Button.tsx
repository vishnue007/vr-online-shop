import { Link } from "react-router-dom";

type ButtonProps = {
  type?: "submit" | "reset" | "button";
  label: string;
  onClick?: () => void;
  className?: string;
  to?: string;
}
const Button = ({
  type,
  label,
  onClick,
  className = "w-full p-3 rounded-lg bg-gradient-to-r from-pink-400 to-rose-400 text-white text-base cursor-pointer transition transform hover:scale-105 hover:shadow-lg",
  to
}: ButtonProps) => {
    
if (to) {
    return (
      <Link to={to} className={className}>
        {label}
      </Link>
    );
  }
  return (
    <button type={type} className={className} onClick={onClick}>
      {label}
    </button>
  );
};
export default Button;
