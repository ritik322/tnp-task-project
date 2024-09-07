import { Outlet } from "react-router-dom"
import Header from "./Components/Header/Header"
import PostContainer from "./Components/PostContainer/PostContainer"



function App() {


  return (
    <>
    <Header />
    <Outlet />
    </>
  )
}

export default App
