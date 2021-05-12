import Joi from 'joi'
import { isValidCPF } from '~/shared/utils/is-valid-cpf.helper'

export const EditProfileSchema = Joi.object({
	firstName: Joi.string().min(4).max(30).messages({
    'string.base': `should be a type of text`,
    'string.empty': `cannot be an empty field`,
    'string.min': `should have a minimum length of {#limit}`,
    'string.max': `should have a max length of {#limit}`,
    'any.required': `{#label} is a required field`,
  }),
  lastName: Joi.string().min(4).max(30).messages({
    'string.base': `should be a type of text`,
    'string.empty': `cannot be an empty field`,
    'string.min': `should have a minimum length of {#limit}`,
    'string.max': `should have a max length of {#limit}`,
    'any.required': `{#label} is a required field`,
  }),
	phone: Joi.string().min(11).max(12).messages({
    'string.base': `should be a type of text`,
    'string.empty': `cannot be an empty field`,
    'string.min': `should have a minimum length of {#limit}`,
    'string.max': `should have a max length of {#limit}`,
    'any.required': `{#label} is a required field`,
  }),
	email: Joi.string().email().messages({
		'string.base': `should be a type of 'text'`,
		'string.empty': `cannot be an empty field`,
		'string.email': `should provide a valid email address`,
		'any.required': `{#label} is a required field`,
	}),
  birthDate: Joi.date().raw(),
  cpf: Joi.string()
  .strict(true)
  .custom((value, helper) => {
    if (isValidCPF(value)) return true
    return helper.error('string.cpf')
  })
  .messages({
    'string.base': `should be a type of 'text'`,
    'string.empty': `cannot be an empty field`,
    'string.cpf': `should provide a valid cpf`,
  }),
})
