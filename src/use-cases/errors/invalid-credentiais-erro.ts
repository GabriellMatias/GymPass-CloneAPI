export class InvalidCredentiasError extends Error {
  constructor() {
    super(' ⚠️ Password or user incorrect')
  }
}
