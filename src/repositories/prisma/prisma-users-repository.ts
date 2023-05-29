import { prisma } from '@/lib/prisma'
import { Prisma, User } from '@prisma/client'
import { UsersRepositoryProps } from '../interfaces/users-repository'

export class PrismaUsersRepository implements UsersRepositoryProps {
  async create(data: Prisma.UserCreateInput) {
    const user = await prisma.user.create({
      data,
    })
    return user
  }

  async findByEmail(email: string): Promise<User | null> {
    const userWithSamEmail = await prisma.user.findUnique({
      where: {
        email,
      },
    })
    return userWithSamEmail
  }
}
