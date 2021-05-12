import Joi from 'joi'

export const ChangePasswordSchema = Joi.object({
	password: Joi.string().min(8).required().messages({
		'string.base': `should be a type of 'text'`,
		'string.empty': `cannot be an empty field`,
		'string.min': `should have a minimum length of {#limit}`,
		'any.required': `{#label} is a required field`,
	}),
	confirmPassword: Joi.string().min(8).required().messages({
		'string.base': `should be a type of 'text'`,
		'string.empty': `cannot be an empty field`,
		'string.min': `should have a minimum length of {#limit}`,
		'any.required': `{#label} is a required field`,
	}),
	oldPassword: Joi.string().min(8).required().messages({
		'string.base': `should be a type of 'text'`,
		'string.empty': `cannot be an empty field`,
		'string.min': `should have a minimum length of {#limit}`,
		'any.required': `{#label} is a required field`,
	}),
})
