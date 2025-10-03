import { Code, Menu as MenuIcon, X as CloseIcon } from "lucide-react";
import { SITE_TITLE } from "@/data/consts";
import { navItems } from "@/data/navItems";
import { useEffect, useState } from "react";

interface NavProps {
  currentPath: string;
}

export default function Nav({ currentPath }: NavProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  // 锁定滚动 & ESC 关闭
  useEffect(() => {
    if (menuOpen) {
      const original = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      const onKey = (e: KeyboardEvent) => {
        if (e.key === "Escape") setMenuOpen(false);
      };
      window.addEventListener("keydown", onKey);
      return () => {
        document.body.style.overflow = original;
        window.removeEventListener("keydown", onKey);
      };
    }
  }, [menuOpen]);

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

  const sortedNavItems = [...navItems].sort((a, b) => a.order - b.order);

  return (
    <nav
      className={`sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 transition-colors duration-300 ease-in-out ${
        menuOpen ? "!bg-white" : ""
      }`}
    >
      <div className="container flex h-14 mx-auto items-center md:px-0 px-2">
        <div className="mr-4 flex">
          <a href="/" className="mr-6 flex items-center space-x-2">
            <Code className="h-6 w-6" />
            <span className="font-bold">{SITE_TITLE}</span>
          </a>
        </div>
        {/* 桌面导航 */}
        <div className="flex-1 items-center justify-end hidden md:flex">
          <nav className="flex items-center space-x-3 text-sm font-medium">
            {sortedNavItems.map((item) => (
              <a
                key={item.path}
                href={item.path}
                className={`transition-colors text-center px-4 py-1 rounded ${
                  isActive(item.path)
                    ? "bg-secondary text-primary font-semibold"
                    : "hover:bg-gray-200"
                }`}
              >
                {item.name}
              </a>
            ))}
          </nav>
        </div>

        {/* 移动端汉堡按钮 */}
        <div className="ml-auto md:hidden">
          <button
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMenuOpen((v) => !v)}
            className="inline-flex items-center justify-center rounded-full border px-2 py-2 text-sm font-medium transition-colors hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-ring"
          >
            {menuOpen ? (
              <CloseIcon className="h-5 w-5" />
            ) : (
              <MenuIcon className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>

      {/* 移动端全屏菜单 Overlay */}
      <div
        id="mobile-menu"
        aria-hidden={!menuOpen}
        className={`fixed inset-0 z-[60] md:hidden transition-opacity duration-300 ease-in-out ${
          menuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        {/* 背景遮罩 */}
        <div
          className={`absolute inset-0 transition-opacity duration-300 ease-in-out ${
            menuOpen ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => setMenuOpen(false)}
        />

        {/* 菜单面板 */}
        <div
          className={`absolute top-[56px] inset-0 bg-white transition-all duration-300 ease-in-out  ${
            menuOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-3"
          }`}
        >
          <div className="flex flex-col items-center justify-center gap-6 py-10 px-6 bg-white h-[calc(100dvh-56px)] ">
            {sortedNavItems.map((item) => (
              <a
                key={item.path}
                href={item.path}
                onClick={() => setMenuOpen(false)}
                className={`w-full text-center text-lg tracking-wide rounded-md px-4 py-3 transition-colors duration-200 ${
                  isActive(item.path)
                    ? "bg-secondary text-primary font-semibold"
                    : "hover:bg-gray-100"
                }`}
              >
                {item.name}
              </a>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}
