import { Gym, Prisma } from '@prisma/client'

export interface FindManyNearByProps {
  latitude: number
  longitude: number
}

export interface GymRepositoryProps {
  create(data: Prisma.GymCreateInput): Promise<Gym>
  searchMany(query: string, page: number): Promise<Gym[]>
  findManyNearBy({ latitude, longitude }: FindManyNearByProps): Promise<Gym[]>
  findById(id: string): Promise<Gym | null>
}
