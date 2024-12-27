import { useState, useEffect } from "react";
import { NavLink } from "react-router";
import { DarkIcon, LightIcon } from "./Icon";

export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const closeMenu = () => setIsOpen(false);

  // 切换主题模式
  const toggleTheme = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  // 添加滚动事件监听器
  useEffect(() => {
    const handleScroll = () => closeMenu();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 导航菜单样式
  const bigScreenLiClass =
    "font-bold cursor-pointer px-3 pb-3 pt-2 rounded-md hover:text-white hover:bg-slate-500 active:scale-125 active:bg-slate-500 dark:text-white dark:hover:text-black dark:hover:bg-slate-100 ";
  const responsiveLiClass =
    "py-3 font-bold hover:bg-gray-200 active:scale-125 dark:bg-gray-800 dark:text-white";
  const colorThemeClass =
    "rounded-full flex items-center justify-center text-black backdrop-brightness-90 transition-colors dark:text-white dark:backdrop-brightness-200";
  const animationTransition = "transition-all duration-300 ease-in-out";

  return (
    <nav className="sticky top-0 bg-slate-200 shadow-md z-50 dark:bg-gray-800 select-none">
      <div className="max-w-7xl mx-auto flex justify-between items-center p-5 md:px-5 md:p-1">
        <div className="text-base md:text-xl font-bold text-nowrap dark:text-white ">
          Allen&apos;s Portfolio
        </div>

        {/* 大屏菜单 */}
        <ul
          className={`hidden mr-28 md:flex md:justify-center md:space-x-6 text-gray-700 font-medium w-full p-3 ${animationTransition}`}
        >
          <NavLink
            className={({ isActive }) =>
              isActive ? "bg-slate-500 rounded-md text-white" : "bg-transparent"
            }
            to="/"
            end
          >
            <li className={bigScreenLiClass}>Home</li>
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive ? "bg-slate-500 rounded-md text-white" : "bg-transparent"
            }
            to="/experience"
            end
          >
            <li className={bigScreenLiClass}>Experience</li>
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive ? "bg-slate-500 rounded-md text-white" : "bg-transparent"
            }
            to="/project"
            end
          >
            <li className={bigScreenLiClass}>Project</li>
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive ? "bg-slate-500 rounded-md text-white" : "bg-transparent"
            }
            to="/blog"
            end
          >
            <li className={bigScreenLiClass}>Blog</li>
          </NavLink>
        </ul>
        {/* 主题按钮 */}
        <div>
          <button
            className={`hidden md:flex w-10 h-10 ${colorThemeClass}`}
            onClick={toggleTheme}
          >
            {isDarkMode ? <LightIcon zhijin={5} /> : <DarkIcon zhijin={5} />}
          </button>
        </div>
        {/* 汉堡按钮 */}
        <button
          className="md:hidden text-gray-700 focus:outline-none dark:text-white"
          onClick={() => setIsOpen(!isOpen)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>
      {/* 小屏下拉菜单 */}
      <div
        className={`md:hidden flex flex-col overflow-hidden bg-slate-200 absolute w-full z-40 ${animationTransition} ${
          isOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <ul className="flex flex-col text-center">
          <NavLink to="/" end>
            <li className={responsiveLiClass} onClick={closeMenu}>
              Home
            </li>
          </NavLink>
          <NavLink to="experience" end>
            <li className={responsiveLiClass} onClick={closeMenu}>
              Experience
            </li>
          </NavLink>
          <NavLink to="project" end>
            <li className={responsiveLiClass} onClick={closeMenu}>
              Project
            </li>
          </NavLink>
          <NavLink to="blog" end>
            <li className={responsiveLiClass} onClick={closeMenu}>
              Blog
            </li>
          </NavLink>
        </ul>
        {/* 小屏幕末尾主题按钮 */}
        <div className="py-8 dark:bg-gray-800">
          <button
            className={`m-auto w-9 h-9 ${colorThemeClass}`}
            onClick={toggleTheme}
          >
            {isDarkMode ? (
              <LightIcon diameter={2} />
            ) : (
              <DarkIcon diameter={2} />
            )}
          </button>
        </div>
      </div>

      {/* 点击屏幕其他地方关闭 */}
      {isOpen && <div className="fixed inset-0" onClick={closeMenu}></div>}
    </nav>
  );
}
