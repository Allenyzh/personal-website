import type { AnchorHTMLAttributes, ReactNode } from "react";

interface ShadowButtonProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: "primary" | "outline";
  children: ReactNode;
}

export default function ShadowButton({
  variant = "outline",
  children,
  className = "",
  ...rest
}: ShadowButtonProps) {
  const variantClasses =
    variant === "primary"
      ? "border-[#1a1a1a] bg-[#0a0a0a] text-[#fafaf9] hover:shadow-[3px_3px_0_#71797E]"
      : "border-[#0a0a0a] bg-[#fafaf9] text-[#0a0a0a] hover:shadow-[3px_3px_0_#0a0a0a]";

  return (
    <a
      className={`inline-flex items-center gap-2 border px-[18px] py-2.5 font-mono text-[13px] transition-all duration-150 hover:-translate-x-0.5 hover:-translate-y-0.5 ${variantClasses} ${className}`}
      {...rest}
    >
      {children}
    </a>
  );
}
