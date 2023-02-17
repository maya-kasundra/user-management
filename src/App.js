import './app.css'
import { Route, Routes } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import Header from './component/Header'
// import Display from './component/Display'
import 'antd/dist/reset.css'
import 'react-toastify/dist/ReactToastify.css'
import ApplyUser from './pages/user/ApplyUser'
import ModalForm from './pages/user/ModalForm'

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<ApplyUser />} />
        <Route path="/:id" element={<ApplyUser />} />
        {/* <Route path="/" element={<Display />} /> */}
        <Route exact path="/create-user" element={<ModalForm />} />
      </Routes>
    </>
  )
}

export default App
