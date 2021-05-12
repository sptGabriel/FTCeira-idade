export interface QuestionDTO {
	questionId: string
	answerNumeric?: number
	answerText?: string
}

export interface AnswerDTO {
	questionnaireId: string
	answers: QuestionDTO[]
} 