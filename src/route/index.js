import React from 'react'
import { Route, Routes } from 'react-router-dom'
// import Display from '../component/Display'
import Header from '../component/Header'
import ApplyUser from '../pages/user/ApplyUser'

const Pages = () => {
  const routeList = [
    {
      path: '/user',
      component: <ApplyUser />,
      modalName: 'ApplyUser',
    },
  ]

  return (
    <div>
      <Routes>
        <Route exact path={`/`} component={Header}></Route>
        <Route exact path={`/`} component={ApplyUser}></Route>
      </Routes>
    </div>
  )
}

export default Pages
