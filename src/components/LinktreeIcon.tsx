interface LinktreeIconProps {
  className?: string;
}

// Linktree brand glyph (official simple-icons path), rendered with currentColor
// to match the lucide-react icons used elsewhere in the UI.
export default function LinktreeIcon({ className }: LinktreeIconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path d="M13.736 5.853l4.05-4.05 2.131 2.132-4.21 4.049h5.954v3.017h-5.954l4.21 4.05-2.131 2.131-5.78-5.811-5.78 5.81-2.13-2.13 4.21-4.05H2.291V7.984h5.954l-4.21-4.05 2.13-2.13 4.05 4.049V0h3.521zM10.215 16.806h3.521V24h-3.521z" />
    </svg>
  );
}
