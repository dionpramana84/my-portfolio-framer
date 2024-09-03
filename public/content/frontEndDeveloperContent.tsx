import FrontEndDeveloperProject from "@/models/FrontEndDeveloperProject";

const projectsData: FrontEndDeveloperProject[] = [
  {
    id: "artchive-id",
    name: "Artchive.id",
    type: "Web Application",
    employment_type: "Contract",
    role: "Front-End Developer",
    description:
      "Driving innovation through Next.js, React, and Ant Design to build a top tier Online Art Gallery Platform. Delivering bespoke front-end solutions that elevate user experiences and business outcomes.",
    link: "https://artchive.id/",
    image_thumbnail: "/artchive-desktop-3.png",
    image_gif: "/artchive-desktop.gif",
    skills: ["Next.js", "Javascript", "SCSS", "Vercel", "Ant Design"],
    started_on: "2022-02-01T00:00:00+07:00",
    finished_on: null,
    images: [
      "/artchive-desktop-1.png",
      "/artchive-event-1.png",
      "/artchive-desktop-2.png",
      "/artchive-event-2.png",
      "/artchive-desktop-3.png",
      "/artchive-event-3.png",
      "/artchive-phone-1.png",
      "/artchive-desktop.gif",
      "/artchive-phone-2.png",
    ],
  },
  {
    id: "tarita",
    name: "Tarita Furniture",
    type: "Web Application",
    employment_type: "Contract",
    role: "Front-End Developer",
    description:
      "Crafting intuitive web dashboards to streamline client company management. Leveraging modern technologies like Next.js, React, TypeScript, and Ant Design to deliver user-friendly interfaces that empower efficient business operations.",
    link: null,
    image_thumbnail: "/tarita-desktop-2.png",
    image_gif: null,
    skills: ["Next.js", "Typescript", "Vercel", "Ant Design"],
    started_on: "2024-01-13T00:00:00+07:00",
    finished_on: null,
    images: [
      "/tarita-desktop-1.png",
      "/tarita-desktop-2.png",
      "/tarita-desktop-3.png",
    ],
  },
];

export default projectsData;
