import { useState } from "react";
import { IoEye } from "react-icons/io5";
import { IoEyeOff } from "react-icons/io5";
import axios from "axios";
import { useNavigate , Link } from "react-router-dom";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch } from "react-redux";
import { setLoggedIn } from "../redux/slices/AuthSlice";

const Login = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const notify = () => toast.success('User loggedin successfully !' , {
    position:'top-right',
    autoClose: 1000,
    hideProgressBar: true,
  });
  const [loginData , setLoginData] = useState({email:'' , password : ''})
  const [isEyeOpen, setIsEyeOpen] = useState<boolean>(false);
  const toggleEye = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsEyeOpen(!isEyeOpen);
  };
  const handleChange = (e:any)=>{
  setLoginData(prevData=>({...prevData , [e.target.name]:e.target.value}))
  }
  

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/api/auth/login', loginData);
      console.log(response);
      if(response.data.success == true){
      localStorage.setItem('token' ,response.data.token)
      notify();
      dispatch(setLoggedIn(response.data.user.role))
      setTimeout(() => {
        navigate('/')
      }, 2000);
    }
    
    } catch (error:any) {
      // console.error('Error:', error);
      toast.error(error.response.data.message, {
        position:'top-right',
        autoClose: 1000,
        hideProgressBar: true,
      });
    }
  }

  return (
    <section className="dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto h-[70vh] lg:py-0">
        <div className="w-full bg-white rounded-lg shadow-lg dark:border  md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight text-center tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Sign in to your account
            </h1>
            <form className="space-y-6 md:space-y-4" onSubmit={handleSubmit} autoComplete="off">
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  
                  onChange={handleChange}
                  value={loginData.email}
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="dhamalaecom@gmail.com"
                />
              </div>
              <div className="relative">
                <label
                  form="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Password
                </label>
                <input
                  type={`${isEyeOpen ? "text" : "password"}`}
                  name="password"
                  id="password"
                 
                  onChange={handleChange}
                  value={loginData.password}
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
                <button
                  className="absolute top-10 right-3 text-[1rem]"
                  onClick={toggleEye}
                >
                  {isEyeOpen ? <IoEye /> : <IoEyeOff />}
                </button>
              </div>

              <button
                type="submit"
                className="w-full text-white bg-blue-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                Sign in
              </button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Don’t have an account yet?{" "}
                <Link
                  to="/register"
                  className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Sign up
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer />
    </section>
  );
};

export default Login;
