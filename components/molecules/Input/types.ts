export interface Props {
  label: string;
  type?: "text" | "textarea";
  extraText?: string;
  onkeydown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  value?: string;
  onChange?: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  error?: string;
  placeholder?: string;
}
