import { createSlice } from '@reduxjs/toolkit'
import { HYDRATE } from 'next-redux-wrapper'

// Initial state
const initialState = {
  cartState: { items: [], cartId: '' },
}

// Actual Slice
export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action) {
      const item = action.payload

      const existItem = state.cartState.items.find((x) => x.page == item.page)

      //if item exists, increase the quantity instad of adding a new object
      if (existItem) {
        return {
          ...state,
          cartState: {
            items: state.cartState.items.map((x) =>
              x.page == existItem.page
                ? {
                    image: item.image,
                    title: item.title,
                    price: item.price,
                    page: item.page,
                    quantity: existItem.quantity + item.quantity,
                  }
                : x
            ),
            cartId: state.cartState.cartId,
          },
        }
      }
      //if item doesn't exist, add it to cart
      else {
        state.cartState.items.push(action.payload)
      }
    },
    removeFromCart(state, action) {
      const item = action.payload

      const existItem = state.cartState.items.find((x) => x.page == item.page)

      //if item's quantity is 1 and it is decreased to 0 remove it
      if (existItem.quantity == 1) {
        return {
          ...state,
          cartState: {
            items: state.cartState.items.filter((x) => x.page !== item.page),
            cartId: state.cartState.cartId,
          },
        }
      }
      // decrease item quantity
      else {
        return {
          ...state,
          cartState: {
            items: state.cartState.items.map((x) =>
              x.page == existItem.page
                ? {
                    image: item.image,
                    title: item.title,
                    price: item.price,
                    page: item.page,
                    quantity: existItem.quantity - 1,
                  }
                : x
            ),
            cartId: state.cartState.cartId,
          },
        }
      }
    },
    addCartId(state, action) {
      return {
        ...state,
        cartState: {
          items: state.cartState.items,
          cartId: action.payload,
        },
      }
    },
    clearCart(state, action) {
      return {
        ...state,
        cartState: {
          items: [],
          cartId: '',
        },
      }
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

export const { setCartState, addToCart, removeFromCart, addCartId, clearCart } =
  cartSlice.actions

export const selectCartState = (state) => state.cart.cartState

export default cartSlice.reducer
