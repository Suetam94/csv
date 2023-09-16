import supertest from 'supertest'
import path from 'path'
import { createCsvData } from '../../src/useCases/createCsvData'
import app from '../../src/app'

const fileTxt = {
  fieldname: 'file',
  originalname: 'csv.txt',
  encoding: '7bit',
  mimetype: 'text/plain',
  destination: 'uploads/',
  filename: 'b91b9ccc39f79120945328a4c853f5a4',
  path: 'uploads\\b91b9ccc39f79120945328a4c853f5a4',
  size: 238
}

describe('Testing for receive a CSV file', () => {
  it('should throw an error if no file is received', async () => {
    await expect(async () => await createCsvData(undefined)).rejects.toThrow()
  })

  it('should throw an error if file was not a CSV', async () => {
    await expect(async () => await createCsvData(fileTxt as Express.Multer.File)).rejects.toThrow()
  })

  it('should upload the file successfully', async () => {
    const filePath = path.join(__dirname, '../mock', 'file.csv')

    const response = await supertest(app).post('/api/files').attach('file', filePath)

    expect(response.status).toBe(201)
    expect(response.body.message).toBe('file.csv was uploaded successfully.')
  })
})
