import { Outlet } from "react-router-dom"
import Sidebar from "../components/Sidebar"


function Layout() {
  return (
    <>
    <div className='flex w-[100%] bg-slate-800'>
      <div className="w-[15vw]">
        <Sidebar/>
      </div>
      <div className="w-[85vw] min-h-[100vh]">
        <Outlet/>
      </div> 
    </div>
    </>   
   
  )
}

export default Layout