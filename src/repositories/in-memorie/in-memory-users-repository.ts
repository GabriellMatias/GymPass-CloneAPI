import { Prisma, User } from '@prisma/client'
import { UsersRepositoryProps } from '../interfaces/users-repository'

export class InMemoryUserRepository implements UsersRepositoryProps {
  public items: User[] = []
  async create(data: Prisma.UserCreateInput) {
    const user = {
      id: 'user1',
      name: data.name,
      email: data.email,
      password_hash: data.password_hash,
      created_at: new Date(),
    }

    this.items.push(user)
    return user
  }

  async findByEmail(email: string) {
    const user = this.items.find((item) => item.email === email)

    if (!user) {
      return null
    }
    return user
  }
}
