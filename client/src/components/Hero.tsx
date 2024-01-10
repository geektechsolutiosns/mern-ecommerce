import {FC} from 'react'
import ShoppingImg from '../assets/shopping.jpg'
import { Link } from 'react-router-dom'

const Hero:FC = () => {
  return (
    <div className='mt-5 grid grid-cols-1 md:grid-cols-2 px-8 gap-y-3 md:gap-y-0 gap-x-0 md:gap-x-2'>
      <div className='flex flex-col gap-3 justify-center'>
        <h1 className='text-2xl font-bold'>Welcome to Dhamala Ecommerce</h1>
        <p className='text-[0.9rem]'>Discover excellence with our premier e-commerce platform, a global leader offering a diverse selection of over 200+ happy clients.</p>

        <Link to="/products" className='font-semibold bg-red-300 w-[7rem] h-[2rem] text-center grid items-center text-[0.9rem]'>Shop Now</Link>
      </div>
      <div>
        <img src={ShoppingImg} alt='Shopping Lady' />
      </div>
    </div>
  )
}

export default Hero