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
      <footer className={styles.footer}>
        <div className={styles.footer__top}>
          <img src='/home/logo.png' alt='Old Amish Remedies Plus Logo' />
          <ul>
            <li>
              <Link href='/products'>Products</Link>
            </li>
            <li>
              <Link href='/products?collection=remedies'>Remedies</Link>
            </li>
            <li>
              <Link href='/products?collection=hatching-eggs'>
                Fertile Hatching Eggs
              </Link>
            </li>
          </ul>
          <ul>
            <li>
              <Link href='/learn'>Learn</Link>
            </li>
            <li>
              <Link href='/learn/benefits'>Benefits</Link>
            </li>
            <li>
              <Link href='/learn/Ingredients'>Ingredients</Link>
            </li>
            <li>
              <Link href='/learn/History'>History</Link>
            </li>
          </ul>
          <ul>
            <li>
              <Link href='/contact'>Contact</Link>
            </li>
            <li>
              <Link href='tel:717-777-777'>717-777-777</Link>
            </li>
            <li>
              <Link href='mailto:harold@oldamishremedies.com'>
                harold@oldamishremedies.com
              </Link>
            </li>
          </ul>
        </div>
        <div className={styles.footer__bottom}>
          <Link href='/terms-and-conditions'>Terms and Conditions</Link>
          <p className={styles.footer__bottom__disclaimer}>
            These statements have not been evaluated by the Food and Drug
            Administration. This product is not intended to diagnose, treat,
            cure or prevent any disease.
          </p>
          <div>
            <p className={styles.footer__bottom__copyright}>
              © Copyright 2023 by Destefano Enterprises
            </p>
            <p>
              Designed and Developed by
              <a href='https://moderncaliber.com/'>
                Modern Caliber Web Development
              </a>
            </p>
          </div>
        </div>
      </footer>
    </>
  )
}
