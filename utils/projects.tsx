import { DummyContent } from "@/app/portfolios/development/page";
import Kaduk from "@/components/projects/Kaduk";
import Mahalli from "@/components/projects/Mahalli";
import Milandates from "@/components/projects/Milandates";

export const projects = [
    {
        title: "Kaduk Restaurant",
        category: "Business launch kit",
        src: "/images/projects/kaduk/kaduk.png",
        content: <Kaduk />
    },
    {
        title: "Milandates",
        category: "Business launch kit",
        src: "/images/projects/milandates/milandates.jpg",
        content: <Milandates />,
    },
    {
        title: "Mahall Management Software",
        category: "Website and Software",
        src: "/images/projects/mahalli/mahalli.jpg",
        content: <Mahalli />,
    },
    // {
    //     category: "Product",
    //     title: "Maps for your iPhone 15 Pro Max.",
    //     src: "https://images.unsplash.com/photo-1599202860130-f600f4948364?q=80&w=2515&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    //     content: <Kaduk />,
    // },
    // {
    //     category: "iOS",
    //     title: "Photography just got better.",
    //     src: "https://images.unsplash.com/photo-1602081957921-9137a5d6eaee?q=80&w=2793&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    //     content: <Kaduk />,
    // },
    // {
    //     category: "Hiring",
    //     title: "Hiring for a Staff Software Engineer",
    //     src: "https://images.unsplash.com/photo-1511984804822-e16ba72f5848?q=80&w=2048&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    //     content: <Kaduk />,
    // },
    // {
    //     category: "Development",
    //     title: "Building the Future.",
    //     src: "https://images.unsplash.com/photo-1555099962-4199c345e5dd?q=80&w=2940&auto=format&fit=crop",
    //     content: <Kaduk />,
    // },
    // {
    //     category: "Abstract",
    //     title: "Creative Solutions.",
    //     src: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2940&auto=format&fit=crop",
    //     content: <Kaduk />,
    // },
];