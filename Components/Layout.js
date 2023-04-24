import styles from '../styles/Layout.module.scss'
import Link from 'next/link'

export default function Layout({ children }) {
  return (
    <>
      <nav className={styles.nav}>
        <ul>
          <li>
            <img
              className={styles.nav__search}
              src='/home/Search.png'
              alt='Search'
            />
          </li>
          <li>Products</li>
          <li>Shop by Category</li>
          <li>
            <img className={styles.nav__logo} src='/home/logo.png' alt='Logo' />
          </li>
          <li>Learn</li>
          <li>Contact Us</li>
          <li>
            <div className={styles.nav__cart}>
              <img src='/home/Shopping-Cart.png' alt='Cart' />
            </div>
          </li>
        </ul>
      </nav>
      <main>{children}</main>
      <footer className={styles.footer}></footer>
    </>
  )
}
