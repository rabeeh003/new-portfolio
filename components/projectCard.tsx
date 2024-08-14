import { Image } from "@nextui-org/image";
import { Snippet } from "@nextui-org/snippet";

interface ProjectCardProps {
  title: string;
  description: string;
  thumbnail?: string; // Optional prop
}

function ProjectCard({ title, description, thumbnail }: ProjectCardProps) {
  return (
    <Snippet
      hideCopyButton
      hideSymbol
      variant="bordered"
      className="flex-none cursor-pointer p-1 my-3 mr-3 rounded-lg w-[210px] md:w-[250px] max-h-[200px]"
    >
      <div className="p-2 grid">
        <Image
          width={1000}
          height={1000}
          className="w-[210px] md:w-[239px] max-h-[130px] rounded-b-none rounded-t-md object-cover"
          alt="Project thumbnail"
          src={
            thumbnail ||
            "https://app.requestly.io/delay/5000/https://nextui-docs-v2.vercel.app/images/hero-card-complete.jpeg"
          }
        />
        <h3 className="text-medium mt-2">{title}</h3>
        <p className="text-xs font-extralight truncate overflow-hidden max-w-full">
          {description}
        </p>
      </div>
    </Snippet>
  );
}

export default ProjectCard;
