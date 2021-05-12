import Joi from 'joi'

export const CreateClassSchema = Joi.object({
  cod: Joi.string().min(4).max(20).required().messages({
    'string.base': `should be a type of text`,
    'string.empty': `cannot be an empty field`,
    'string.min': `should have a minimum length of {#limit}`,
    'string.max': `should have a max length of {#limit}`,
    'any.required': `{#label} is a required field`,
  }),
  max: Joi.number().required().messages({
    'any.required': `{#label} is a required field`,
  }),
  courseId: Joi.string().uuid().required().messages({
    'string.base': `should be a type of text`,
    'string.empty': `cannot be an empty field`,
    'string.uuid': `should have a valid uuid`,
    'any.required': `{#label} is a required field`,
  }),
  startDate: Joi.date().raw().required(),
  endDate: Joi.date().raw().required(),
  shift: Joi.string().valid('matutino', 'vespertino').required(),
})
