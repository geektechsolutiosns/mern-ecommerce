
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import { Product } from '../../interfaces/EcommerceInterfaces'


export const productApi = createApi({
  reducerPath: 'productsApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000/api/product' }),
  endpoints: (builder) => ({
    getAllProducts: builder.query<any, void>({
      query: ()=> 'getAllProducts'
    }),
    getProductById: builder.query<any, string>({
        query: (id) => `singleproduct/${id}`
      }),
  }),
})


export const { useGetAllProductsQuery , useGetProductByIdQuery } = productApi