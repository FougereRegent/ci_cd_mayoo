export default class NumberOfResponseException extends Error {
  constructor(given_response: number, required_response: number) {
    super(`The number of given response is ${given_response} and the required response is ${required_response}`);
  }
}
