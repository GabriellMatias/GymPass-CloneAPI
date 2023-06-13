import { Gym, Prisma } from '@prisma/client'

import {
  FindManyNearByProps,
  GymRepositoryProps,
} from '../prisma/gyms-repository'
import { randomUUID } from 'crypto'
import Decimal from 'decimal.js'
import { getDistanceBetweenCoordinates } from '@/utils/get-distance-between-coordinates'

export class InMemoryGymsRepository implements GymRepositoryProps {
  public items: Gym[] = []

  async create(data: Prisma.GymCreateInput) {
    const Gym = {
      id: data.id ?? randomUUID(),
      title: data.title,
      latitude: new Decimal(Number(data.latitude)),
      longitude: new Decimal(Number(data.longitude)),
      description: data.description ?? null,
      phone: data.phone ?? null,
      checkIns: data.checkIns,
    }
    this.items.push(Gym)

    return Gym
  }

  async findById(id: string) {
    const gym = this.items.find((item) => {
      return item.id === id
    })

    if (!gym) {
      return null
    }
    return gym
  }

  async searchMany(query: string, page: number) {
    return this.items
      .filter((item) => item.title.includes(query))
      .slice((page - 1) * 20, page * 20)
  }

  async findManyNearBy({ latitude, longitude }: FindManyNearByProps) {
    return this.items.filter((item) => {
      const distance = getDistanceBetweenCoordinates(
        { latitude, longitude },
        {
          latitude: item.latitude.toNumber(),
          longitude: item.longitude.toNumber(),
        },
      )
      return distance < 10
    })
  }
}
