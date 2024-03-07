import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, Min } from 'class-validator'
import { ResponsesDTO } from '@app/common';

export type GameMetaData = {
  name: string;
  quizz_id: number;
  answered_question: number;
  next_question_index: number;
  nb_good_response: number;
}

export class StartGameDTO {
  @IsNotEmpty({
    message: "This field cannot be empty"
  })
  @ApiProperty({
    required: true,
    type: String
  })
  public user_name: string;

  @Min(0)
  @IsNotEmpty({
    message: "This field cannot be empty"
  })
  @ApiProperty({
    required: true,
    type: Number
  })
  public id_quizz: number;
}

export class GameQuestionDTO {
  @ApiProperty({
    description: "Question",
    type: String
  })
  question: string
  @ApiProperty({
    description: "Response of the questions the maximum array size is 4 and the min is 2",
    type: Array<string>
  })
  response: GameResponseDTO[]
}

export class GameResponseDTO {
  @ApiProperty({
    description: "Response id",
    type: Number
  })
  id: number
  @ApiProperty({
    description: "Response",
    type: String
  })
  response: string
}

export class ResponseStartGameDTO {
  @ApiProperty({
    description: "Identifiant d'un jeu",
    type: String
  })
  public guid: string;
}

export class AnserwedQuestionDTO {
  @ApiProperty({
    type: String,
    name: "guid",
    required: true
  })
  @IsNotEmpty({
    message: "This field cannot be empty"
  })
  guid: string;

  @ApiProperty({
    type: Array<number>,
    name: "id_response",
    maxItems: 4,
    minItems: 4,
    required: true
  })
  @IsNotEmpty({
    message: "This field cannot be empty"
  })
  id_response: Array<number>;
}

export class StateResponseDTO {
  @ApiProperty({
    name: "state",
    description: "State of answered question",
    type: Boolean
  })
  state: boolean;

  @ApiProperty({
    name: "id_good_response",
    type: Array<Number>,
    minItems: 1,
    maxItems: 4
  })
  id_good_response: Array<number>;

  @ApiProperty({
    name: "end_game",
    description: "It allows us to know if a game is finished or not",
    type: Boolean
  })
  end_game: boolean;
}

export class QuizzResult {
  @ApiProperty({
    name: "nb_response",
    description: "",
    type: Number
  })
  nb_response: number;
  @ApiProperty({
    name: "nb_good_response",
    description: "",
    type: Number
  })
  nb_good_response: number;
}

export function ResponsesDTOtoGameResponseDTO(val: ResponsesDTO): GameResponseDTO {
  return {
    id: val.id,
    response: val.response
  };
}
