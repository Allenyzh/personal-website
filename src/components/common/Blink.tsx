interface BlinkProps {
  width?: number;
  height?: number;
  className?: string;
}

export default function Blink({
  width = 8,
  height = 14,
  className = "",
}: BlinkProps) {
  return (
    <span
      className={`ml-0.5 inline-block align-[-2px] bg-[oklch(0.62_0.14_150)] animate-pulse ${className}`}
      style={{ width, height }}
    />
  );
}
