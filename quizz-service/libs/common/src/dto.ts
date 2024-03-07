import { ApiProperty } from '@nestjs/swagger'

export class QueueResultQuizz {
  quizz_id: number;
  name: string;
  responses: Array<QueueResultResponse>
};

export class QueueResultResponse {
  question_id: number;
  responses: Array<number>;
};

export class ResponsesDTO {
  @ApiProperty()
  id: number
  @ApiProperty()
  response: string
  @ApiProperty()
  good_response: boolean
};

export class QuestionDTO {
  @ApiProperty()
  id: number
  @ApiProperty()
  question: string
  @ApiProperty({ type: ResponsesDTO[4] })
  responses: ResponsesDTO[]
};

export class QuizzDTO {
  @ApiProperty()
  id: number
  @ApiProperty()
  name: string
  @ApiProperty()
  description: string
  @ApiProperty({ type: Date })
  start_date: Date
  @ApiProperty({ type: Date })
  end_date: Date
  @ApiProperty({ type: QuestionDTO[12] })
  questions: QuestionDTO[]
};
