import { beforeEach, describe, expect, it } from 'vitest'

import { hash } from 'bcryptjs'
import { InMemoryUserRepository } from '@/repositories/in-memorie/in-memory-users-repository'
import { AuthenticateUseCase } from '../authenticate'
import { InvalidCredentiasError } from '../errors/invalid-credentiais-erro'

let userRepository: InMemoryUserRepository
let sut: AuthenticateUseCase
describe('Atuthenticate Use Case', () => {
  beforeEach(() => {
    userRepository = new InMemoryUserRepository()
    sut = new AuthenticateUseCase(userRepository)
  })

  it('should be able to authenticate', async () => {
    await userRepository.create({
      email: 'Matias@gmail.com',
      name: 'John Doe',
      password_hash: await hash('123456', 6),
    })

    const { user } = await sut.execute({
      email: 'Matias@gmail.com',
      password: '123456',
    })

    expect(user.id).toEqual(expect.any(String))
  })
  it('should not be able to authenticate with wrong email', async () => {
    await expect(() =>
      sut.execute({
        email: 'jhonDoe@gmail.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentiasError)
  })
  it('should not be able to authenticate with wrong password', async () => {
    await userRepository.create({
      email: 'Matias@gmail.com',
      name: 'John Doe',
      password_hash: await hash('123456', 6),
    })

    await expect(() =>
      sut.execute({
        email: 'jhonDoe@gmail.com',
        password: '123422',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentiasError)
  })
})
