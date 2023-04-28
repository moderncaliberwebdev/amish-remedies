import React from 'react'
import styles from '../../styles/Learn.module.scss'
import Layout from '../../Components/Layout'
import Link from 'next/link'

export default function Learn() {
  return (
    <Layout>
      <div className={styles.learn}>
        <Link href='/learn/benefits' className={styles.learn__left}>
          <img src='/learn/benefits.png' alt='Benefits' />
          <h2>Benefits</h2>
        </Link>
        <Link href='/learn/ingredients' className={styles.learn__right}>
          <div className={styles.learn__right__top}>
            <img src='/learn/ginger.png' alt='Ingredients' />
            <h2>Ingredients</h2>
          </div>
          <Link href='/learn/history' className={styles.learn__right__bottom}>
            <img src='/learn/amish.png' alt='History' />
            <h2>History</h2>
          </Link>
        </Link>
      </div>
    </Layout>
  )
}
