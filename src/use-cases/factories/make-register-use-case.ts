import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { RegisterUseCase } from '../register-usecase'

export function makeRegisterUseCase() {
  const prismaUserRepository = new PrismaUsersRepository()
  const useCase = new RegisterUseCase(prismaUserRepository)
  return useCase
}
