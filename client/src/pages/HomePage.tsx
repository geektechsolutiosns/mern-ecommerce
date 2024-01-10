import {FC} from 'react'
import Hero from '../components/Hero'
import Feature from '../components/Feature'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const HomePage:FC = () => {
 const mystate = useSelector((state:any)=>state.auth)
 console.log(mystate);
 
  
  return (
    <>
    <Link to='/dashboard'>Go to dashboard</Link>
   <Hero />
   <Feature />
   </>
  )
}

export default HomePage