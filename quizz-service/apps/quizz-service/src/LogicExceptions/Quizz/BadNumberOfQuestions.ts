export default class BadNumberOfQuestions extends Error {
  constructor(nb_questions: number, required_nb_questions: number) {
    super(`Nombre de questions ${nb_questions}. Nombre de questions requis : ${required_nb_questions}`);
    this.name = "BadNumberOfQuestions";
  }
}
