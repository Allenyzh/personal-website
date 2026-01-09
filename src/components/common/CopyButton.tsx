import { useEffect, useRef, useState } from "react";
import { Copy } from "lucide-react";
import { toast } from "sonner";
import { useSpring, animated } from "@react-spring/web";

type Props = {
  text: string;
  type: string;
};

// SVG path lengths for stroke-dasharray animation
const CHECKMARK_LENGTH = 24;
const CIRCLE_LENGTH = 2 * Math.PI * 9; // circumference of circle with r=9

export default function CopyButton({ text, type }: Props) {
  const [copied, setCopied] = useState(false);
  const resetTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

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
    config: { tension: 200, friction: 20 },
    delay: copied ? 100 : 0,
  });

  // Animation for the circle drawing effect
  const circleSpring = useSpring({
    strokeDashoffset: copied ? 0 : CIRCLE_LENGTH,
    config: { tension: 180, friction: 20 },
  });

  // Animation for icon transition (copy icon fade out, check icon fade in)
  const iconTransition = useSpring({
    opacity: copied ? 0 : 1,
    scale: copied ? 0.5 : 1,
    config: { tension: 300, friction: 20 },
  });

  const checkTransition = useSpring({
    opacity: copied ? 1 : 0,
    scale: copied ? 1 : 0.5,
    config: { tension: 300, friction: 20 },
  });

  const handleCopy = async () => {
    if (copied) return; // Prevent multiple clicks during animation

    try {
      await navigator.clipboard.writeText(text);
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
        `Failed to copy ${type}, you have to connect with a https protocal on moblie, or use a modern browser on desktop, or use the manual way to copy it.`
      );
    }
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      aria-label="Copy email"
      className="relative p-1 text-white hover:scale-110 active:scale-95 transition-transform w-7 h-7 flex items-center justify-center"
    >
      {/* Copy Icon with fade out animation */}
      <animated.div
        style={{
          opacity: iconTransition.opacity,
          transform: iconTransition.scale.to((s) => `scale(${s})`),
          position: "absolute",
        }}
      >
        <Copy className="h-5 w-5" />
      </animated.div>

      {/* Animated Check with Circle */}
      <animated.div
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
      </animated.div>
    </button>
  );
}
