export class QuizzNotFoundException extends Error {
  constructor(id_quizz: number) {
    super(`${id_quizz} not found`);
  }
}
