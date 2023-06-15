import { Prisma, Gym } from '@prisma/client'
import {
  FindManyNearByProps,
  GymRepositoryProps,
} from '../interfaces/gyms-repository'
import { prisma } from '@/lib/prisma'

export class PrismaGymsRepository implements GymRepositoryProps {
  async create(data: Prisma.GymCreateInput) {
    const gym = prisma.gym.create({
      data,
    })
    return gym
  }

  async searchMany(query: string, page: number) {
    const gyms = prisma.gym.findMany({
      where: {
        title: {
          contains: query,
        },
      },
      take: 20,
      skip: (page - 1) * 20,
    })
    return gyms
  }

  async findManyNearBy({ latitude, longitude }: FindManyNearByProps) {
    const gyms = prisma.$queryRaw<Gym[]>`SELECT * from gyms
    WHERE ( 6371 * acos( cos( radians(${latitude}) ) * cos( radians( latitude ) ) * cos( radians( longitude ) - radians(${longitude}) ) + sin( radians(${latitude}) ) * sin( radians( latitude ) ) ) ) <= 10`
    return gyms
  }

  async findById(id: string) {
    const checkIn = await prisma.gym.findUnique({ where: { id } })
    return checkIn
  }
}
