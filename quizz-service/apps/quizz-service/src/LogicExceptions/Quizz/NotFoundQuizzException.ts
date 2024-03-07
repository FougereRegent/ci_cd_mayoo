export default class NotFoundQuizzException extends Error {
  constructor() {
    super("Quizz not found");
  }
}
