import { useState } from "react";
import { NavLink } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { NavLinks } from "../utils/NavRoutes";
import { NavType } from "../interfaces/EcommerceInterfaces";
import Sidebar from "./Sidebar";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setLoggedOut } from "../redux/slices/AuthSlice";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoggedin } = useSelector((state: any) => state.auth);
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);

  const handleLogout = () => {
    try {
      localStorage.removeItem("token");
      dispatch(setLoggedOut());
      toast.success("logged out successfully ", {
        autoClose: 1000,
      });
      setTimeout(() => {
        navigate("/");
      }, 2000);
      setIsSidebarOpen(false);
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <>
      <div className="w-[100vw] bg-[#121134] h-[6rem] text-[#fff] flex items-center">
        <div className="flex justify-between w-[90%] mx-auto items-center">
          <h1 className="text-[1.4rem] font-semibold">
            <NavLink to="/">Dhamala Ecom</NavLink>
          </h1>
          <button
            className="block md:hidden text-[1.25rem] mt-1"
            onClick={() => setIsSidebarOpen(true)}
          >
            <GiHamburgerMenu />
          </button>

          <ul className=" gap-x-8 hidden md:flex text-[1.15rem]">
            {NavLinks.navLinks.map((navLink: NavType, index) => (
              <li key={index}>
                <NavLink to={navLink.path}>{navLink.title}</NavLink>
              </li>
            ))}
            {isLoggedin ? (
              <button onClick={handleLogout}>Logout</button>
            ) : (
              <>
                <li>
                  <NavLink to="/login" onClick={() => setIsSidebarOpen(false)}>
                    Login
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/register"
                    onClick={() => setIsSidebarOpen(false)}
                  >
                    Register
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
      <Sidebar
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
        handleLogout={handleLogout}
        isLoggedin={isLoggedin}
      />
      <ToastContainer />
    </>
  );
};

export default Navbar;
