export default interface Experience {
  id: string;
  name: string;
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
  description: TrustedHTML;
  skills: string[];
  image_thumbnail?: string;
  images?: string[];
}
