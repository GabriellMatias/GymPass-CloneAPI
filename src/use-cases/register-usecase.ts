import { UsersRepositoryProps } from '@/repositories/interfaces/users-repository'
import { hash } from 'bcryptjs'
import { UserAlreadyExistsError } from './errors/user-already-exists'

interface RegisterUseCaseParams {
  email: string
  name: string
  password: string
}

export class RegisterUseCase {
  constructor(private usersRepository: UsersRepositoryProps) {}

  async execute({ email, password, name }: RegisterUseCaseParams) {
    const password_hash = await hash(password, 6)

    const userWithSamEmail = await this.usersRepository.findByEmail(email)
    if (userWithSamEmail) {
      throw new UserAlreadyExistsError()
    }

    await this.usersRepository.create({
      name,
      email,
      password_hash,
    })
  }
}
