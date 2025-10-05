import { Copy } from "lucide-react";
import { toast } from "sonner";

type Props = {
  text: string;
  type: string;
};

export default function CopyButton({ text, type }: Props) {
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success(`${type} copied to clipboard!`);
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
      className="p-1 text-white hover:scale-110 active:scale-95 transition-transform"
    >
      <Copy className="h-5 w-5" />
    </button>
  );
}
