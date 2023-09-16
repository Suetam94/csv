import supertest from 'supertest'

import { searchCsvData } from '../../src/useCases/searchCsvData'
import app from '../../src/app'
import fs from 'fs'
import csv from 'csv-parser'
import { PrismaClient } from '@prisma/client'
import path from 'path'
import { type ICsvData } from '../../src/useCases/createCsvData'

beforeAll(() => {
  const results: ICsvData[] = []

  const filePath = path.join(__dirname, '../mock', 'file.csv')

  fs.createReadStream(filePath)
    .pipe(csv())
    .on('data', (data) => results.push(data))
    .on('end', async () => {
      const { csvData } = new PrismaClient()

      for (const result of results) {
        // eslint-disable-next-line @typescript-eslint/naming-convention
        const { name, city, country, favorite_sport } = result
        await csvData.create({
          data: {
            name,
            city,
            country,
            favorite_sport
          }
        })
      }
    })
})

describe('Testing for search data', () => {
  it('should throw an error if no param is sent', async () => {
    await expect(async () => await searchCsvData('')).rejects.toThrow()
  })

  it('should throw an error if no results are found', async () => {
    await expect(async () => await searchCsvData('YnGguofs')).rejects.toThrow()
  })

  it('should return an array of results', async () => {
    const response = await supertest(app).get('/api/users?q=doe')

    expect(response.status).toBe(200)
    expect(response.body).toBeInstanceOf(Array)
    expect(response.body[0]).toHaveProperty('id')
    expect(response.body[0]).toHaveProperty('name')
    expect(response.body[0]).toHaveProperty('country')
    expect(response.body[0]).toHaveProperty('city')
    expect(response.body[0]).toHaveProperty('favorite_sport')
  })
})

afterAll(async () => {
  const prisma = new PrismaClient()
  await prisma.csvData.deleteMany({})
})
