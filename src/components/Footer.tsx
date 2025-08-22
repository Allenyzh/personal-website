import { Github, LinkedIn } from "@/components/common/Github";
import { Mail } from "lucide-react";
import { MY_NAME, MY_EMAIL, MY_GITHUB, MY_LINKEDIN } from "@/consts";

export default function Footer() {
  const today = new Date();
  return (
    <footer className="border-t py-6 md:py-0">
      <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row mx-auto">
        <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            &copy; {today.getFullYear()} {MY_NAME}. All rights reserved.
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <a
            href={MY_GITHUB}
            className="text-muted-foreground hover:text-foreground"
          >
            <Github className="h-5 w-5" />
            <span className="sr-only">GitHub</span>
          </a>
          <a
            href={MY_LINKEDIN}
            className="text-muted-foreground hover:text-foreground"
          >
            <LinkedIn className="h-5 w-5" />
            <span className="sr-only">LinkedIn</span>
          </a>
          <a
            href={`mailto:${MY_EMAIL}`}
            className="text-muted-foreground hover:text-foreground"
          >
            <Mail className="h-5 w-5" />
            <span className="sr-only">Email</span>
          </a>
        </div>
      </div>
    </footer>
  );
}
