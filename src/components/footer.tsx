import MainLayout from "./main-layout";
import dayjs from "dayjs";

export default function Footer() {
  return (
    <>
      <footer className="w-full py-[32px]">
        <MainLayout>
          <div className="flex justify-center">
            <p className="text-sm font-thin">
              Created by <span className="font-bold">Dion Pramana</span> |{" "}
              {dayjs().format("YYYY")}
            </p>
          </div>
        </MainLayout>
      </footer>
    </>
  );
}
