import { describe, expect, it } from 'vitest'
import { RegisterUseCase } from '../register-usecase'
import { compare } from 'bcryptjs'
import { InMemoryUserRepository } from '@/repositories/in-memorie/in-memory-users-repository'
import { UserAlreadyExistsError } from '../errors/user-already-exists'

describe('Register Use Case', () => {
  it('should hash user password upon registration', async () => {
    const userRepository = new InMemoryUserRepository()
    const registerUseCase = new RegisterUseCase(userRepository)

    const { user } = await registerUseCase.execute({
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
    const userRepository = new InMemoryUserRepository()
    const registerUseCase = new RegisterUseCase(userRepository)
    const email = 'Matias@gmail.com'

    await registerUseCase.execute({
      name: 'Jhon doe',
      email,
      password: '123456',
    })
    await expect(() =>
      registerUseCase.execute({
        name: 'Jhon doe',
        email,
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(UserAlreadyExistsError)
  })
  it('should be able to register', async () => {
    const userRepository = new InMemoryUserRepository()
    const registerUseCase = new RegisterUseCase(userRepository)

    const { user } = await registerUseCase.execute({
      name: 'Jhon doe',
      email: 'Matias@gmail.comm',
      password: '123456',
    })

    expect(user.id).toEqual(expect.any(String))
  })
})
