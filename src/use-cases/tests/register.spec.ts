import { beforeEach, describe, expect, it } from 'vitest'
import { RegisterUseCase } from '../register-usecase'
import { compare } from 'bcryptjs'
import { InMemoryUserRepository } from '@/repositories/in-memorie/in-memory-users-repository'
import { UserAlreadyExistsError } from '../errors/user-already-exists'

let userRepository: InMemoryUserRepository
let sut: RegisterUseCase

describe('Register Use Case', () => {
  beforeEach(() => {
    userRepository = new InMemoryUserRepository()
    sut = new RegisterUseCase(userRepository)
  })

  it('should hash user password upon registration', async () => {
    const { user } = await sut.execute({
      name: 'Jhon doe',
      email: 'Matias@gmail.comm',
      password: '123456',
    })

    const isPasswordCorrectlyHashed = await compare(
      '123456',
      user.password_hash,
    )

    expect(isPasswordCorrectlyHashed).toBe(true)
  })
  it('should not be able to register with the same email', async () => {
    const email = 'Matias@gmail.com'

    await sut.execute({
      name: 'Jhon doe',
      email,
      password: '123456',
    })
    await expect(() =>
      sut.execute({
        name: 'Jhon doe',
        email,
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(UserAlreadyExistsError)
  })
  it('should be able to register', async () => {
    const { user } = await sut.execute({
      name: 'Jhon doe',
      email: 'Matias@gmail.comm',
      password: '123456',
    })

    expect(user.id).toEqual(expect.any(String))
  })
})
