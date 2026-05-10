import type { ButtonHTMLAttributes } from "react";

import { cn } from "@/shared/utils/cn";

type Props = ButtonHTMLAttributes<HTMLButtonElement>;

export default function Button({ className, ...props }: Props) {
  return (
    <button
      className={cn(
        "rounded-lg bg-black px-4 py-2 text-sm font-medium text-white transition hover:opacity-90",
        className,
      )}
      {...props}
    />
  );
}
