import { type CsvData, PrismaClient } from '@prisma/client'

export const searchCsvData = async (param: string): Promise<CsvData[]> => {
  if (param === '') {
    throw new Error('It needs a parameter to search.')
  }

  const { csvData } = new PrismaClient()

  const result = await csvData.findMany({
    where: {
      OR: [
        {
          name: {
            contains: param
          }
        },
        {
          country: {
            contains: param
          }
        },
        {
          city: {
            contains: param
          }
        },
        {
          favorite_sport: {
            contains: param
          }
        }
      ]
    }
  })

  if (result.length === 0) {
    throw new Error('No results found with the given parameter.')
  }

  return result
}
