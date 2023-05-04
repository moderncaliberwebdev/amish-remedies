import React from 'react'
import styles from '../styles/Cart.module.scss'
import Layout from '../Components/Layout'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart, removeFromCart, selectCartState } from '../store/cartSlice'
import Link from 'next/link'
import { useState } from 'react'
import { useEffect } from 'react'
import { createCheckout, getProductVariants } from '../lib/shopify'
import { useRouter } from 'next/router'

export default function Cart({ variants }) {
  const cartState = useSelector(selectCartState)
  const dispatch = useDispatch()
  const router = useRouter()

  const [subTotal, setSubTotal] = useState(0)

  //calculate subtotal
  useEffect(() => {
    let tempSubTotal = 0

    cartState.items.forEach((item) => {
      tempSubTotal += Number(item.price) * item.quantity
    })

    setSubTotal(tempSubTotal.toFixed(2))
  }, [cartState])

  //   const createNewCheckout = async () => {
  async function createNewCheckout() {
    const lineItems = []

    //find variant that corresponds to product, get value, and push to line items array
    cartState.items.forEach((cartStateItem) => {
      variants.forEach((node) => {
        if (node.node.handle == cartStateItem.page) {
          const variantId = node.node.variants.edges[0].node.id
          lineItems.push({
            variantId,
            quantity: cartStateItem.quantity,
          })
        }
      })
    })

    console.log(lineItems)

    const checkoutResponse = await createCheckout(lineItems)

    document.querySelector('#checkoutButton').textContent = 'Loading...'
    router.push(checkoutResponse)
  }

  return (
    <Layout>
      <div className={styles.cart}>
        <h1>Your Cart</h1>
        {cartState.items.length == 0 ? (
          <div className={styles.cart__empty}>
            <h2>
              Your Cart is looking a little empty. Find something to put in it!
            </h2>
            <Link href='/products?collection=Remedies&price=&keyword='>
              Old Amish Remedies
            </Link>
            <Link href='/products?collection=Hatching%20Eggs&price=&keyword='>
              Fertile Hatching Eggs
            </Link>
          </div>
        ) : (
          <>
            <div className={styles.cart__header}>
              <h2>Product</h2>
              <h2>Quantity</h2>
              <h2>Price</h2>
            </div>
            <div className={styles.cart__items}>
              {cartState.items.map((item) => {
                return (
                  <div className={styles.cart__items__product} key={item.page}>
                    <img src={item.image} alt={item.title} />
                    <h3>{item.title}</h3>
                    <div className={styles.cart__items__product__counter}>
                      <img
                        src='/product/minus.png'
                        alt='Minus Item'
                        onClick={() => {
                          dispatch(
                            removeFromCart({
                              image: item.image,
                              title: item.title,
                              price: item.price,
                              page: item.page,
                            })
                          )
                        }}
                      />
                      <p>{item.quantity}</p>
                      <img
                        src='/product/plus.png'
                        alt='Plus Item'
                        onClick={() =>
                          dispatch(
                            addToCart({
                              image: item.image,
                              title: item.title,
                              price: item.price,
                              page: item.page,
                              quantity: 1,
                            })
                          )
                        }
                      />
                    </div>
                    <span>${item.price}</span>
                  </div>
                )
              })}
            </div>
            <div className={styles.cart__checkout}>
              <p>
                <span>Subtotal</span>${subTotal}
              </p>
              <p>Taxes and shipping calculated at checkout</p>
              <button onClick={createNewCheckout} id='checkoutButton'>
                Checkout
              </button>
            </div>
          </>
        )}
      </div>
    </Layout>
  )
}

export async function getStaticProps() {
  const variants = await getProductVariants()

  return {
    props: { variants }, // will be passed to the page component as props
  }
}
