import type { PropsWithChildren } from "react";

import { cn } from "@/shared/utils/cn";

type Props = PropsWithChildren<{
  className?: string;
}>;

export default function Card({ children, className }: Props) {
  return (
    <div className={cn("rounded-xl border border-zinc-200 bg-white p-6 shadow-sm", className)}>
      {children}
    </div>
  );
}
