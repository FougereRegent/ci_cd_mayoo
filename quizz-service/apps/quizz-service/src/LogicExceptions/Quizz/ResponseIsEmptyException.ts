export default class ResponseIsEmptyException extends Error {
  constructor() {
    super("The response can't be empty");
  }
}
