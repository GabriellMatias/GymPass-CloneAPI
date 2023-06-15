import { PrismaGymsRepository } from '@/repositories/prisma/prisma-gyms-repository'

import { CreateGymUseCase } from '../createGymUseCase'
/* Factories para criar os casos de uso, facilitar */
export function makeCreateGymsUseCase() {
  const checkInRepository = new PrismaGymsRepository()
  const useCase = new CreateGymUseCase(checkInRepository)
  return useCase
}
