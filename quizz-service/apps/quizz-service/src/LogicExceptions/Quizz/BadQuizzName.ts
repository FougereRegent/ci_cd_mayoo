export default class BadQuizzName extends Error {
  constructor(name: string) {
    super(`Mauvais nom de quizz : ${name}`);
    this.name = "BadQuizzName";
  }
}
