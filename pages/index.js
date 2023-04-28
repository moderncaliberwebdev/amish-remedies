import styles from '../styles/Home.module.scss'
import Layout from '../Components/Layout'
import Link from 'next/link'

import { getProductsInCollection } from '../lib/shopify'
import { useEffect } from 'react'
import CollectionCarousel from '../Components/CollectionCarousel'

import { selectAuthState, setAuthState } from '../store/authSlice'
import { useDispatch, useSelector } from 'react-redux'

export default function Home({ products }) {
  const authState = useSelector(selectAuthState)
  const dispatch = useDispatch()

  //shows me products gathered from graphql api
  useEffect(() => {
    console.log(products)
  }, [products])

  return (
    <Layout>
      <div className={styles.header}>
        <div className={styles.header__left}>
          <h1>Find the natural remedy that is best for you!</h1>
          <p>Premium natural formula that helps your body feel its best</p>
          <Link href='/products?collection=remedies'>Shop Now</Link>
        </div>
        <div className={styles.header__right_bottles}>
          <img src='/home/header-bottles.png' alt='Amish Remedy Bottles' />
        </div>
      </div>
      {/* REDUX TEST STATE  */}
      {/* <div>
        <div>{authState ? 'Logged in' : 'Not Logged In'}</div>
        <button
          onClick={() =>
            authState
              ? dispatch(setAuthState(false))
              : dispatch(setAuthState(true))
          }
        >
          {authState ? 'Logout' : 'LogIn'}
        </button>
      </div> */}
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
          <Link href='/products?collection=hatching-eggs'>Shop Now</Link>
        </div>
      </div>
      <CollectionCarousel collection={products[1]} />

      <div className={styles.stats}>
        <div className={styles.stats__stat}>
          <img src='/home/people.png' alt='Happy Customers Icon' />
          <div>
            <h3>500+</h3>
            <p>Happy Customers</p>
          </div>
        </div>
        <div className={styles.stats__stat}>
          <img src='/home/thumbs-up.png' alt='Positive Feedback' />
          <div>
            <h3>100%</h3>
            <p>Positive Feedback</p>
          </div>
        </div>
        <div className={styles.stats__stat}>
          <img src='/home/box.png' alt='Simple Products' />
          <div>
            <h3>2</h3>
            <p>Simple Products</p>
          </div>
        </div>
      </div>
      <div className={styles.ingredients}>
        <div className={styles.ingredients__graphic}>
          <img
            src='/home/ingredients-bottles.png'
            alt='Old Amish Remedy Bottles'
          />
        </div>
        <div className={styles.ingredients__info}>
          <h2>All Natural Ingredients to Boost Health and Wellness</h2>
          <ul>
            <li>All Natural Ginger</li>
            <li>Apple Cider Vinegar</li>
            <li>Garlic Juice</li>
          </ul>
        </div>
        <img
          className={styles.ingredients__gummies}
          src='/home/gummies.png'
          alt='Gummy graphic'
        />
        <img
          className={styles.ingredients__apple}
          src='/home/apple.png'
          alt='Apple'
        />
      </div>
    </Layout>
  )
}
export async function getStaticProps() {
  const products = await getProductsInCollection()

  return {
    props: { products }, // will be passed to the page component as props
  }
}
