// import { FC } from 'react';
import { Product } from '../interfaces/EcommerceInterfaces';
import { useGetAllProductsQuery } from '../redux/services/Products';
import { NavLink, Link } from 'react-router-dom';
import { addToCart } from '../redux/slices/CartSlice';
import { useDispatch } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const LatestTrends = () => {
  const { data ,error, isLoading } = useGetAllProductsQuery();
  const dispatch = useDispatch()
  const navigate = useNavigate();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const handleAddToCart = (product:Product) => {
    dispatch(addToCart(product));
    toast.success('Product added to cart successfully!', {
      autoClose: 1000,
      closeOnClick: true,
    });

    // Delayed navigation to '/cart' after 2000 milliseconds (2 seconds)
    const timeoutId = setTimeout(() => {
      navigate('/cart');
    }, 2000);

    // Clear the timeout if the component unmounts before the delay finishes
    useEffect(() => {
      return () => clearTimeout(timeoutId);
    }, [timeoutId]);
  };
  const latestProducts = data.products.filter((product: Product) => product.latest);

  return (
    <div className="mt-5 p-4">
      <h1 className="text-2xl text-center mb-5">Shop Our Latest Trends</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-3 gap-y-3">
        {latestProducts.map((product: Product) => (
          <div key={product._id} className="shadow-md relative">
            <NavLink to={`singleProduct/${product._id}`}>
              <img src={product.thumbnail} alt={product.title} />
            </NavLink>
            <h3 className="absolute top-0 left-0 bg-yellow-400 p-2 font-semibold w-[10rem] text-center">
              {product.title}
            </h3>
            <div className="flex justify-between px-3 items-center py-2">
              <button className="rounded-md bg-blue-400 px-3 py-2" onClick={() => handleAddToCart(product)}>Add to cart</button>
              <p className="text-[1rem]">${product.price}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center">
        <Link to="/products" className="mt-5 font-semibold bg-red-400 w-[10rem] h-[2rem] text-center grid items-center text-[0.9rem]">
          Shop More
        </Link>
      </div>
      <ToastContainer />
    </div>
  );
};

export default LatestTrends;
