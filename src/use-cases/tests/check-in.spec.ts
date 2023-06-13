import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { InMemoryCheckInRepository } from '@/repositories/in-memorie/in-memorie-check-in-repository'
import { CheckInUseCase } from '../checkInUseCase'
import { InMemoryGymsRepository } from '@/repositories/in-memorie/in-memorie-gyms-repository'
import { Decimal } from '@prisma/client/runtime'
import { MaxDistanceError } from '../errors/max-distance-error'
import { MaxNumberOfCheckInsError } from '../errors/max-number-of-check-ins'

let checkInsRepository: InMemoryCheckInRepository
let gymsRepository: InMemoryGymsRepository
let sut: CheckInUseCase

const latitudeTest = -27.2092052
const longitudeTest = -49.6401091

describe('Check In use case', () => {
  beforeEach(async () => {
    checkInsRepository = new InMemoryCheckInRepository()
    gymsRepository = new InMemoryGymsRepository()
    sut = new CheckInUseCase(checkInsRepository, gymsRepository)
    vi.useFakeTimers()

    // criando gym

    await gymsRepository.create({
      id: '123',
      title: ' js gym',
      description: '',
      phone: '',
      latitude: latitudeTest,
      longitude: longitudeTest,
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
      userLatitude: latitudeTest,
      userLongitude: longitudeTest,
    })
    await expect(() => {
      return sut.execute({
        gymId: '123',
        userId: '123',
        userLatitude: latitudeTest,
        userLongitude: longitudeTest,
      })
    }).rejects.toBeInstanceOf(MaxNumberOfCheckInsError)
  })

  it('should be able to check in twice on different day', async () => {
    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0))
    await sut.execute({
      gymId: '123',
      userId: '123',
      userLatitude: latitudeTest,
      userLongitude: longitudeTest,
    })
    vi.setSystemTime(new Date(2022, 0, 21, 8, 0, 0))
    const { checkIn } = await sut.execute({
      gymId: '123',
      userId: '123',
      userLatitude: latitudeTest,
      userLongitude: longitudeTest,
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })
  it('should not be able to check in on distant gym', async () => {
    gymsRepository.items.push({
      id: '1234',
      title: 'js gym',
      description: '',
      phone: '',
      latitude: new Decimal(-27.0747279),
      longitude: new Decimal(-49.4889672),
    })

    await expect(() => {
      return sut.execute({
        gymId: '1234',
        userId: '1234',
        userLatitude: latitudeTest,
        userLongitude: longitudeTest,
      })
    }).rejects.toBeInstanceOf(MaxDistanceError)
  })
})
