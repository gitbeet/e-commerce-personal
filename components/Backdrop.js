export default function Backdrop({ onClose, zIndex }) {
  const z = `z-[${zIndex.toString()}]`;
  return (
    <div
      onClick={onClose}
      className={`fixed top-0 bottom-0 left-0 right-0 h-[100vh] w-[100vw] bg-neutral-200 opacity-[15%]  ${z}`}
    ></div>
  );
}
