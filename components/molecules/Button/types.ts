export interface Props {
  title: string;
  type?: "secondary" | "light" | "dark" | "gradient";
  width?: "fit" | "full";
  onClick?: () => void;
  isDisabled?: boolean;
}
