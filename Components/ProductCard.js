import Link from 'next/link'
import styles from '../styles/ProductCard.module.scss'

function ProductCard({ image, title, price }) {
  return (
    <div className={styles.card}>
      <Link href='/'>
        <div className={styles.card__img}>
          <img src={image} alt={title} />
        </div>
      </Link>
      <div className={styles.card__info}>
        <Link href='/'>
          <h3>{title}</h3>
          <p>${price}</p>
        </Link>
        <button onClick={() => alert('Product')}>Add to Cart</button>
      </div>
    </div>
  )
}

export default ProductCard
