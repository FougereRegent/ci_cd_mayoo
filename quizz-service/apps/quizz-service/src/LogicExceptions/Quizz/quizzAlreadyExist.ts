export default class QuizzAlreadyExist extends Error {
  constructor(name: string) {
    const err: string = `Le quizz ${name} exist déjà`
    super(err);
    this.name = "QuizzAlreadyExist";
  }
}
