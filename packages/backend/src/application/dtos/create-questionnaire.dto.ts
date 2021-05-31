export interface IAlternative {
  answer: boolean
  alternative: string
}

export interface IQuestion {
  alternatives: IAlternative[]
  questioning: string
  image?: string
}

export type CreateQuestionnaireDTO = {
	name: string
  description: string
	courseId: string
  questions: IQuestion[]
  startDate: Date
  endDate: Date
  value: number
}
