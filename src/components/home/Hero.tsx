import { useEffect, useRef, useState } from "react";
import { Mail } from "lucide-react";
import { Github, LinkedIn } from "@/components/common/Github";
import ShadowButton from "@/components/common/ShadowButton";
import Blink from "@/components/common/Blink";
import hero from "@/assets/home/heroopt.jpeg";
import { MY_EMAIL, MY_GITHUB, MY_LINKEDIN } from "@/data/consts";

interface HeroProps {
  currentJob: string;
  currentCompany: string;
  currentCompanyUrl?: string;
}

export default function Hero({
  currentJob,
  currentCompany,
  currentCompanyUrl,
}: HeroProps) {
  const imgRef = useRef<HTMLImageElement>(null);
  const [dims, setDims] = useState({ w: 0, h: 0 });

  useEffect(() => {
    const img = imgRef.current;
    if (!img) return;

    let timer: ReturnType<typeof setTimeout> | undefined;

    const update = () => {
      setDims({
        w: Math.round(img.clientWidth),
        h: Math.round(img.clientHeight),
      });
    };

    const debounced = () => {
      if (timer) clearTimeout(timer);
      timer = setTimeout(update, 100);
    };

    if (img.complete) update();
    else img.addEventListener("load", update);

    const ro = new ResizeObserver(debounced);
    ro.observe(img);

    return () => {
      img.removeEventListener("load", update);
      ro.disconnect();
      if (timer) clearTimeout(timer);
    };
  }, []);

  return (
    <header className="border-b container border-[#d9d8d3] pt-14 pb-12 md:pt-24 md:pb-20">
      <div className="container mx-auto grid grid-cols-1 gap-10 px-6 md:grid-cols-[1.3fr_1fr] md:items-center md:gap-16 md:px-10">
        <div>
          <div className="mb-7 flex items-center gap-2.5 font-mono text-xs text-[#6b6b66] before:block before:h-px before:w-6 before:bg-[#6b6b66] before:content-['']">
            hello_world.ts
            <Blink />
          </div>

          <h1 className="m-0 mb-6 text-[clamp(44px,6.4vw,82px)] font-bold leading-[0.98] tracking-[-0.04em]">
            Zhenhao
            <br />
            <span className="font-medium text-[#6b6b66]">Yang</span>
          </h1>

          <div className="mb-5 flex flex-wrap items-center gap-2 font-mono text-sm text-[#3a3a38]">
            <span className="rounded-sm bg-[oklch(0.62_0.14_150_/_0.12)] px-2 py-[3px] text-[oklch(0.35_0.12_150)]">
              {currentJob}
            </span>
            <span>·</span>
            <span>
              @{" "}
              <a
                className="text-[#0a0a0a] underline decoration-[oklch(0.62_0.14_150)] underline-offset-[3px]"
                href={currentCompanyUrl}
                target="_blank"
                rel="noreferrer"
              >
                {currentCompany}
              </a>
            </span>
            <span>·</span>
            <span>Montreal, QC</span>
          </div>

          <p className="mb-9 max-w-[520px] text-[17px] text-[#3a3a38]">
            I build modern web applications with cutting-edge technologies.
            Passionate about clean code, scalable architecture, and shipping
            products that feel fast and considered.
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <ShadowButton href="#projects" variant="primary">
              <span>View My Work</span>
              <span>→</span>
            </ShadowButton>
            <ShadowButton href="#contact">
              <span>Get In Touch</span>
            </ShadowButton>
          </div>

          <div className="mt-7 flex flex-wrap gap-4 font-mono text-xs text-[#6b6b66]">
            <a
              href={MY_GITHUB}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 py-1 transition-colors hover:text-[#0a0a0a]"
            >
              <Github className="h-3.5 w-3.5" />
              @Allenyzh
            </a>
            <a
              href={MY_LINKEDIN}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 py-1 transition-colors hover:text-[#0a0a0a]"
            >
              <LinkedIn className="h-3.5 w-3.5" />
              /in/allenyzh
            </a>
            <a
              href={`mailto:${MY_EMAIL}`}
              className="flex items-center gap-1.5 py-1 transition-colors hover:text-[#0a0a0a]"
            >
              <Mail className="h-3.5 w-3.5" />
              {MY_EMAIL}
            </a>
          </div>
        </div>

        <div className="relative mx-auto aspect-[4/5] w-full max-w-[320px] overflow-hidden border border-[#1a1a1a] bg-[#f0efec] md:max-w-none">
          <div className="absolute left-3 top-3 z-[2] flex items-center gap-1.5 border border-[#d9d8d3] bg-[#fafaf9] px-2 py-1 font-mono text-[11px] text-[#6b6b66]">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[oklch(0.62_0.14_150)]" />
            working
          </div>
          <img
            ref={imgRef}
            src={hero.src}
            alt="Zhenhao Yang"
            className="absolute inset-0 h-full w-full object-cover [filter:grayscale(0.08)_contrast(1.02)]"
          />
          <div className="absolute bottom-3 left-3 right-3 z-[2] flex justify-between border border-[#d9d8d3] bg-[#fafaf9] px-2.5 py-2 font-mono text-[11px] text-[#3a3a38]">
            <span>~/zhenhao.jpeg</span>
            <span className="text-[#6b6b66]">
              {dims.w}×{dims.h}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
