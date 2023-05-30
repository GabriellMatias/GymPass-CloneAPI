import { beforeEach, describe, expect, it } from 'vitest'

import { hash } from 'bcryptjs'
import { InMemoryUserRepository } from '@/repositories/in-memorie/in-memory-users-repository'

import { GetUserProfileUseCase } from '../getuserProfile'

import { ResourceNotFoundError } from '../errors/resource-not-found-error'

let userRepository: InMemoryUserRepository
let sut: GetUserProfileUseCase
describe('Atuthenticate Use Case', () => {
  beforeEach(() => {
    userRepository = new InMemoryUserRepository()
    sut = new GetUserProfileUseCase(userRepository)
  })

  it('should be able to get user Profile', async () => {
    const CreatedUser = await userRepository.create({
      email: 'Matias@gmail.com',
      name: 'John Doe',
      password_hash: await hash('123456', 6),
    })

    const { user } = await sut.execute({
      userId: CreatedUser.id,
    })

    expect(user.name).toEqual('John Doe')
  })
  it('should not be able to get user Profile with wrong ID', async () => {
    await expect(() =>
      sut.execute({
        userId: 'non-exitis-id',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
