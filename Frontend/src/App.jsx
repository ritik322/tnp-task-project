import { Outlet } from "react-router-dom"
import Header from "./Components/Header/Header"
import { useState } from "react"



function App() {
 const [isLogin,setIsLogin] = useState(JSON.parse(localStorage.getItem('isLogin')))

  return (
    <>
    <Header isLogin = {isLogin} setIsLogin = {setIsLogin} />
    <Outlet context={[isLogin,setIsLogin]} />
    </>
  )
}

export default App
