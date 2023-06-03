import { MemberType } from "../enums/memberType";

export interface registrationInterface {
  last_name: string;
  first_name: string;
  email: string;
  phone: string;
  member_type: MemberType;
}
