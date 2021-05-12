import Joi from 'joi'
import { CredentialsSchema } from './credentials.schema'
import { isValidCPF } from '~/shared/utils/is-valid-cpf.helper'

export const CreateQuestionnaireSchema = Joi.object({
  name: Joi.string().min(4).max(30).required().messages({
    'string.base': `should be a type of text`,
    'string.empty': `cannot be an empty field`,
    'string.min': `should have a minimum length of {#limit}`,
    'string.max': `should have a max length of {#limit}`,
    'any.required': `{#label} is a required field`,
  }),
  questioning: Joi.string().min(4).required().messages({
    'string.base': `should be a type of text`,
    'string.empty': `cannot be an empty field`,
    'string.min': `should have a minimum length of {#limit}`,
    'any.required': `{#label} is a required field`,
  }),
  courseId: Joi.string().uuid().required().messages({
    'string.base': `should be a type of text`,
    'string.empty': `cannot be an empty field`,
    'string.uuid': `should have a valid uuid`,
    'any.required': `{#label} is a required field`,
  }),
  alternatives: Joi.array().max(5).items(
    Joi.object({
      alternative: Joi.string().min(4).max(30).required().messages({
        'string.base': `should be a type of text`,
        'string.empty': `cannot be an empty field`,
        'string.min': `should have a minimum length of {#limit}`,
        'string.max': `should have a max length of {#limit}`,
        'any.required': `{#label} is a required field`,
      }),
      answer: Joi.boolean().required(),
    }),
  ),
  startDate: Joi.date().raw().required(),
  endDate: Joi.date().raw().required(),
  value: Joi.number().required().messages({
    'any.required': `{#label} is a required field`,
  }),
})
