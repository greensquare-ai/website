import type { ButtonHTMLAttributes } from "react";

export function StateMark({
  kind,
  label,
}: {
  kind: "evidence" | "assumption" | "unknown" | "recommendation" | "risk";
  label: string;
}) {
  return (
    <span className={`v3-state v3-state-${kind}`}>
      <span aria-hidden />
      {label}
    </span>
  );
}

export function TextButton({
  active,
  children,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { active?: boolean }) {
  return (
    <button className="v3-text-button" data-active={active ? "true" : undefined} {...props}>
      {children}
    </button>
  );
}
