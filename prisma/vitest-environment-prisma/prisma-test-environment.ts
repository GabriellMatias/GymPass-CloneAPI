import 'dotenv/config'
import { randomUUID } from 'crypto'
import { Environment } from 'vitest'
import { execSync } from 'child_process'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

function generateDataBaseUrl(schema: string) {
  if (!process.env.DATABASE_URL) {
    throw new Error('please provide DataBase Url')
  }
  const url = new URL(process.env.DATABASE_URL)
  url.searchParams.set('schema', schema)
  return url.toString()
}

export default <Environment>{
  name: 'prisma',
  async setup() {
    const schema = randomUUID()
    const dataBaseUrl = generateDataBaseUrl(schema)
    process.env.DATABASE_URL = dataBaseUrl
    execSync('npx prisma migrate deploy')

    return {
      /* Executa o setup antes dos testes e o return executa DEPOIS dos testes
       */
      async teardown() {
        /* no final dos testes deleta o banco criado */
        await prisma.$executeRawUnsafe(
          `DROP SCHEMA IF EXISTS "${schema}" CASCADE`,
        )
        prisma.$disconnect()
      },
    }
  },
}
