import { cn } from "@/lib/utils";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-full !max-w-[1366px] md:!max-w-[calc(100%-32px)] mx-[32px]">
      {children}
    </div>
  );
}
