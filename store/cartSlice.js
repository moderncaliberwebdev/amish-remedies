import { createSlice } from '@reduxjs/toolkit'
import { HYDRATE } from 'next-redux-wrapper'

// Initial state
const initialState = {
  cartState: { items: [] },
}

// Actual Slice
export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    // Action to set the cart status
    setCartState(state, action) {
      state.cartState = action.payload
    },
    addToCart(state, action) {
      state.cartState.items.push(action.payload)
    },
    removeFromCart(state, action) {
      return state.cartState.items.filter((item) => item.id !== action.payload)
    },
  },

  // Special reducer for hydrating the state. Special case for next-redux-wrapper
  extraReducers: (builder) => {
    builder.addCase(HYDRATE, (state, action) => {
      return {
        ...state,
        ...action.payload.cart,
      }
    })
  },
})

export const { setCartState, addToCart, removeFromCart } = cartSlice.actions

export const selectCartState = (state) => state.cart.cartState

export default cartSlice.reducer
