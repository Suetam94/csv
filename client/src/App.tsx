import background from './assets/main.jpg'
import logo from './assets/logo.png'
import logoBlack from './assets/logo_black.png'
import SendCsvFile from './components/sendCsvFile.tsx'
import SearchCsvData from './components/searchCsvData'

function App() {
  return (
    <div
      style={{
        background: `url(${background}) center center no-repeat`,
      }}
      className="relative min-h-screen bg-cover flex flex-col items-center pb-24"
    >
      <header className="py-4">
        <a href="/">
          <img className="w-64" src={logo} alt="Logo" />
        </a>
      </header>
      <main className="flex flex-col items-center pb-10 w-4/5">
        <h1 className="font-[Montserrat] font-light uppercase text-4xl text-center lg:text-6xl text-white my-16">
          Send or search CSV
        </h1>
        <SendCsvFile />
        <SearchCsvData />
      </main>
      <footer className="h-24 w-full bg-white py-4 flex items-center justify-center absolute bottom-0">
        <img src={logoBlack} alt="Logo Footer" />
      </footer>
    </div>
  )
}

export default App
