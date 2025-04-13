"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function Page() {
  const { id } = useParams();
  return (
    <div className="my-[84px]">
      <h1>Welcome to download content</h1>
      <Link target="_blank" href={`/test/${id}/pdf`}>
        <Button>Download Content</Button>
      </Link>
    </div>
  );
}
