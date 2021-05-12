import Joi from 'joi'

export const CreateCourseSchema = Joi.object({
  name: Joi.string().min(4).max(20).required().messages({
    'string.base': `should be a type of text`,
    'string.empty': `cannot be an empty field`,
    'string.min': `should have a minimum length of {#limit}`,
    'string.max': `should have a max length of {#limit}`,
    'any.required': `{#label} is a required field`,
  }),
  description: Joi.string().min(10).max(250).required().messages({
    'string.base': `should be a type of text`,
    'string.empty': `cannot be an empty field`,
    'string.min': `should have a minimum length of {#limit}`,
    'string.max': `should have a max length of {#limit}`,
    'any.required': `{#label} is a required field`,
  }),
	tittle: Joi.string().min(4).max(20).required().messages({
    'string.base': `should be a type of text`,
    'string.empty': `cannot be an empty field`,
    'string.min': `should have a minimum length of {#limit}`,
    'string.max': `should have a max length of {#limit}`,
    'any.required': `{#label} is a required field`,
  }),
  iesCourse: Joi.string().valid('sistemas', 'administração', 'direito').required(),
})
