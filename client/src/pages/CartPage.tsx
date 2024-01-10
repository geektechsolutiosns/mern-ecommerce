import { FC } from "react";
import { useSelector } from "react-redux";
import { Product } from "../interfaces/EcommerceInterfaces";
import { Link } from "react-router-dom";
import { CiSquareMinus, CiSquarePlus } from "react-icons/ci";
import { decreaseTheCart, increaseTheCart } from "../redux/slices/CartSlice";
import { useDispatch } from "react-redux";

const CartPage: FC = () => {
  const dispatch = useDispatch();
  const { cartItems, cartNumber, cartTotal } = useSelector(
    (state: any) => state.cart
  );
  console.log(cartItems, cartNumber, cartTotal);

  return (
    <div className="p-4">
      <h1 className="text-2xl mt-5 mb-5 px-8">My Cart</h1>
      <div className="cart-container mb-5">
        {cartItems.length < 1 ? (
          <p className="text-xl mb-5">Your cart is empty for now</p>
        ) : (
          <div className="grid gap-y-4 px-8">
            {cartItems.map((item: Product) => (
              <div className="flex flex-row  justify-between items-center">
                <img
                  src={item.thumbnail}
                  alt={item.title}
                  className="block w-[7rem]"
                />
                <h3 className="text-xl">{item.title}</h3>
                <div className="flex  flex-col">
                  <button
                    className="text-3xl "
                    onClick={() => dispatch(increaseTheCart(item))}
                  >
                    <CiSquarePlus />
                  </button>
                  <button className="text-3xl" onClick={()=>dispatch(decreaseTheCart(item))}>
                    <CiSquareMinus />
                  </button>
                </div>
                <div className="text-xl">price Per Item<p className="text-xl">$ {item.price}</p></div>
                {/* <div className="text-xl">Total<p className="text-xl">${totalAmount}</p></div> */}
                
                
              </div>
            ))}
          </div>
        )}
      </div>
      <hr />
      <h1 className="text-xl">Cart Total : $ {cartTotal}</h1>
      <h1 className="text-xl mt-5">No of products : {cartNumber}</h1>
      <Link
        to="/checkout"
        className=" text-center mr-5 bg-yellow-300 w-[12rem] p-2 block mt-5 text-[1rem]"
      >
        proceed to checkout
      </Link>
    </div>
  );
};

export default CartPage;
