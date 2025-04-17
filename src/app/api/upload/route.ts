import { uploadFile } from "@/lib/cloudinary/config";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const file = formData.get("file") as File;
  if (!file)
    return NextResponse.json({ error: "File not found" }, { status: 400 });

  try {
    const buffer = await Buffer.from(await file.arrayBuffer());
    const res = (await uploadFile(buffer, "mediaUploader")) as {
      public_id: string;
      secure_url: string;
      format: string;
    };

    return NextResponse.json(
      {
        public_id: res.public_id,
        url: res.secure_url,
        format: res.format,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to upload file" },
      { status: 500 }
    );
  }
}
