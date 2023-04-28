import React, { useEffect, useState } from 'react'
import { getAllProducts, getProductByHandle } from '../../lib/shopify'
import Layout from '../../Components/Layout'
import styles from '../../styles/ProductPage.module.scss'

export default function ProductPage({ product }) {
  const [cartItems, setCartItems] = useState(1)

  useEffect(() => {
    console.log(product)
  }, [product])
  return (
    <Layout>
      <div className={styles.product}>
        <div className={styles.product__image}>
          <img src={product.images.nodes[0].url} alt={product.title} />
        </div>
        <div className={styles.product__details}>
          <h1>{product.title}</h1>
          <p>${product.priceRange.minVariantPrice.amount}</p>
          <div className={styles.product__details__counter}>
            <img src='/product/minus.png' alt='Minus Item' />
            <p>{cartItems}</p>
            <img src='/product/plus.png' alt='Plus Item' />
          </div>
          <button>Add to Cart</button>
        </div>
      </div>
      <div
        className={styles.description}
        dangerouslySetInnerHTML={{ __html: product.descriptionHtml }}
      ></div>
    </Layout>
  )
}

export async function getStaticPaths() {
  const products = await getAllProducts()
  const pathsArray = products.map((product) => product.node.handle)
  const paths = []

  pathsArray.forEach((path) => paths.push({ params: { handle: path } }))
  console.log(paths)

  return {
    paths,
    fallback: false,
  }
}

export async function getStaticProps({ params }) {
  const product = await getProductByHandle(params.handle)

  return {
    props: { product }, // will be passed to the page component as props
  }
}
