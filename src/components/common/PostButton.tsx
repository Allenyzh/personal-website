import { Button } from "@/components/ui/button";
import { Globe, Link } from "lucide-react";

interface Item {
  href: string;
  type: "demo" | "code";
  label?: string;
}

interface PostButtonProps {
  items?: Item[];
}
export default function PostButton({ items = [] }: PostButtonProps) {
  if (!items.length) return null;
  return (
    <div className="flex gap-2">
      {items.map((item) => {
        const Icon = item.type === "demo" ? Globe : Link;
        const label =
          item.label ?? (item.type === "demo" ? "See Live" : "View Code");

        return (
          <Button
            key={item.href}
            variant="outline"
            size="lg"
            className="px-2 py-1 text-sm font-medium"
            asChild
          >
            <a
              href={item.href}
              target="_blank"
              rel="noreferrer noopener"
              className="flex items-baseline no-underline"
            >
              <Icon className="mr-2 " />
              <span className="text-center leading-none ">{label}</span>
            </a>
          </Button>
        );
      })}
    </div>
  );
}
