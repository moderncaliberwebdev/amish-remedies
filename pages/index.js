import styles from '../styles/Home.module.scss'
import Layout from '../Components/Layout'
import Link from 'next/link'

// import { shopifyClient, parseShopifyResponse } from '../lib/shopify'
import { getProductsInCollection } from '../lib/shopify'
import { useEffect } from 'react'
import CollectionCarousel from '../Components/CollectionCarousel'

export default function Home({ products }) {
  useEffect(() => {
    console.log(products)
  }, [products])

  return (
    <>
      <Layout>
        <div className={styles.header}>
          <div className={styles.header__left}>
            <h1>Find the natural remedy that is best for you!</h1>
            <p>Premium natural formula that helps your body feel its best</p>
            <Link href='/products/remedies'>Shop Now</Link>
          </div>
          <div className={styles.header__right_bottles}>
            <img src='/home/header-bottles.png' alt='Amish Remedy Bottles' />
          </div>
        </div>
        <CollectionCarousel collection={products[0]} />
        <div className={styles.header}>
          <div className={styles.header__right_eggs}>
            <img src='/home/eggs.png' alt='Hatching Eggs' />
          </div>
          <div className={styles.header__left}>
            <h1>Find our fertile hatching eggs ready to incubate</h1>
            <p>
              All types of bird breeds and varieties available for hatching only
            </p>
            <Link href='/products/eggs'>Shop Now</Link>
          </div>
        </div>
        <CollectionCarousel collection={products[1]} />
      </Layout>
    </>
  )
}
export async function getStaticProps() {
  const products = await getProductsInCollection()

  return {
    props: { products }, // will be passed to the page component as props
  }
}
