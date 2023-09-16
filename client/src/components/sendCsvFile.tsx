import { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import Swal from 'sweetalert2'
import axios from 'axios'

const SendCsvFile = () => {
  const [file, setFile] = useState<File>()
  const [fileName, setFileName] = useState<string>()

  useEffect(() => {
    if (file) {
      setFileName(file.name)
    } else {
      setFileName('Select your file')
    }
  }, [file])

  const handleInputFile = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0])
    }
  }

  const handleUploadFile = async (e: FormEvent) => {
    e.preventDefault()

    if (!file) {
      await Swal.fire({
        icon: 'warning',
        title: 'Oops...',
        text: 'You must sent a file!',
        confirmButtonColor: '#32784d'
      })
      return
    }

    const formData = new FormData()
    formData.append('file', file)

    try {
      const response = await axios.post(
        'http://localhost:3000/api/files',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      )

      return Swal.fire({
        icon: 'success',
        title: 'All right!',
        text: response.data?.message
          ? `${response.data.message}`
          : 'Your file has been uploaded!',
        confirmButtonColor: '#32784d'
      })
    } catch (e) {
      await Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'It was not possible to upload the file!',
        confirmButtonColor: '#32784d'
      })
    }
  }

  return (
    <form
      className="flex flex-col items-center font-[Montserrat] w-4/5"
      onSubmit={(e) => void handleUploadFile(e)}
    >
      <h3 className="font-[Montserrat] uppercase text-2xl text-white border-b-2">
        Your <b>CSV</b>
      </h3>
      <div className="flex flex-col gap-10 items-center lg:flex-row my-10 w-full justify-between">
        <label
          className="cursor-pointer border rounded-full bg-white p-2 w-60 text-center font-[Montserrat] font-bold hover:brightness-75"
          htmlFor="file"
        >
          {fileName}
        </label>
        <input
          className="hidden"
          id="file"
          type="file"
          onChange={(e) => handleInputFile(e)}
        />
        <button
          className="h-10 shadow-md border rounded-lg w-64 text-center hover:bg-gradient-to-r from-yellow-500 to-green-500 hover:border-0 text-white font-bold"
          type="submit"
        >
          Send
        </button>
      </div>
    </form>
  )
}

export default SendCsvFile
