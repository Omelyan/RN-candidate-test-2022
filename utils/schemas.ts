import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

export const resolver = yupResolver;

export const emailSchema = yup.string().email('Please, provide a\xa0valid e-mail');

export const passwordSchema = yup
  //
  .string();

export const nameSchema = yup
  //
  .string()
  .trim()
  .min(2, 'Please, enter the\xa0name')
  .optional()
  .transform(value => value || undefined);

export const skypeSchema = yup
  //
  .string()
  .trim()
  .min(3, 'Please, enter your\xa0Skype login')
  .optional()
  .transform(value => value || undefined);

export const signUpSchema = yup.object({
  name: nameSchema,
  email: emailSchema.required('Please, enter your\xa0e-mail'),
  password: passwordSchema.required('Password is\xa0required'),
});

export type SignUpSchema = yup.TypeOf<typeof signUpSchema>;

export const signInSchema = yup.object({
  email: emailSchema.required('Please, enter your\xa0e-mail'),
  password: passwordSchema.required('Password is\xa0required'),
});

export type SignInSchema = yup.TypeOf<typeof signInSchema>;

export const profileSchema = yup.object({
  email: emailSchema,
  password: passwordSchema,
  name: nameSchema.nullable(),
  skypeName: skypeSchema.nullable(),
  avatarURI: yup.string().nullable().optional(),
  description: yup.string().nullable().optional(),
  phoneNumber: yup.string().nullable().optional(),
  id: yup.number() as yup.NumberSchema<number>,
});

export type ProfileSchema = yup.TypeOf<typeof profileSchema>;
