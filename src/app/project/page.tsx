import MainLayout from '@/components/main-layout';
import Image from "next/image";
import { getProjects } from '@/lib/getProjects'
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Tabs, TabsContent, TabsList, TabsTrigger
} from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { Badge } from '@/components/ui/badge';

export default async function ProjectsPage() {
  const shortBio = `Hello, I'm I Gede Dion Pramana Utama, a Mine Planning enthusiast with a passion for excellence in the mining industry. My academic journey began with a Bachelor's degree from Pembangunan Nasional "Veteran" University (UPN) of Yogyakarta, and I am currently advancing my expertise by pursuing a Master's degree at the Bandung Institute of Technology (ITB), specializing in Mining Economics of Coal and Minerals. My journey in the field has been marked by a proven track record, showcasing my ability to swiftly adapt and excel in various mining projects. My commitment to teamwork and my relentless drive to succeed are the cornerstones of my professional ethos.`;

  const projects = await getProjects()

  return (
    <div className="pt-[104px] px-8">
      <MainLayout>
        <div className="grid grid-cols-5 gap-8 h-full">
          <div className="flex flex-col col-span-2 gap-4">
            <h1 className='font-bold'>Dion Pramana</h1>
            <h2>Full Stack Developer</h2>
            <h3>Bali, Indonesia</h3>
          </div>
          <div className="col-span-3 pl-8">
            <h2 className="text-xl font-semibold mb-4">About Me</h2>
            <p className="text-justify">{shortBio}</p>
            <Separator className='my-4' />
            <Tabs defaultValue="experiences" className="w-full">
              <TabsList className="w-full">
                <TabsTrigger className="w-full" value="experiences">Experiences</TabsTrigger>
                <TabsTrigger className="w-full" value="projects">Projects</TabsTrigger>
              </TabsList>
              <TabsContent className='py-4' value="experiences">
                <h3 className='font-bold'>Experiences</h3>
                <Separator className='my-4' />
                <div className="flex flex-col gap-4">
                  {[...Array(20)].map((_, i) => (
                    <Card key={i} className="w-full p-0">
                      <div className="flex items-stretch">
                        <div className="flex-1 py-4">
                          <CardHeader>
                            <CardAction>February 2022 - Present</CardAction>
                            <CardTitle>Full Stack Developer</CardTitle>
                            <CardDescription>
                              Freelance | Catalyst Inertia
                            </CardDescription>
                            <p className='text-sm mt-2 text-justify'>
                              Develop a web application for Catatia to manage their projects and tasks. Develop a web application for Catatia to manage their projects and tasks. Develop a web application for Catatia to manage their projects and tasks.
                            </p>
                          </CardHeader>

                          <CardContent className='pt-4'>
                            <div className="flex w-full flex-wrap gap-2">
                              <Badge>Badge</Badge>
                              <Badge>Badge</Badge>
                              <Badge>Badge</Badge>
                              <Badge>Badge</Badge>
                              <Badge>Badge</Badge>
                            </div>
                          </CardContent>
                        </div>
                      </div>


                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent className='py-4' value="projects">
                <h3 className='font-bold'>Projects</h3>
                <Separator className='my-4' />
                <div className="flex flex-col gap-4">
                  {[...Array(5)].map((_, i) => (
                    <Card key={i} className="w-full p-0">
                      <div className="flex items-stretch">
                        <div className="relative w-[100px] self-stretch overflow-hidden">
                          <Image
                            src="/web-dev.webp"
                            alt="Logo"
                            fill
                            className="object-cover"
                            priority
                          />

                          <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent to-background" />
                        </div>

                        <div className="flex-1 py-4">
                          <CardHeader>
                            <CardTitle>Full Stack Developer at Catatia</CardTitle>
                            <CardDescription>
                              Develop a web application for Catatia to manage their projects and tasks.
                            </CardDescription>
                          </CardHeader>

                          <CardContent className='pt-4'>
                            <div className="flex w-full flex-wrap gap-2">
                              <Badge>Badge</Badge>
                              <Badge>Badge</Badge>
                              <Badge>Badge</Badge>
                              <Badge>Badge</Badge>
                              <Badge>Badge</Badge>
                            </div>
                          </CardContent>
                        </div>
                      </div>


                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </MainLayout>
    </div>
  )
}
