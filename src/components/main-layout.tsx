export default function MainLayout({
  className,
  children,
}: {
  className?: string
  children: React.ReactNode;
}) {
  return (
    <div className={`h-full !max-w-[1320px] mx-auto ${className}`}>
      {children}
    </div>
  );
}
