import { UsersRepositoryProps } from '@/repositories/interfaces/users-repository'
import { InvalidCredentiasError } from './errors/invalid-credentiais-erro'
import { compare } from 'bcryptjs'
import { User } from '@prisma/client'
interface AuthenticateUseCaseRequest {
  email: string
  password: string
}

interface AuthenticateUseCaseResponse {
  user: User
}

export class AuthenticateUseCase {
  constructor(private usersRepository: UsersRepositoryProps) {}

  async execute({
    email,
    password,
  }: AuthenticateUseCaseRequest): Promise<AuthenticateUseCaseResponse> {
    const user = await this.usersRepository.findByEmail(email)

    if (!user) {
      throw new InvalidCredentiasError()
    }
    const doesPasswordMatches = await compare(password, user.password_hash)
    if (!doesPasswordMatches) {
      throw new InvalidCredentiasError()
    }
    return { user }
  }
}
