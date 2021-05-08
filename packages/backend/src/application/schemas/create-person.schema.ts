import Joi from 'joi'
import { CredentialsSchema } from './credentials.schema'
import { isValidCPF } from '~/shared/utils/is-valid-cpf.helper'

export const CreatePersonSchema = Joi.object({
  firstName: Joi.string().min(4).max(30).required().messages({
    'string.base': `should be a type of text`,
    'string.empty': `cannot be an empty field`,
    'string.min': `should have a minimum length of {#limit}`,
    'string.max': `should have a max length of {#limit}`,
    'any.required': `{#label} is a required field`,
  }),
  lastName: Joi.string().min(4).max(30).required().messages({
    'string.base': `should be a type of text`,
    'string.empty': `cannot be an empty field`,
    'string.min': `should have a minimum length of {#limit}`,
    'string.max': `should have a max length of {#limit}`,
    'any.required': `{#label} is a required field`,
  }),
  credentials: CredentialsSchema,
  cpf: Joi.string()
    .strict(true)
    .custom((value, helper) => {
      if (isValidCPF(value)) return true
      return helper.error('string.cpf')
    })
    .required()
    .messages({
      'string.base': `should be a type of 'text'`,
      'string.empty': `cannot be an empty field`,
      'string.cpf': `should provide a valid cpf`,
    }),
  phone: Joi.string().min(11).max(12).required().messages({
    'string.base': `should be a type of text`,
    'string.empty': `cannot be an empty field`,
    'string.min': `should have a minimum length of {#limit}`,
    'string.max': `should have a max length of {#limit}`,
    'any.required': `{#label} is a required field`,
  }),
  birthDate: Joi.date().raw().required(),
  role: Joi.string().valid('teacher', 'coordinator', 'student'),
})
