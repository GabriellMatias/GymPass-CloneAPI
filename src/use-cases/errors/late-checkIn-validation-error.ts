export class LateCheckInValidationError extends Error {
  constructor() {
    super(' ⚠️ Check in can only validate after 20 minutes of its creation')
  }
}
