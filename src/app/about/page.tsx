import MainLayout from "@/components/main-layout";

export default function About() {
  const shortBio = `Hello, I'm I Gede Dion Pramana Utama, a Mine Planning enthusiast with a passion for excellence in the mining industry. My academic journey began with a Bachelor's degree from Pembangunan Nasional "Veteran" University (UPN) of Yogyakarta, and I am currently advancing my expertise by pursuing a Master's degree at the Bandung Institute of Technology (ITB), specializing in Mining Economics of Coal and Minerals. My journey in the field has been marked by a proven track record, showcasing my ability to swiftly adapt and excel in various mining projects. My commitment to teamwork and my relentless drive to succeed are the cornerstones of my professional ethos.`;

  return (
    <>
      <MainLayout>
        <div className="h-[50vh] w-full flex justify-center items-center">
          <p className="w-1/2 text-center">{shortBio}</p>
        </div>
      </MainLayout>
    </>
  );
}
