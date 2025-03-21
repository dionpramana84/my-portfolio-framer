import GenericFields from "./GenericFields";

export default interface UserProfile extends GenericFields {
  user_id: string;

  name: string | null;
  headline: string | null;

  country: string | null;
  city: string | null;

  contact: string | null;
}
