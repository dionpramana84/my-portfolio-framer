export default function PageBanner({
  children,
  height = "50vh",
}: {
  children: React.ReactNode;
  height?: string;
}) {
  return (
    <div
      style={{
        background:
          "linear-gradient(0deg, rgb(8 8 8 ) 0%, rgb(10 10 10 / 50%) 79.48%)",
      }}
      className={`flex h-[${height}] justify-between`}
    >
      {children}
    </div>
  );
}
