import { Code } from "lucide-react";
import { SITE_TITLE } from "@/consts";

interface NavProps {
  currentPath: string;
}

export default function Nav({ currentPath }: NavProps) {
  const isActive = (path: string) => {
    // 精确匹配首页
    if (path === "/" && currentPath === "/") return true;

    // 对于其他路径，确保是完整的路径段匹配
    if (path !== "/") {
      // 完全匹配路径
      if (currentPath === path) return true;
      // 匹配子路径（确保路径后面是 / 开头）
      if (currentPath.startsWith(path + "/")) return true;
    }

    return false;
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 mx-auto items-center">
        <div className="mr-4 flex">
          <a href="/" className="mr-6 flex items-center space-x-2">
            <Code className="h-6 w-6" />
            <span className="font-bold">{SITE_TITLE}</span>
          </a>
        </div>
        <div className="flex flex-1 items-center justify-between md:justify-end">
          <nav className="flex items-center space-x-3 text-sm font-medium">
            <a
              href="/"
              className={`transition-colors text-center px-4 py-1 rounded ${
                isActive("/")
                  ? "bg-secondary text-primary font-semibold"
                  : "hover:bg-gray-200"
              }`}
            >
              About
            </a>
            <a
              href="/blog"
              className={`transition-colors text-center px-4 py-1 rounded ${
                isActive("/blog")
                  ? "bg-secondary text-primary font-semibold"
                  : "hover:bg-gray-200"
              }`}
            >
              Blogs
            </a>
            <a
              href="/projects"
              className={`transition-colors text-center px-4 py-1 rounded ${
                isActive("/projects")
                  ? "bg-secondary text-primary font-semibold"
                  : "hover:bg-gray-200"
              }`}
            >
              Projects
            </a>
          </nav>
        </div>
      </div>
    </nav>
  );
}
