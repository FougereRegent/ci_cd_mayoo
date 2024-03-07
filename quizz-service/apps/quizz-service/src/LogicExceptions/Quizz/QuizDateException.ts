export class QuizDateException extends Error {
  constructor() {
    super("The start date is upper than end date");
  }
}
