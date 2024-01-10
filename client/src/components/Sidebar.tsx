
import { NavLinks } from '../utils/NavRoutes'
import { NavType } from '../interfaces/EcommerceInterfaces';
import { NavLink } from 'react-router-dom'
import { FaRegWindowClose } from "react-icons/fa";
import { SidebarProps } from '../interfaces/EcommerceInterfaces';




const Sidebar = ({isSidebarOpen , setIsSidebarOpen ,handleLogout ,isLoggedin}:SidebarProps) => {
  return (
    <div className={`${isSidebarOpen ? 'sidebar show':'sidebar'}`}>
    <ul className='flex flex-col items-center gap-y-4 mt-8 text-[1.25rem]'>
        {NavLinks.navLinks.map((navLink:NavType , index)=>(
<li key={index} onClick={()=>setIsSidebarOpen(false)}><NavLink to={navLink.path}>{navLink.title}</NavLink></li>
        ))}
         {isLoggedin ? <button onClick={handleLogout}>Logout</button> : 
            <>
            <li><NavLink to='/login'onClick={()=>setIsSidebarOpen(false)}>Login</NavLink></li>
            <li><NavLink to='/register' onClick={()=>setIsSidebarOpen(false)}>Register</NavLink></li>
            </>}

    </ul>
    <button className='text-[1.25rem] fixed top-4 right-[10%]' onClick={()=>setIsSidebarOpen(false)}><FaRegWindowClose /></button>
    </div>
  )
}

export default Sidebar