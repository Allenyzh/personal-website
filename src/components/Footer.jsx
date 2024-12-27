import { Deco, Github, Gmail, Linkedin } from "./Icon";

export default function Footer() {
  return (
    <div className="flex flex-col md:flex-row justify-between bottom-0 p-5 bg-slate-200 dark:bg-gray-800 dark:text-white ">
      <aside className="flex md:items-center">
        <Deco />
        <div className="ml-5 flex items-center">
          <p>Zhenhao Yang © {new Date().getFullYear()} - All right reserved</p>
        </div>
      </aside>
      <div className="flex justify-between md:mt-0 items-center mt-5 w-32">
        <a
          href="https://www.linkedin.com/in/allenyzh/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Linkedin />
        </a>

        <a
          href="https://github.com/Allenyzh"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Github />
        </a>

        <a href="mailto:allenyangzhenhao@gmail.com">
          <Gmail />
        </a>
      </div>
    </div>
  );
}
