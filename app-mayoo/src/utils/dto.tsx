export type QuizzNewsDTO = {
  id: number
  name: string
  description: string
};

export type StartGameDTO = {
  user_name: string
  id_quizz: number
};

export type QuestionDTO = {
  id: number
  question: string
  response: Array<ResponseDTO>
};

export type ResponseDTO = {
  id: number
  response: string
};

export type ResponseStartGameDTO = {
  guid: string
};

export type AnsweredQuestion = {
  guid: string
  id_response: string[]
};

export type StateResponseDTO = {
  state: boolean
  id_good_response: Array<string>
  end_game: boolean
};
