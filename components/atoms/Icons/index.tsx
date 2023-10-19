import Image from "next/image";
import { Props } from "./types";

export const Icons = ({
  type,
  uri,
  onClick,
  className,
  color,
  size,
}: Props) => {
  return (
    <Image
      onClick={onClick}
      className={`${className}`}
      color={color}
      width={size ?? 20}
      height={size ?? 20}
      alt="Image"
      src={uri ? uri : `/assets/icons/${type}.svg`}
    />
  );
};
