export default function SmallButton({ onClick, text }) {
  return (
    <p
      onClick={onClick}
      className="flex items-center justify-center  text-2xl font-bold  text-neutral-400  hover-hover:hover:text-primary-600 cursor-pointer w-8 h-8"
    >
      {text}
    </p>
  );
}
