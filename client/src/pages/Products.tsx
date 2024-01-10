import { FC, useState } from "react";
import { useGetAllProductsQuery } from "../redux/services/Products";
import { Product } from "../interfaces/EcommerceInterfaces";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/slices/CartSlice";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Products: FC = () => {
  const { data, error, isLoading } = useGetAllProductsQuery();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const dispatch = useDispatch();
  const navigate = useNavigate()

  if (isLoading) {
    return <div>Loading...</div>;
  }
  const handleAddToCart = (product: Product) => {
    dispatch(addToCart(product)); 
    toast.success('product added to cart successfully !', {
      autoClose: 1000,
      closeOnClick: true
    })
    setTimeout(() => {
      navigate('/cart')
    },2000);
  };
  const filteredProducts = selectedCategory
    ? data?.products.filter(
        (product: Product) => product.category === selectedCategory
      )
    : data?.products;

  const categories = [
    "All",
    "Fragrances",
    "Skincare",
    "Groceries",
    "Home-decoration",
    "Smartphones",
    "Laptops",
  ];

  const handleCategoryFilter = (category: string) => {
    setSelectedCategory(category === "All" ? null : category.toLowerCase());
  };



  return (
    <>
    <div className="flex-col mt-2 flex md:flex-row h-auto gap-x-4 p-2">
      <div className="left h-auto md:w-[20vw] w-[100vw] bg-blue-200 md:h-[50vh] relative">
      <h3 className="text-center mb-5 text-2xl font-semibold mt-5">Filter By Categories</h3>
        <ul className="flex-row flex md:flex-col flex-wrap items-center md:gap-y-3 gap-x-4 md:gap-x-0 categories-list p-2">
          {categories.map((category) => (
            <li key={category}>
              <button onClick={() => handleCategoryFilter(category)}>
                {category}
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div className="right  bg-blue-200 flex-1">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4  mt-5 p-4">
          {filteredProducts?.map((product: Product) => (
            <div className="shadow-md relative  p-4 bg-black text-[#fff]" key={product._id}>
              <NavLink to={`/singleProduct/${product._id}`}>
                <img src={product.thumbnail} alt="thumbnail" className="w-full" />
              </NavLink>
              <h3 className="absolute top-0 left-0 bg-yellow-400 p-2 font-semibold w-[10rem] text-center">{product.title}</h3>
              <div className="flex justify-between px-3 items-center py-2 ">
                <button className="rounded-md bg-blue-400 px-3 py-2" onClick={()=>handleAddToCart(product)}>
                  Add to cart
                </button>
                <p className="text-[1rem]">${product.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
      <ToastContainer />
      </>
  );
};

export default Products;
