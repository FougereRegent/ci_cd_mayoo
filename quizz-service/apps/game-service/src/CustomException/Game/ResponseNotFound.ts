export default class ResponseNotFound extends Error {
  constructor(id: number) {
    super(`Id ${id} is not link to a response`);
  }
}
