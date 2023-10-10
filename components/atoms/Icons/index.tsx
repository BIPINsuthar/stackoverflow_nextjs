import Image from "next/image";
import { Props } from "./types";

export const Icons = ({ type, className, color, size }: Props) => {
  return (
    <Image
      className={`invert-colors ${className}`}
      color={color}
      width={size ?? 20}
      height={size ?? 20}
      alt="Image"
      src={`/assets/icons/${type}.svg`}
    />
  );
};
