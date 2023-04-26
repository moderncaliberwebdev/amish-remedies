import React from 'react'
import Layout from '../Components/Layout'
import styles from '../styles/Contact.module.scss'

export default function Contact() {
  return (
    <Layout>
      <div className={styles.left}>
        <h1>Have a question? Feel free to contact us!</h1>
        <p>
          Fill out the following form and we’ll get back to you as soon as
          possible
        </p>
        <form></form>
      </div>
      <div className={styles.right}></div>
    </Layout>
  )
}
