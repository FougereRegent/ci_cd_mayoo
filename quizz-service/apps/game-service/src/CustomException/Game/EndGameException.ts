export default class EndGameException extends Error {
  constructor() {
    super("The game is finished, you can't submit another response");
  }
}
