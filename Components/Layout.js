import { useState } from 'react'
import styles from '../styles/Layout.module.scss'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { clearCart, selectCartState } from '../store/cartSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { cartExists } from '../lib/shopify'

export default function Layout({ children }) {
  const dispatch = useDispatch()

  //get queries from url
  const router = useRouter()

  //redux state from cart
  const cartState = useSelector(selectCartState)

  //how many items are in the cart
  const [cartLength, setCartLength] = useState(0)

  const [search, setSearch] = useState(false)
  const [inputText, setInputText] = useState('')

  useEffect(() => {
    //update cart length when cart is updated
    let tempCartLength = 0

    if (cartState.items.length > 0) {
      cartState.items.forEach((item) => {
        tempCartLength += item.quantity
      })
    }

    setCartLength(tempCartLength)

    //clear cart after user reopens website after checkout
    const checkCartExists = async () => {
      if (cartState.cartId.length > 0) {
        const cartExistsResponse = await cartExists(cartState.cartId)

        console.log(cartExistsResponse)
        if (cartExistsResponse.cart == null) {
          dispatch(clearCart())
        }
      }
    }
    checkCartExists()
  }, [cartState])

  const toggleSearch = () => {
    const searchComponent = document.querySelector('#search')

    searchComponent.style.top = !search ? 0 : '-20%'

    setSearch(!search)
  }

  const searchForKeyword = () => {
    router.push(`/products?collection=&price=&keyword=${inputText}`)
  }

  return (
    <>
      <nav className={styles.nav}>
        <ul>
          <li>
            <img
              className={`${styles.nav__search} ${styles.nav__desktop}`}
              src='/home/Search.png'
              alt='Search'
              onClick={toggleSearch}
            />
            <img
              className={`${styles.nav__search} ${styles.nav__mobile}`}
              src='/home/menu.png'
              alt='Search'
            />
          </li>
          <li className={styles.nav__desktop}>
            <Link href='/products'>Products</Link>
          </li>
          <li className={styles.nav__desktop}>
            <Link href='/categories'>Shop by Category</Link>
          </li>
          <li>
            <Link href='/'>
              <img
                className={styles.nav__logo}
                src='/home/logo.png'
                alt='Logo'
              />
            </Link>
          </li>
          <li className={styles.nav__desktop}>
            <Link href='/learn'>Learn</Link>
          </li>
          <li className={styles.nav__desktop}>
            <Link href='/contact'>Contact Us</Link>
          </li>
          <li>
            <Link href='/cart'>
              <div className={styles.nav__cart}>
                <img src='/home/Shopping-Cart.png' alt='Cart' />
                {cartLength > 0 && <p>{cartLength}</p>}
              </div>
            </Link>
          </li>
        </ul>
      </nav>
      <div className={styles.search} id='search'>
        <div className={styles.search__searchbar}>
          <input
            type='text'
            placeholder='Search Products...'
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && searchForKeyword()}
          />
          <img src='/home/Search.png' alt='Search' onClick={searchForKeyword} />
        </div>
        <img
          src='/home/Close.png'
          alt='Close Search bar'
          onClick={toggleSearch}
        />
      </div>
      <main>{children}</main>
      <footer className={styles.footer}>
        <div className={styles.footer__top}>
          <img src='/home/logo.png' alt='Old Amish Remedies Plus Logo' />
          <ul>
            <li>
              <Link href='/products'>Products</Link>
            </li>
            <li>
              <Link href='/products?collection=Remedies&price=&keyword='>
                Remedies
              </Link>
            </li>
            <li>
              <Link href='/products?collection=Hatching%20Eggs&price=&keyword='>
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
              <Link href='/learn/ingredients'>Ingredients</Link>
            </li>
            <li>
              <Link href='/learn/history'>History</Link>
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
