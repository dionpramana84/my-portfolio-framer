import { cn } from "@/lib/utils";

export default function MainLayout({
  children,
  style,
  className,
}: {
  children: React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
}) {
  return (
    <section className="h-full">
      <div
        className={`h-full !max-w-[1366px] md:!max-w-[calc(100%-32px)] mx-auto my-[16px] ${className}`}
        style={style}
      >
        {children}
      </div>
    </section>
  );
}
