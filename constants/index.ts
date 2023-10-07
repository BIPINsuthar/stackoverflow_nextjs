export type Mode = "dark" | "light" | "system" | undefined;

export const themes: { value: Mode; label: string; icon: string }[] = [
  { value: "light", label: "Light", icon: "/assets/icons/sun.svg" },
  { value: "dark", label: "Dark", icon: "/assets/icons/moon.svg" },
  { value: "system", label: "System", icon: "/assets/icons/computer.svg" },
];
