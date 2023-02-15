import './App.css'
import { Route, Routes } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import Header from './component/Header'
// import Display from './component/Display'
import 'antd/dist/reset.css'
import ApplyUser from './pages/user/ApplyUser'

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<ApplyUser />} />
        <Route path="/:id" element={<ApplyUser />} />
        {/* <Route path="/" element={<Display />} /> */}
      </Routes>
    </>
  )
}

export default App
