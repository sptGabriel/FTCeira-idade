export type StudentApplyInCourseDTO = {
  courseId: string
}
import Joi from 'joi'

export const StudentApplyInCourseSchema = Joi.object({
  classId: Joi.string().uuid().required().messages({
    'string.base': `should be a type of text`,
    'string.empty': `cannot be an empty field`,
    'string.uuid': `should have a valid uuid`,
    'any.required': `{#label} is a required field`,
  }),
})
