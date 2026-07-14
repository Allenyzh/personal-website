import { MY_NAME } from "@/data/consts";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-[#d9d8d3] bg-[#fafaf9] py-8 font-mono text-xs text-[#6b6b66]">
      <div className="container mx-auto flex flex-wrap items-center justify-between gap-4 px-6 md:px-10">
        <div>
          &copy; {currentYear} {MY_NAME} · built with care in Montreal
        </div>

        <div className="flex items-center gap-2">
          <span
            aria-hidden="true"
            className="h-1.5 w-1.5 animate-pulse rounded-full bg-[oklch(0.62_0.14_150)]"
          />
          <span>all systems operational</span>
        </div>
      </div>
    </footer>
  );
}
