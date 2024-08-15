import { Image } from "@nextui-org/image";
import { Link } from "@nextui-org/link";
import { GithubIcon } from "./icons";
import { Code, Globe, Slack, Sparkles } from "lucide-react";
import { button as buttonStyles } from "@nextui-org/theme";
import { Button } from "@nextui-org/button";
import pros from "@/config/projects.json";
interface Project {
  id: number;
  Title: string;
  description: string;
  image: string;
  thambnail: string;
  story: string;
  fechers: string[];
  skills: string[];
}

function ProjectDetails({ project }: { project: number }) {
  const proj = pros[project];
  return (
    <section className="relative  w-full h-fit md:flex md:px-10">
      <div className="static flex-none  top-0 h-fit md:max-w-[40%] lg:max-w-[30%] grid items-center justify-center">
        <div className="relative w-full h-72 max-h-[280px]">
          {/* Background Gradient Layer */}
          <div className="absolute inset-0 z-0 flex items-center justify-center">
            <div className="relative w-[200px] h-[200px] rounded-full bg-gradient-radial from-violet-500 to-transparent blur-xl left-[-50px]"></div>
            <div className="absolute inset-0 w-[150px] h-[150px] rounded-full bg-gradient-conic from-violet-300 via-violet-500 blur-xl left-[-30px]"></div>
          </div>

          {/* Image Layer */}
          <Image
            width={300}
            height={300}
            className="relative z-10 h-auto object-cover"
            alt={proj.Title}
            src={
              proj.image ||
              "https://app.requestly.io/delay/1000/https://nextui-docs-v2.vercel.app/images/hero-card-complete.jpeg"
            }
          />
        </div>

        <h2 className="text-xl font-semibold mt-2">{proj.Title}</h2>
        <p className="text-md font-extralight">{proj.description}</p>
        <div className="border-t border-slate-400 dark:border-slate-700 flex gap-1 pt-2 mt-5">
          {proj.live && (
            <Link
              isExternal
              className={buttonStyles({ radius: "full", variant: "shadow" })}
              href={proj.live}
            >
              <Globe size={19} color="blue" />
              Live
            </Link>
          )}
          {proj.git && (
            <Link
              isExternal
              className={buttonStyles({ variant: "bordered", radius: "full" })}
              href={proj.git}
            >
              <GithubIcon size={20} />
              Repo
            </Link>
          )}
        </div>
      </div>
      <div className=" w-full h-fit  md:h-[470px]  scrollbar-hide overflow-y-scroll mt-10 md:-mt-10 md:pt-10 md:p-4">
        <div className="flex gap-2 mb-5 w-full">
          <Button
            className="text-sm p-0 min-w-10 rounded-full font-normal text-default-600 bg-default-100"
            startContent={<Sparkles className="text-violet-500" />}
            variant="flat"
          ></Button>
          <div>
            <h3 className="text-2xl font-bold">Story</h3>
            <p>{proj.story}</p>
          </div>
        </div>
        <div className="flex gap-2 mb-5 w-full">
          <Button
            className="text-sm p-0 min-w-10 rounded-full font-normal text-default-600 bg-default-100"
            startContent={<Slack className="text-violet-500" />}
            variant="flat"
          ></Button>
          <div className="w-full">
            <h3 className="text-2xl font-bold">Features</h3>
            <div className="grid gap-1 w-full">
              {proj.fechers.map((feature, index) => (
                <div
                  key={index}
                  className="flex items-center p-2  bg-slate-100 rounded-xl dark:bg-indigo-950 w-full mb-2"
                >
                  <span className="me-1 bg-slate-200 dark:bg-slate-600 rounded-full w-[30px] flex text-center justify-center">
                    {index + 1}
                  </span>
                  <p>{feature}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="flex gap-2 mb-5 w-full">
          <Button
            className="text-sm p-0 min-w-10 rounded-full font-normal text-default-600 bg-default-100"
            startContent={<Code className="text-violet-500" />}
            variant="flat"
          ></Button>
          <div className="w-full">
            <h3 className="text-2xl font-bold">Tech Stack</h3>
            <div className="flex flex-wrap gap-2 p-2 w-full">
              {proj.skills.map((skill, index) => (
                <span
                  key={index}
                  className="me-1 bg-slate-100 dark:bg-indigo-950 rounded-full py-[2px] px-2 text-center"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ProjectDetails;
