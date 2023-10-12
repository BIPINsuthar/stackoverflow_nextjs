export interface Props {
  label: string;
  onDelete?: () => void;
  size?: "small" | "big";
  isActive?: boolean;
}
