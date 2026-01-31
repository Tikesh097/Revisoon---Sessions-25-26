export default function ActivityPulse({ active }) {
  return (
    <span
      className={`ml-2 inline-block w-3 h-3 rounded-full transition-all duration-300
        ${
          active
            ? "bg-purple-500 shadow-[0_0_12px_4px_rgba(168,85,247,0.8)] animate-pulse"
            : "bg-transparent"
        }
      `}
    />
  );
}
