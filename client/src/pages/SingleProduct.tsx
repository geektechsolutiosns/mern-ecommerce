import { FC } from 'react';
import { useParams } from 'react-router-dom';
import { useGetProductByIdQuery } from '../redux/services/Products';
import { Product } from '../interfaces/EcommerceInterfaces';
import { addToCart } from '../redux/slices/CartSlice';
import { useDispatch } from 'react-redux';

const SingleProduct: FC = () => {
  const dispatch = useDispatch()
  const { id: idParam } = useParams<{ id: string | undefined }>();
  const id = idParam || '';
  const { data, error, isLoading } = useGetProductByIdQuery(id);

  console.log(data);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  
  if (!data || !data.success || !data.product) {
    return <div>Product not found</div>;
  }

  const product: Product = data.product;

  console.log(id); 

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 p-4 gap-x-3 text-xl'>
    <div className='left'>
      <img src={product.thumbnail} alt='Thumbnail' />
    </div>
    <div className='right flex flex-col items-center'>
      <h1 className='mb-5'>Product Info : </h1>
      <div className=''>
        <h3>product name : {product.title}</h3>
        <p>description: {product.description}</p>
        <p>price : ${product.price}</p>
        <p>ratings : {product.rating}</p>
        <p>in-stock : {product.stock}</p>
        <p>brand : {product.brand}</p>
        <button className="rounded-md bg-blue-400 px-3 py-2 mt-4" onClick={()=>dispatch(addToCart(product))}>add to cart</button>
      </div>
    </div>
    </div>
  );
};

export default SingleProduct;
