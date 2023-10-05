export type Mode = "dark" | "light";

export const themes: { value: Mode; label: string }[] = [
  {
    value: "light",
    label: "Light",
  },
  {
    value: "dark",
    label: "Dark",
  },
];
