import { deleteFile } from "@/lib/cloudinary/config";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { public_id } = await req.json();
  try {
    const { result } = await deleteFile(public_id);
    return NextResponse.json({ result }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to upload file" },
      { status: 500 }
    );
  }
}
