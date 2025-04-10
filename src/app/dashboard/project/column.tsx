"use client";

import ActionColumn from "@/components/action-column";
import FrontEndDeveloperProject from "@/models/Project";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import Image from "next/image";

export const getColumns = ({
  updateCallback,
  deleteCallback,
}: {
  updateCallback: (value: FrontEndDeveloperProject) => void; // eslint-disable-line no-unused-vars
  deleteCallback: (id: string) => void; // eslint-disable-line no-unused-vars
}) => {
  const columns: ColumnDef<FrontEndDeveloperProject>[] = [
    {
      id: "#",
      header: "#",
      cell: ({ row }) => {
        const index = row.index;
        return index + 1;
      },
    },
    {
      accessorKey: "name",
      header: "Name",
    },
    {
      accessorKey: "role_type",
      header: "Type",
    },
    {
      id: "start_date",
      header: "Start Date",
      cell: ({ row }) => {
        const record = row.original;
        return record.start_date ? format(record.start_date, "PPP") : "";
      },
    },
    {
      id: "end_date",
      header: "End Date",
      cell: ({ row }) => {
        const record = row.original;
        return record.end_date ? format(record.end_date, "PPP") : "Now";
      },
    },
    {
      id: "thumbnail_url",
      header: "Thumbnail",
      cell: ({ row }) => {
        const record = row.original;
        return (
          record.thumbnail_url && (
            <Image
              src={record.thumbnail_url.url ?? ""}
              alt="Thumbnail"
              width={50}
              height={50}
            />
          )
        );
      },
    },
    {
      id: "actions",
      header: "Action",
      enableHiding: false,
      cell: ({ row }) => {
        const record = row.original;
        return (
          <ActionColumn
            record={record}
            updateCallback={updateCallback}
            deleteCallback={deleteCallback}
          />
        );
      },
    },
  ];

  return columns;
};
