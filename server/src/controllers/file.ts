import { type Request, type Response } from 'express'
import { createCsvData } from '../useCases/createCsvData'

export const fileController = async (req: Request, res: Response): Promise<void> => {
  try {
    const { file } = req

    const createdData = await createCsvData(file)

    res.status(201).json({ message: createdData }).send()
  } catch (e) {
    const error = e as Error
    res.status(400).json({ message: error.message })
  }
}
