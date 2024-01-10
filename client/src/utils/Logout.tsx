// import React from 'react';
// import axios from 'axios';
// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { setLoggedOut } from '../redux/slices/AuthSlice';
// import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

// const Logout = () => {
//     const dispatch = useDispatch()
    const navigate = useNavigate()
//      const logoutUrl = 'http://localhost:3000/api/auth/logout'; // Replace with your logout endpoint

//      const handleLogout = async () => {
//         try {
//           // Perform a POST request to logout endpoint
//           const response = await axios.get(logoutUrl,{ withCredentials: true });
      
//          console.log("Done");
//          console.log(response);
         
         
//         } catch (error:any) {
//           console.error('Logout failed:', error.message , error );
//           // Handle error if logout request fails
//         }
//       };
      


//   return (
//     <div>
//       <button onClick={handleLogout}>Logout</button>
//       <ToastContainer />
//     </div>
//   )
//   }
// export default Logout;


export const handleLogout = ()=>{
    try {
        localStorage.removeItem('token')
        navigate('/login')
    } catch (error) {
        console.error('Logout failed:', error);
    }
  

    return(
        null
    )
}
