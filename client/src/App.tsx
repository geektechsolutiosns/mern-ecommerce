import { FC } from 'react';
import { Routes, Route ,Navigate} from 'react-router-dom';
import HomePage from './pages/HomePage';
import Login from './pages/Login';
import Register from './pages/Register';
import Products from './pages/Products';
import SingleProduct from './pages/SingleProduct';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Error from './pages/Error';
import CartPage from './pages/CartPage';
import ScrollToTop from './utils/ScrollToTop';
import Checkout from './pages/Checkout';
import Payment from './pages/Payment';
import { useSelector } from 'react-redux';
import AdminLayout from './admin/AdminLayout';
import AdminDashboard from './admin/dashboard/AdminDashboard';
import AdminProducts from './admin/ProductManagement.tsx/AdminProducts';
const App: FC = () => {
  const { isLoggedin, role } = useSelector((state: any) => state.auth);

  return (
    <>
      <Navbar />
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/products" element={<Products />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="*" element={<Error />} />
        <Route path="/singleProduct/:id" element={<SingleProduct />} />
        <Route path='/admin' element={<AdminLayout />}>
          <Route path='dashboard' element={<AdminDashboard />} />
          <Route path='product' element={<AdminProducts />} />
       </Route>
      </Routes>
      <Footer />
    </>
  );
};

export default App;
