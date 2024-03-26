import React from 'react'
import Layout from '../Components/Layout'
import styles from '../styles/Categories.module.scss'
import Link from 'next/link'

export default function Categories() {
  return (
    <Layout>
      <div className={styles.left}>
        <div className={`${styles.left__block} ${styles.block}`}>
          <img src='/categories/bottle.png' alt='Remedy Bottle' />
          <h3>Remedies</h3>
        </div>
        <div className={`${styles.left__text} ${styles.text}`}>
          <h2>Remedies</h2>
          <p>
            Discover the natural power of our Remedies collection! This
            collection features all-natural remedies that are designed to
            provide relief from acid reflux and cramps. Made with the highest
            quality natural ingredients, our remedies are based on traditional
            Amish recipes that have been passed down through generations. Unlike
            many modern remedies that rely on chemicals, our remedies are gentle
            on the body and provide safe, effective relief. If you're looking
            for a natural way to improve your health and wellbeing, our Remedies
            collection is the perfect place to start. Try it today!
          </p>
          <Link href='/products?collection=Remedies&price=&keyword='>
            Shop Now
          </Link>
        </div>
      </div>
      <div className={styles.right}>
        <div className={`${styles.right__text} ${styles.text}`}>
          <h2>Fertile Hatching Eggs</h2>
          <p>
            If you're looking to start your own backyard flock or expand your
            current one, our fertile hatching eggs are the perfect option for
            you. All of our eggs come from our carefully selected, healthy and
            happy birds that are raised with the utmost care and attention. Our
            fertile hatching eggs are never intended for human consumption, and
            are sold only for the purpose of hatching into adorable baby chicks.
            When you purchase our fertile hatching eggs, you'll receive eggs
            that are at peak fertility and have been carefully packaged and
            shipped to ensure their safe arrival.
          </p>
          <Link href='/products?collection=Hatching%20Eggs&price=&keyword='>
            Shop Now
          </Link>
        </div>
        <div className={`${styles.right__block} ${styles.block}`}>
          <img src='/home/eggs.png' alt='Hatching Eggs' />
          <h3>Fertile Hatching Eggs</h3>
        </div>
      </div>
      {/* <div className={styles.left}>
        <div className={`${styles.left__block} ${styles.block}`}>
          <img src='/categories/bottle.png' alt='Remedy Bottle' />
          <h3>Bargains and Gift Sets</h3>
        </div>
        <div className={`${styles.left__text} ${styles.text}`}>
          <h2>Bargains and Gift Sets</h2>
          <p>
            Discover the natural power of our Remedies collection! This
            collection features all-natural remedies that are designed to
            provide relief from acid reflux and cramps. Made with the highest
            quality natural ingredients, our remedies are based on traditional
            Amish recipes that have been passed down through generations. Unlike
            many modern remedies that rely on chemicals, our remedies are gentle
            on the body and provide safe, effective relief. If you're looking
            for a natural way to improve your health and wellbeing, our Remedies
            collection is the perfect place to start. Try it today!
          </p>
          <Link href='/products?collection=Remedies'>Shop Now</Link>
        </div>
      </div> */}
    </Layout>
  )
}
