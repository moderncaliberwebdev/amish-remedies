import React, { useState } from 'react'
import { getAllProducts, getProductByHandle } from '../../lib/shopify'
import Layout from '../../Components/Layout'
import styles from '../../styles/ProductPage.module.scss'
import { useDispatch } from 'react-redux'
import { addToCart } from '../../store/cartSlice'
import { useRouter } from 'next/router'
import 'react-responsive-carousel/lib/styles/carousel.min.css' // requires a loader
import { Carousel } from 'react-responsive-carousel'

export default function ProductPage({ product }) {
  const dispatch = useDispatch()
  const router = useRouter()

  const [cartItems, setCartItems] = useState(1)

  const incrementCartItems = () => {
    setCartItems(cartItems - 1)
  }

  console.log('product >> ', product)

  return (
    <Layout>
      <div className={styles.product}>
        <div className={styles.product__image}>
          <Carousel showThumbs={false} showArrows={true}>
            {product.images.nodes.map((img) => (
              <div>
                <img src={img.url} alt={product.title} />
              </div>
            ))}
          </Carousel>
        </div>
        <div className={styles.product__details}>
          <h1>{product.title}</h1>
          <p>${product.priceRange.minVariantPrice.amount}</p>
          <div className={styles.product__details__counter}>
            <img
              src='/product/minus.png'
              alt='Minus Item'
              onClick={() => cartItems > 0 && setCartItems(cartItems - 1)}
            />
            <p>{cartItems}</p>
            <img
              src='/product/plus.png'
              alt='Plus Item'
              onClick={() => cartItems < 100 && setCartItems(cartItems + 1)}
            />
          </div>
          <button
            onClick={() => {
              dispatch(
                addToCart({
                  image: product.images.nodes[0].url,
                  title: product.title,
                  price: product.priceRange.minVariantPrice.amount,
                  page: product.handle,
                  quantity: cartItems,
                })
              )

              router.push('/cart')
            }}
          >
            Add to Cart
          </button>
        </div>
      </div>
      <div
        className={styles.description}
        dangerouslySetInnerHTML={{ __html: product.descriptionHtml }}
      ></div>
    </Layout>
  )
}

export async function getServerSideProps({ params }) {
  const product = await getProductByHandle(params.handle)

  return {
    props: { product }, // will be passed to the page component as props
  }
}
