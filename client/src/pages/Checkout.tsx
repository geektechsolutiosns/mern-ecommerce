import { FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  address: string;
  city: string;
  zip: string;
  country: string;
}

const Checkout= () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    city: '',
    zip: '',
    country: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response = await axios.post('http://localhost:3000/api/order/create', formData);
    console.log(response);
    if(response.status === 201){
      toast.success('Thank you for your order !',{
        autoClose:1000
      })
      navigate('/payment')
    }
  
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-lg mx-auto p-4 mt-5" >
      <div className="grid grid-cols-1 gap-6">
        <div className="grid grid-cols-2 gap-y-6 gap-x-8">
          <div>
            <label htmlFor="firstName" className="block text-gray-700  text-[1rem]">
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className="mt-1 block w-full px-2 border-gray-300 rounded-md h-[1.75rem] shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label htmlFor="firstName" className="block text-gray-700 text-[1rem]">
              Last Name
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className="mt-1 block w-full px-2 border-gray-300 h-[1.75rem] rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label htmlFor="firstName" className="block text-gray-700  text-[1rem]">
              Email
            </label>
            <input
              type="text"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 block w-full px-2 border-gray-300 h-[1.75rem] rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label htmlFor="firstName" className="block text-gray-700  text-[1rem]">
             Address
            </label>
            <input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="mt-1 block w-full px-2 border-gray-300 h-[1.75rem] rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label htmlFor="firstName" className="block text-gray-700  text-[1rem]">
              City
            </label>
            <input
              type="text"
              id="city"
              name="city"
              value={formData.city}
              onChange={handleChange}
              className="mt-1 block w-full px-2 border-gray-300 rounded-md  h-[1.75rem] shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label htmlFor="firstName" className="block text-gray-700  text-[1rem]">
              Zip
            </label>
            <input
              type="text"
              id="zip"
              name="zip"
              value={formData.zip}
              onChange={handleChange}
              className="mt-1 block w-full px-2 border-gray-300 rounded-md h-[1.75rem] shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label htmlFor="firstName" className="block text-gray-700  text-[1rem]">
              Country
            </label>
            <input
              type="text"
              id="country"
              name="country"
              value={formData.country}
              onChange={handleChange}
              className="mt-1 block w-full px-2 border-gray-300 rounded-md h-[1.75rem] shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>
        
        </div>
      </div>

      <div className="mt-6">
        <button
          type="submit"
          className="py-2 px-4 bg-blue-500 hover:bg-blue-600 text-white rounded-md focus:outline-none focus:ring focus:ring-blue-300"
        >
          Place Order
        </button>
      </div>
      <ToastContainer />
    </form>
  );
};

export default Checkout;
