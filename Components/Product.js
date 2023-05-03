import Link from 'next/link'
import styles from '../styles/Product.module.scss'
import { useDispatch } from 'react-redux'
import { addToCart } from '../store/cartSlice'

function ProductCard({ image, title, price, page }) {
  const dispatch = useDispatch()

  return (
    <div className={styles.card}>
      <Link href={`/products/${page}`}>
        <div className={styles.card__img}>
          <img src={image} alt={title} />
        </div>
      </Link>
      <div className={styles.card__info}>
        <Link href={`/products/${page}`}>
          <h3>{title}</h3>
          <p>${price}</p>
        </Link>
        <button
          onClick={() => dispatch(addToCart({ image, title, price, page }))}
        >
          Add to Cart
        </button>
      </div>
    </div>
  )
}

export default ProductCard
