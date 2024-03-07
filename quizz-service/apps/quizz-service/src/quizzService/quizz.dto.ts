import { QuestionDTO, QuizzDTO, ResponsesDTO } from '@app/common'
import { ApiProperty } from '@nestjs/swagger'
import { IsDateString, IsNotEmpty } from 'class-validator'

export class CreateQuizzDTO {
  @IsNotEmpty()
  @ApiProperty({ required: true })
  name: string

  @IsNotEmpty()
  @ApiProperty({ required: true })
  description: string

  @IsNotEmpty()
  @ApiProperty({ required: true, type: () => Date })
  @IsDateString()
  start_date: Date

  @IsNotEmpty()
  @ApiProperty({ required: true, type: () => Date })
  @IsDateString()
  end_date: Date

  @ApiProperty({ type: () => CreateQuestionsDTO })
  questions: CreateQuestionsDTO[]
}

export class CreateQuestionsDTO {
  @IsNotEmpty()
  @ApiProperty({ required: true })
  question: string

  @ApiProperty({ required: true, type: () => CreateResponseDTO })
  responses: CreateResponseDTO[]
}

export class CreateResponseDTO {
  @ApiProperty({ required: true })
  @IsNotEmpty()
  response: string

  @ApiProperty({ required: true })
  good_response: boolean
}

export class SimpleQuizzDTO {
  @ApiProperty()
  id: number
  @ApiProperty()
  name: string
  @ApiProperty()
  description: string
  @ApiProperty({ type: () => Date })
  start_date: Date
  @ApiProperty({ type: () => Date })
  end_date: Date
}

export function quizzToSimpleQuizzDTO(quizz: any): SimpleQuizzDTO {
  return {
    id: quizz.id,
    name: quizz.quizzName,
    description: quizz.description,
    start_date: quizz.start_date,
    end_date: quizz.end_date
  };
}

export function quizzToQuizzDTO(quizz: any): QuizzDTO {
  let questions: QuestionDTO[] = new Array<QuestionDTO>()

  quizz.questions.forEach(element => {
    questions.push(questionsToQuestionDTO(element))
  });

  let result: QuizzDTO = {
    id: quizz.id,
    name: quizz.quizzName,
    description: quizz.description,
    start_date: quizz.start_date,
    end_date: quizz.end_date,
    questions: questions
  };

  return result;
}

function questionsToQuestionDTO(questions: any): QuestionDTO {
  let result_responses: ResponsesDTO[] = new Array<ResponsesDTO>();

  questions.responses.forEach(element => {
    result_responses.push(responseToResponsesDTO(element))
  });

  let result: QuestionDTO = {
    id: questions.id,
    question: questions.questions,
    responses: result_responses,
  };

  return result;
}

function responseToResponsesDTO(response: any): ResponsesDTO {
  let result: ResponsesDTO = {
    id: response.id,
    response: response.response,
    good_response: response.good_response
  };
  return result;
}
