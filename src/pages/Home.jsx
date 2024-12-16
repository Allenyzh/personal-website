import "./Home.css";
import { useState, useEffect } from "react";

const role = ["math student", "full-stack developer", "passionate learner"];

function Home() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % role.length);
    }, 2000); // 每2秒切换一次

    // 清除定时器，防止内存泄漏
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div className="flex-1 flex flex-col justify-center items-center dark:text-white">
        <div className="font-bold text-4xl">Hello, I am ...</div>
        <div className="font-bold text-4xl pb-4">ZHENHAO YANG</div>
        <p className="font-medium text-2xl capitalize">{role[currentIndex]}</p>
      </div>
    </>
  );
}

export default Home;
