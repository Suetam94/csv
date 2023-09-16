import { ICsvData } from './searchCsvData.tsx'

const Card = (data: ICsvData) => {
  return (
    <div className="h-60 w-80 bg-green-600 p-5 flex items-center justify-center rounded-2xl">
      <ul className="w-full text-base text-white font-[Montserrat] font-medium">
        <li className="w-full text-center mb-2">
          <span>{data.name}</span>
        </li>
        <li className="w-full text-center mb-2">
          <span>{data.city}</span>
        </li>
        <li className="w-full text-center mb-2">
          <span>{data.country}</span>
        </li>
        <li className="w-full text-center mb-2">
          <span>{data.favorite_sport}</span>
        </li>
      </ul>
    </div>
  )
}

export default Card
