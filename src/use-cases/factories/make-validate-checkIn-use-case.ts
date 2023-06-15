import { PrismaCheckInRepository } from '@/repositories/prisma/prisma-checkIns-repository'
import { ValidateCheckInUseCase } from '../validate-checkInUseCase'
/* Factories para criar os casos de uso, facilitar */
export function makeValidateUserCheckInUseCase() {
  const checkInRepository = new PrismaCheckInRepository()
  const useCase = new ValidateCheckInUseCase(checkInRepository)
  return useCase
}
