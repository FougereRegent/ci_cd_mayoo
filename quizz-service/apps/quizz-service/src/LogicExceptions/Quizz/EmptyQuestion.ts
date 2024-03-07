export default class EmptyQuestion extends Error {
  constructor() {
    super("Pas de question dans le quizz");
    this.name = "EmptyQuestion";
  }
}
