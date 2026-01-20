export const NoteIcon = ({ size = 24, className }: { size?: number; className?: string }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M16 2v4a2 2 0 0 0 2 2h4" />
    <path d="M22 6l-6-6H5a2 2 0 0 0-2 2v18a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6z" />
    <path d="M9 12h6" />
    <path d="M9 16h6" />
  </svg>
);
