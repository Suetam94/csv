import fs from 'fs'
import csv from 'csv-parser'
import { PrismaClient } from '@prisma/client'

export interface ICsvData {
  name: string
  city: string
  country: string
  favorite_sport: string
}
export const createCsvData = async (file: Express.Multer.File | undefined): Promise<string> => {
  if (file == null) {
    throw new Error('File was not sent.')
  }

  if (!file.originalname.endsWith('.csv')) {
    throw new Error('File must be a valid CSV')
  }

  const results: ICsvData[] = []

  fs.createReadStream(`uploads/${file.filename}`)
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

      fs.unlinkSync(`uploads/${file.filename}`)
    })

  return `${file?.originalname} was uploaded successfully.`
}
