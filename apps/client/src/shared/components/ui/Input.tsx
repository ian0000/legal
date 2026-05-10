import type { InputHTMLAttributes } from "react";

import { cn } from "@/shared/utils/cn";

type Props = InputHTMLAttributes<HTMLInputElement>;

export default function Input({ className, ...props }: Props) {
  return (
    <input
      className={cn(
        "w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm outline-none focus:border-black",
        className,
      )}
      {...props}
    />
  );
}
