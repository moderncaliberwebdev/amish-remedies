import React from 'react'
import ProductCard from './ProductCard'
import styles from '../styles/Carousel.module.scss'

function CollectionCarousel({ collection }) {
  return (
    <div className={styles.carousel}>
      <h2>Best Selling {collection.title}</h2>
      <div className={styles.carousel__container}>
        {collection.products.edges.map((product) => {
          return (
            <ProductCard
              image={product.node.featuredImage.url}
              title={product.node.title}
              price={product.node.priceRange.minVariantPrice.amount}
              page={product.node.handle}
              key={product.node.title}
            />
          )
        })}
        <ProductCard
          image={
            'https://cdn.shopify.com/s/files/1/0740/2494/3921/products/s-l1600-1.png?v=1679603451'
          }
          title={'Test'}
          price={20}
        />
        <ProductCard
          image={
            'https://cdn.shopify.com/s/files/1/0740/2494/3921/products/s-l1600-1.png?v=1679603451'
          }
          title={'Test'}
          price={20}
        />
        <ProductCard
          image={
            'https://cdn.shopify.com/s/files/1/0740/2494/3921/products/s-l1600-1.png?v=1679603451'
          }
          title={'Test'}
          price={20}
        />
        <ProductCard
          image={
            'https://cdn.shopify.com/s/files/1/0740/2494/3921/products/s-l1600-1.png?v=1679603451'
          }
          title={'Test'}
          price={20}
        />
      </div>
    </div>
  )
}

export default CollectionCarousel
