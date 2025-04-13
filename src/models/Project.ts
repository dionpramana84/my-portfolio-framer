import GenericFields from "./GenericFields";
import { EMPLOYMENT_TYPE, ROLE_TYPE } from "@/components/constant";
import ImageCloud from "./ImageCloud";

export default interface Project extends GenericFields {
  name: string;
  role_type: ROLE_TYPE;
  employment_type: EMPLOYMENT_TYPE;
  description?: string | null;
  link_url: string | null;
  skills?: string[] | null;
  start_date?: Date | null;
  end_date?: Date | null;
  company_name?: string | null;
  images?: ImageCloud[] | null;
}
