import GenericFields from "./GenericFields";

export default interface UserProfile extends GenericFields {
  name: string | null;
  headline: string | null;

  country: string | null;
  city: string | null;

  contact: string | null;
}
