export class GameNotFoundException extends Error {
  constructor(guid: string) {
    super(`Game "${guid}" not found. Create a game please`);
  }
}
