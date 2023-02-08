import './App.css'
import { Route, Routes } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import Header from './component/Header'
import Display from './component/Display'
import 'antd/dist/reset.css'

function App() {
  return (
    <>
      <Header />
      <h1 className="text-center mt-2">Fetch Data Using Api</h1>
      <Routes>
        <Route path="/" element={<Display />} />
      </Routes>
    </>
  )
}

export default App
