import MainLayout from "./main-layout";
import { Card, CardHeader, CardTitle, CardFooter } from "./ui/card";
import { Drawer, DrawerContent, DrawerTrigger } from "./ui/drawer";

export default function ExperienceDrawerComponent({
  title,
  employment_type,
  place,
  started_on,
  finished_on,
  description,
  skill,
}: {
  title: string;
  employment_type:
    | "Full-time"
    | "Part-time"
    | "Freelance"
    | "Contract"
    | "Internship"
    | "Self Employed"
    | "Apprenticeship"
    | "Seasonal";
  place: string;
  started_on: string;
  finished_on: string;
  description: React.ReactNode;
  skill: string;
}) {
  // Helper function to convert text to list
  const renderDescription = (text: string) => {
    return text.split("\n").map((line, index) => {
      const trimmedLine = line.trim();
      // Check if the line is a list item (starts with a number or dash)
      const isListItem = /^\d+\.|^-\s/.test(trimmedLine);
      return (
        <p key={index} className={isListItem ? "ml-4" : ""}>
          {trimmedLine}
        </p>
      );
    });
  };

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Card className="hover:cursor-pointer hover:scale-[101%] transition duration-300 ease-in-out">
          <CardHeader>
            <CardTitle>{title}</CardTitle>
          </CardHeader>

          <CardFooter className="flex justify-between text-sm leading-none text-muted-foreground">
            <span>
              {employment_type} | {place}
            </span>
            {started_on} - {finished_on}
          </CardFooter>
        </Card>
      </DrawerTrigger>
      <DrawerContent className="min-h-[50vh]">
        <MainLayout>
          <div className="w-[50%] mx-auto my-[32px] flex flex-col justify-center">
            <h1 className="text-4xl font-black">{title}</h1>
            <div>
              <span className="!font-black">{employment_type}</span> {place}
            </div>
            <div>
              {started_on} - {finished_on}
            </div>
            <div className="mt-[16px]">
              {typeof description === "string"
                ? renderDescription(description)
                : description}
            </div>
            <div className="mt-[16px]">Skills: {skill}</div>
          </div>
        </MainLayout>
      </DrawerContent>
    </Drawer>
  );
}
