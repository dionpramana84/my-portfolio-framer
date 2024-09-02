export default interface Experience {
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
}
