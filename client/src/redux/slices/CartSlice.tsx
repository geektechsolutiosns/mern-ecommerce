import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "../../interfaces/EcommerceInterfaces";
import { CartState } from "../../interfaces/EcommerceInterfaces";

const initialState: CartState = {
  cartItems: [],
  cartTotal: 0,
  cartNumber: 0,
  
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Product>) => {
      console.log(state);
      console.log(action.payload.price);
      
      
      const existingItem = state.cartItems.find(item => item._id === action.payload._id);

      if (existingItem) {
        state.cartNumber += 1;
        state.cartTotal += existingItem.price;
       
      } else {
        state.cartItems.push(action.payload);
        state.cartNumber += 1;
        state.cartTotal += action.payload.price;
      }
    },
    increaseTheCart: (state, action: PayloadAction<Product>) => {
      const itemToIncrease = state.cartItems.find(item => item._id === action.payload._id);

      if (itemToIncrease) {
        state.cartNumber += 1;
        state.cartTotal += itemToIncrease.price;
      }
    },
    decreaseTheCart: (state, action: PayloadAction<Product>) => {
      const itemToRemove = state.cartItems.find(item => item._id === action.payload._id);

      if (itemToRemove) {
        state.cartNumber -= 1;
        state.cartTotal -= itemToRemove.price;
        state.cartItems = state.cartItems.filter(cart => cart._id !== action.payload._id);
      }
    }
  }
});

export const { addToCart, increaseTheCart, decreaseTheCart } = cartSlice.actions;
export default cartSlice.reducer;
