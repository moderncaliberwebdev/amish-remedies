import Link from 'next/link'
import styles from '../styles/Product.module.scss'
import { useDispatch } from 'react-redux'
import { addToCart } from '../store/cartSlice'
import { useRouter } from 'next/router'
import { useMediaQuery } from 'react-responsive'

function ProductCard({ image, title, price, page, carousel, index }) {
  const dispatch = useDispatch()
  const router = useRouter()

  const tabPort = useMediaQuery({
    query: '(max-width: 900px)',
  })
  const phone = useMediaQuery({
    query: '(max-width: 600px)',
  })

  return (
    <div
      className={styles.card}
      style={{
        marginLeft:
          carousel &&
          index == 0 &&
          (phone ? '2rem' : tabPort ? '5rem' : '8rem'),
      }}
    >
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
          onClick={() => {
            dispatch(
              addToCart({
                image,
                title,
                price,
                page,
                quantity: 1,
              })
            )

            router.push('/cart')
          }}
        >
          Add to Cart
        </button>
      </div>
    </div>
  )
}

export default ProductCard
