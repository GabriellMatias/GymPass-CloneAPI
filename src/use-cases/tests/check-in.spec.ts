import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { InMemoryCheckInRepository } from '@/repositories/in-memorie/in-memorie-check-in-repository'
import { CheckInUseCase } from '../checkInUseCase'
import { InMemoryGymsRepository } from '@/repositories/in-memorie/in-memorie-gyms-repository'
import { Decimal } from '@prisma/client/runtime'

let checkInsRepository: InMemoryCheckInRepository
let gymsRepository: InMemoryGymsRepository
let sut: CheckInUseCase
describe('Check In use case', () => {
  beforeEach(() => {
    checkInsRepository = new InMemoryCheckInRepository()
    gymsRepository = new InMemoryGymsRepository()
    sut = new CheckInUseCase(checkInsRepository, gymsRepository)
    vi.useFakeTimers()

    // criando gym
    gymsRepository.items.push({
      id: 'test',
      title: ' js gym',
      description: '',
      phone: '',
      latitude: new Decimal(0),
      longitude: new Decimal(0),
    })
  })
  afterEach(() => {
    vi.useRealTimers()
  })

  it('should be able to check in', async () => {
    const checkIn = await checkInsRepository.create({
      gym_id: '123',
      user_id: '123',
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })

  /* TDD -> test driven developer -> comeca desenvolvendo os testes e depois as funcionalidades
  d */
  it('should not be able to check in twice on the same day', async () => {
    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0))
    await sut.execute({
      gymId: '123',
      userId: '123',
      userLatitude: 0,
      userLongitude: 0,
    })
    await expect(() => {
      sut.execute({
        gymId: '123',
        userId: '123',
        userLatitude: 0,
        userLongitude: 0,
      })
    }).rejects.toBeInstanceOf(Error)
  })

  it('should be able to check in twice on different day', async () => {
    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0))
    await sut.execute({
      gymId: '123',
      userId: '123',
      userLatitude: 0,
      userLongitude: 0,
    })
    vi.setSystemTime(new Date(2022, 0, 21, 8, 0, 0))
    const { checkIn } = await sut.execute({
      gymId: '123',
      userId: '123',
      userLatitude: 0,
      userLongitude: 0,
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })
})
