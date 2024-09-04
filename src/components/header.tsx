import HeaderContent from "./header-content";
import MainLayout from "./main-layout";

export default function Header() {
  return (
    <div className="absolute w-full z-9999 top-0 my-[32px]">
      <MainLayout>
        <HeaderContent />
      </MainLayout>
    </div>
  );
}
