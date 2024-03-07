export default class NumberOfGoodResponseException extends Error {
  constructor() {
    super("There are so many good response.");
  }
}
