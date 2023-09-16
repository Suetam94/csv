import { type Request, type Response } from 'express'
import { searchCsvData } from '../useCases/searchCsvData'

export const userController = async (req: Request, res: Response): Promise<void> => {
  try {
    const { q: param } = req.query

    const result = await searchCsvData(param as string)

    res.status(200).json(result)
  } catch (e) {
    const error = e as Error
    res.status(404).json({
      statusCode: 404,
      message: error.message
    })
  }
}
