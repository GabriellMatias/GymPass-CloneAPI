import { beforeEach, describe, expect, it } from 'vitest'

import { CreateGymUseCase } from '../createGymUseCase'
import { InMemoryGymsRepository } from '@/repositories/in-memorie/in-memorie-gyms-repository'

let gymsRepository: InMemoryGymsRepository
let sut: CreateGymUseCase

describe('Register Use Case', () => {
  beforeEach(() => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new CreateGymUseCase(gymsRepository)
  })

  it('should be able to create an gym', async () => {
    const { gym } = await sut.execute({
      title: 'js Academy',
      description: null,
      latitude: -27.2092052,
      longitude: -49.6401091,
      phone: null,
    })

    expect(gym.id).toEqual(expect.any(String))
  })
})
