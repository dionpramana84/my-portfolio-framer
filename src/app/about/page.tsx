import MainLayout from "@/components/main-layout";
import Image from "next/image";
export default function About() {
  const shortBio = `Hello, I'm I Gede Dion Pramana Utama, a Mine Planning enthusiast with a passion for excellence in the mining industry. My academic journey began with a Bachelor's degree from Pembangunan Nasional "Veteran" University (UPN) of Yogyakarta, and I am currently advancing my expertise by pursuing a Master's degree at the Bandung Institute of Technology (ITB), specializing in Mining Economics of Coal and Minerals. My journey in the field has been marked by a proven track record, showcasing my ability to swiftly adapt and excel in various mining projects. My commitment to teamwork and my relentless drive to succeed are the cornerstones of my professional ethos.`;

  return (
    <>
      <MainLayout>
        <div className="h-[calc(100vh-84px)] pt-[104px] w-full flex justify-center items-center">
          <div className="w-1/2">
            <h1 className="text-center text-3xl font-bold">About Me</h1>
            <br />
            <p className="text-center">{shortBio}</p>
          </div>
        </div>
      </MainLayout>
    </>
  );
}
