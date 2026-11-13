import { useEffect, useRef, useState } from "react";
import { Copy } from "lucide-react";
import { toast } from "sonner";
import { useSpring, animated, useReducedMotion } from "@react-spring/web";
import { cn } from "@/lib/utils";

type Props = {
  /** What gets copied. Provide either `text` or `url`. */
  text?: string;
  /** Fetched on click and copied as text, so large documents stay out of the page. */
  url?: string;
  /** Names the thing being copied: used in the toast and the accessible name. */
  type: string;
  /** Optional visible label. Without it the button is icon-only. */
  label?: string;
};

// SVG path lengths for stroke-dasharray animation
const CHECKMARK_LENGTH = 24;
const CIRCLE_LENGTH = 2 * Math.PI * 9; // circumference of circle with r=9

const fetchText = async (url: string) => {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`${response.status} ${url}`);
  return response.text();
};

async function writeToClipboard({ text, url }: Pick<Props, "text" | "url">) {
  if (text !== undefined) return navigator.clipboard.writeText(text);
  if (!url) return;

  // Safari only allows a clipboard write inside the click itself, so the
  // pending fetch is handed over as a promise instead of awaited first.
  if (typeof ClipboardItem !== "undefined" && navigator.clipboard.write) {
    const blob = fetchText(url).then(
      (body) => new Blob([body], { type: "text/plain" }),
    );
    return navigator.clipboard.write([
      new ClipboardItem({ "text/plain": blob }),
    ]);
  }
  return navigator.clipboard.writeText(await fetchText(url));
}

export default function CopyButton({ text, url, type, label }: Props) {
  const [copied, setCopied] = useState(false);
  const resetTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const immediate = Boolean(useReducedMotion());

  useEffect(() => {
    return () => {
      if (resetTimeoutRef.current) {
        clearTimeout(resetTimeoutRef.current);
        resetTimeoutRef.current = null;
      }
    };
  }, []);

  // Animation for the checkmark drawing effect
  const checkmarkSpring = useSpring({
    strokeDashoffset: copied ? 0 : CHECKMARK_LENGTH,
    config: { tension: 200, friction: 20, clamp: true },
    delay: copied ? 100 : 0,
    immediate,
  });

  // Animation for the circle drawing effect
  const circleSpring = useSpring({
    strokeDashoffset: copied ? 0 : CIRCLE_LENGTH,
    config: { tension: 180, friction: 20, clamp: true },
    immediate,
  });

  // Animation for icon transition (copy icon fade out, check icon fade in)
  const iconTransition = useSpring({
    opacity: copied ? 0 : 1,
    scale: copied ? 0.5 : 1,
    config: { tension: 300, friction: 20 },
    immediate,
  });

  const checkTransition = useSpring({
    opacity: copied ? 1 : 0,
    scale: copied ? 1 : 0.5,
    config: { tension: 300, friction: 20 },
    immediate,
  });

  const handleCopy = async () => {
    if (copied) return; // Prevent multiple clicks during animation

    try {
      await writeToClipboard({ text, url });
      toast.success(`${type} copied to clipboard!`);
      setCopied(true);

      // Reset after animation completes
      if (resetTimeoutRef.current) {
        clearTimeout(resetTimeoutRef.current);
      }
      resetTimeoutRef.current = setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (err) {
      console.error(`Failed to copy ${type}:`, err);
      toast.error(
        `Couldn't copy the ${type.toLowerCase()}. Clipboard access needs HTTPS and a modern browser — please copy it manually.`,
      );
    }
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      aria-label={label ? undefined : `Copy ${type.toLowerCase()}`}
      className={cn(
        "inline-flex h-8 items-center justify-center gap-2 rounded-md text-sm transition-colors duration-150 hover:text-foreground",
        label
          ? "border border-border bg-background px-3 font-medium text-foreground-soft hover:border-border-strong"
          : "w-8",
      )}
    >
      <span className="relative flex size-5 items-center justify-center">
        {/* Copy Icon with fade out animation */}
        <animated.span
          style={{
            opacity: iconTransition.opacity,
            transform: iconTransition.scale.to((s) => `scale(${s})`),
            position: "absolute",
          }}
        >
          <Copy className="size-4" aria-hidden="true" />
        </animated.span>

        {/* Animated Check with Circle */}
        <animated.span
          style={{
            opacity: checkTransition.opacity,
            transform: checkTransition.scale.to((s) => `scale(${s})`),
            position: "absolute",
          }}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            {/* Circle that draws itself */}
            <animated.circle
              cx="10"
              cy="10"
              r="9"
              stroke="currentColor"
              strokeWidth="1.5"
              fill="none"
              strokeLinecap="round"
              strokeDasharray={CIRCLE_LENGTH}
              strokeDashoffset={circleSpring.strokeDashoffset}
              style={{
                transformOrigin: "center",
                transform: "rotate(-90deg)",
              }}
            />
            {/* Checkmark that draws itself */}
            <animated.path
              d="M6 10.5L9 13.5L14 7"
              stroke="currentColor"
              strokeWidth="1.5"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeDasharray={CHECKMARK_LENGTH}
              strokeDashoffset={checkmarkSpring.strokeDashoffset}
            />
          </svg>
        </animated.span>
      </span>
      {label}
    </button>
  );
}
