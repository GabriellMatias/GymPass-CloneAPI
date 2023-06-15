import { PrismaCheckInRepository } from '@/repositories/prisma/prisma-checkIns-repository'
import { PrismaGymsRepository } from '@/repositories/prisma/prisma-gyms-repository'
import { CheckInUseCase } from '../checkInUseCase'
/* Factories para criar os casos de uso, facilitar */
export function makeCheckInUseCase() {
  const checkInRepository = new PrismaCheckInRepository()
  const gymsRepository = new PrismaGymsRepository()
  const useCase = new CheckInUseCase(checkInRepository, gymsRepository)
  return useCase
}
