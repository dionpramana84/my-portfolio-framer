"use client";

import ProjectForm from "@/components/(dashboard)/(form)/project-form";
import ContentHeader from "@/components/content-header";
import { useParams } from "next/navigation";

export default function Page() {
  const params = useParams();
  const id = Array.isArray(params.id) ? params.id[0] : params.id;
  return (
    <>
      <ContentHeader title="Update Project" />
      <ProjectForm selectedProjectId={id} />
    </>
  );
}
