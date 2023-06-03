import joi from "joi";
import { MemberType } from "../enums/memberType";
import { Roles } from "../enums/roles";

export const registrationSchema = joi.object({
  last_name: joi.string().required(),
  first_name: joi.string().required(),
  email: joi.string().required(),
  phone: joi.string().required(),
  password: joi.string().required(),
  member_type: joi
    .string()
    .valid(MemberType.KVC_LOVER, MemberType.KVC_MEMBER)
    .required(),
});
export const loginSchema = joi.object({
  email: joi.string().required(),
  password: joi.string().required(),
});
