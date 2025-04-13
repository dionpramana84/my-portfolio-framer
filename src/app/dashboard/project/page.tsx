"use client";

import { DataTable } from "@/components/ui/data-table";
import useProjects from "@/hooks/firebase/project";
import { getColumns } from "./column";
import ContentHeader from "@/components/content-header";

import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import Loader from "@/components/loader";

export default function Page() {
  const router = useRouter();

  const { projects, loading, onDelete } = useProjects({});
  const columns = getColumns({
    updateCallback: (value) => {
      router.push(`/dashboard/project/${value.id}`);
    },
    deleteCallback: async (id: string) => {
      onDelete(id);
    },
  });

  return (
    <>
      <ContentHeader title="Projects">
        <Button
          size="sm"
          onClick={() => router.push("/dashboard/project/create")}
        >
          <PlusIcon className="h-4 w-4 mr-2" />
          Create
        </Button>
      </ContentHeader>
      {!loading && projects ? (
        <DataTable columns={columns} data={projects} />
      ) : (
        <Loader />
      )}
    </>
  );
}
