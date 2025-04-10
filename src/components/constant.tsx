export const EMPLOYMENT_TYPES = [
  "Full-time",
  "Part-time",
  "Freelance",
  "Contract",
  "Internship",
  "Self Employed",
  "Apprenticeship",
  "Seasonal",
] as const;

export type EMPLOYMENT_TYPE = (typeof EMPLOYMENT_TYPES)[number];

export const ROLE_TYPES = ["Front-End Developer", "Mining Engineer"] as const;

export type ROLE_TYPE = (typeof ROLE_TYPES)[number];
