"use client";

import { useState } from "react";
import ProjectCard from "./projectCard";
import ProjectDetails from "./projectDetails";
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

function Projects() {
  const [selectedProject, setSelectedProject] = useState<number>(0);

  return (
    <>
      <div className="sticky -top-16 z-30 font-bold text-xl mt-8 w-full backdrop-filter backdrop-blur-lg bg-opacity-30">
        <h2>Projects</h2>
        <div className="flex overflow-x-scroll sm:scrollbar-hide">
          {pros.map((project: Project, index) => (
            <div
              key={project.id}
              className="flex-none"
              onClick={() => setSelectedProject(index)}
              role="button"
              tabIndex={0}
              aria-label={`Select project ${project.Title}`}
            >
              <ProjectCard
                title={project.Title}
                description={project.description}
                thumbnail={project.thambnail}
              />
            </div>
          ))}
        </div>
      </div>

      <ProjectDetails project={selectedProject} />
    </>
  );
}

export default Projects;
