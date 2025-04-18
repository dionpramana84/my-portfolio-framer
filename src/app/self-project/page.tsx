import Link from "next/link";

export default function Page() {
  const selfProject = [
    {
      name: "Photobooth",
      url: "/photobooth",
    },
  ];

  return (
    <div className="min-h-[calc(100vh-84px)] pt-[104px]">
      <p>Self Project Page</p>
      <div>
        {selfProject.map((project) => (
          <div key={project.name}>
            <Link href={`/self-project/${project.url}`}>{project.name}</Link>
          </div>
        ))}
      </div>
    </div>
  );
}
