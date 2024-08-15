import { Link } from "@nextui-org/link";
import { Snippet } from "@nextui-org/snippet";
import { Code } from "@nextui-org/code";
import { button as buttonStyles } from "@nextui-org/theme";

import { siteConfig } from "@/config/site";
import { title, subtitle } from "@/components/primitives";
import { GithubIcon } from "@/components/icons";
import { LucideLinkedin, Slice } from "lucide-react";
import ProjectCard from "@/components/projectCard";
import ProjectDetails from "@/components/projectDetails";
import projects from "@/config/projects.json";
import Projects from "@/components/projects";

export default function Home() {
  return (
    <section className="relative flex flex-col items-center justify-center gap-4 pt-8 md:py-10">
      <div className="flex flex-col items-center justify-center gap-4 h-[70vh]">
        <div className="inline-block max-w-lg text-center justify-center">
          <h1 className={title()}>Hi,&nbsp;</h1>
          <br />
          <h1 className={title()}>I am</h1>
          <h1 className={title({ color: "violet" })}> Rabeeh PK,&nbsp;</h1>
          <br />
          <h1 className={title()}>a passionate developer.</h1>
          <h2 className={subtitle({ class: "mt-4" })}>
            Fullstack developer, with strong knoledge in Frontend.
          </h2>
        </div>

        <div className="flex gap-3">
          <Link
            isExternal
            className={buttonStyles({
              color: "primary",
              radius: "full",
              variant: "shadow",
            })}
            href={siteConfig.links.linkedIn}
          >
            <LucideLinkedin size={19} />
            LinkedIn
          </Link>
          <Link
            isExternal
            className={buttonStyles({ variant: "bordered", radius: "full" })}
            href={siteConfig.links.github}
          >
            <GithubIcon size={20} />
            GitHub
          </Link>
        </div>

        <div className="mt-8">
          <Snippet hideCopyButton hideSymbol variant="bordered">
            <span>
              Get more info download
              <a href="/Rabeeh-pk-Resume.pdf" download="Rabeeh-pk-Resume.pdf">
                <Code color="primary">resume.pdf</Code>
              </a>
            </span>
          </Snippet>
        </div>
      </div>
      <Projects />
    </section>
  );
}
