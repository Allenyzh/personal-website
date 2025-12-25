import { useEffect, useState } from "react";

interface Snowflake {
  id: number;
  x: number;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
}

export default function ChristmasSnow() {
  const [snowflakes, setSnowflakes] = useState<Snowflake[]>([]);

  useEffect(() => {
    const flakes: Snowflake[] = [];
    const count = 50; // 雪花数量

    for (let i = 0; i < count; i++) {
      flakes.push({
        id: i,
        x: Math.random() * 100, // 随机水平位置 (%)
        size: Math.random() * 8 + 4, // 雪花大小 4-12px
        duration: Math.random() * 8 + 8, // 下落时间 8-16s
        delay: Math.random() * 10, // 延迟开始 0-10s
        opacity: Math.random() * 0.6 + 0.4, // 透明度 0.4-1
      });
    }
    setSnowflakes(flakes);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden">
      {/* 雪花飘落 */}
      {snowflakes.map((flake) => (
        <div
          key={flake.id}
          className="absolute animate-snowfall"
          style={{
            left: `${flake.x}%`,
            width: `${flake.size}px`,
            height: `${flake.size}px`,
            opacity: flake.opacity,
            animationDuration: `${flake.duration}s`,
            animationDelay: `${flake.delay}s`,
          }}
        >
          <span
            className="text-sky-200 drop-shadow-lg"
            style={{
              fontSize: `${flake.size}px`,
              textShadow: "0 0 8px rgba(56, 189, 248, 0.8)",
            }}
          >
            ❄
          </span>
        </div>
      ))}

      {/* 圣诞快乐横幅 */}
      <div className="absolute top-15 left-1/2  bg-gradient-to-r from-red-600 to-green-600 text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg animate-bounce-slow flex items-center gap-2">
        <span>🎁</span>
        <span>Merry Christmas!</span>
        <span>🎁</span>
      </div>

      <style>{`
        @keyframes snowfall {
          0% {
            transform: translateY(-10vh) rotate(0deg);
          }
          100% {
            transform: translateY(110vh) rotate(360deg);
          }
        }

        @keyframes swing {
          0%, 100% {
            transform: rotate(-10deg);
          }
          50% {
            transform: rotate(10deg);
          }
        }

        @keyframes bounce-slow {
          0%, 100% {
            transform: translateX(-50%) translateY(0);
          }
          50% {
            transform: translateX(-50%) translateY(-10px);
          }
        }

        .animate-snowfall {
          animation: snowfall linear infinite;
        }

        .animate-swing {
          animation: swing 2s ease-in-out infinite;
          transform-origin: top center;
        }

        .animate-bounce-slow {
          animation: bounce-slow 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
