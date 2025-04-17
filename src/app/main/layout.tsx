import StickyCursor from "@/components/sticky-cursor";
import Template from "./template";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Template>
      <main>
        <StickyCursor />
        {children}
      </main>
    </Template>
  );
}
