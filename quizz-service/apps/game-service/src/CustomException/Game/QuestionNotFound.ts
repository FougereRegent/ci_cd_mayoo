export class QuestionNotFoundException extends Error {
  constructor(quizz_id: number) {
    super(`Next question not found in this quizz : ${quizz_id}`);
  }
}
