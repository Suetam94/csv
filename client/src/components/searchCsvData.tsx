import axios from 'axios'
import { type FormEvent, useState } from 'react'
import Swal from 'sweetalert2'
import Card from './card.tsx'

export interface IError {
  response: {
    data?: {
      message?: string
    }
  }
}
export interface ICsvData {
  id: number
  name: string
  city: string
  country: string
  favorite_sport: string
}

const SearchCsvData = () => {
  const [param, setParam] = useState<string>()
  const [data, setData] = useState<ICsvData[]>()

  const handleParamChange = (param: string) => {
    if (param !== '') {
      setParam(param)
    }
  }

  const handleSearchData = async (e: FormEvent) => {
    e.preventDefault()

    if (param === '' || !param) {
      await Swal.fire({
        icon: 'warning',
        title: 'Oops...',
        text: 'You must search for something!',
        confirmButtonColor: '#32784d'
      })
      return
    }

    try {
      const response = await axios.get(
        `http://localhost:3000/api/users?q=${param}`,
      )

      setData(response.data as ICsvData[])
    } catch (e) {
      const error = e as IError
      setData([])
      await Swal.fire({
        icon: 'warning',
        title: 'Oops...',
        text: error.response.data?.message
          ? `${error.response.data.message}`
          : 'No data found!',
      })
    }
  }

  return (
    <>
      <form
        onSubmit={(e) => void handleSearchData(e)}
        className="flex flex-col items-center font-[Montserrat] w-4/5"
      >
        <h3 className="font-[Montserrat] uppercase text-2xl text-white border-b-2">
          Search your data
        </h3>
        <div className="flex flex-col gap-10 lg:flex-row my-10 w-full justify-between items-center">
          <input
            className="w-full outline-none rounded-2xl p-3"
            type="text"
            placeholder="Type what you want to search"
            onChange={(e) => {
              handleParamChange(e.target.value)
            }}
          />
          <button
            className="h-10 shadow-md border rounded-lg w-64 text-center hover:bg-gradient-to-r from-yellow-500 to-green-500 hover:border-0 text-white font-bold"
            type="submit"
          >
            Search
          </button>
        </div>
      </form>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10">
        {data?.map((item) => (
          <Card
            key={item.id}
            id={item.id}
            name={item.name}
            city={item.city}
            country={item.country}
            favorite_sport={item.favorite_sport}
          />
        ))}
      </div>
    </>
  )
}

export default SearchCsvData
