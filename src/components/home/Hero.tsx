import { Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Github, LinkedIn } from "@/components/common/Github";
import hero from "@/assets/home/heroopt.jpeg";
import { MY_EMAIL, MY_GITHUB, MY_LINKEDIN } from "@/consts";

export default function Hero() {
  return (
    <section className="container px-4 py-16 md:py-24 min-h-screen flex items-center">
      <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
        <div className="flex flex-col justify-center space-y-4">
          <div className="space-y-2">
            <h2 className="text-lg font-bold  sm:text-2xl xl:text-3xl text-gray-500">
              Hello, I am ...
            </h2>
            <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
              ZHENHAO YANG
            </h1>
            <p className="max-w-[600px] text-muted-foreground md:text-xl">
              I build modern web applications with cutting-edge technologies.
              Passionate about creating scalable solutions that deliver
              exceptional user experiences.
            </p>
          </div>
          <div className="flex flex-col gap-2 min-[400px]:flex-row">
            <Button size="lg" asChild>
              <a href="#projects">View My Work</a>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <a href="#contact">Get In Touch</a>
            </Button>
          </div>
          <div className="flex items-center space-x-4 pt-4">
            <a
              href={MY_GITHUB}
              className="text-muted-foreground hover:text-foreground"
            >
              <Github className="w-5 h-5" />
              <span className="sr-only">GitHub</span>
            </a>
            <a
              href={MY_LINKEDIN}
              className="text-muted-foreground hover:text-foreground"
            >
              <LinkedIn className="w-5 h-5" />
              <span className="sr-only">LinkedIn</span>
            </a>
            <a
              href={`mailto:${MY_EMAIL}`}
              className="text-muted-foreground hover:text-foreground"
            >
              <Mail className="w-5 h-5" />
              <span className="sr-only">Email</span>
            </a>
          </div>
        </div>

        <div className="flex items-center justify-center">
          <img
            src={hero.src}
            width="400"
            height="400"
            className="aspect-square overflow-hidden rounded-xl object-cover"
            alt="Zhenhao Yang"
          />
        </div>
      </div>
    </section>
  );
}
