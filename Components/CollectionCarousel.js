import React, { useEffect, useRef, useState } from 'react'
import ProductCard from './ProductCard'
import Product from './Product'
import styles from '../styles/Carousel.module.scss'

function CollectionCarousel({ collection }) {
  //slider delay
  const [delay, setDelay] = useState(10000)
  const [index, setIndex] = useState(0)
  const timeoutRef = useRef(null)

  function resetTimeout() {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
  }

  useEffect(() => {
    resetTimeout()
    timeoutRef.current = setTimeout(() => {
      //sets how many times the autoplay will slide and where to slide to

      setIndex((prevIndex) =>
        prevIndex === collection.products.edges.length - 1 ? 0 : prevIndex + 1
      )
    }, delay)

    //slides autoplay based on
    scrollSlider(index > 0 ? 5 : 0)

    return () => {
      resetTimeout()
    }
  }, [index])

  const scrollSlider = (direction) => {
    const cards = document.querySelector('#cards')

    //scrolls back to 0 when autoplay reaches end
    if (direction == 0) {
      let scrollAmount = 0
      var slideTimer = setInterval(() => {
        cards.scrollLeft -= 10
        scrollAmount += 10
        if (cards.scrollLeft == 0) {
          window.clearInterval(slideTimer)
        }
      }, 3)
    } else {
      //scrolls + or - based on arrow or based on autoplay
      let scrollAmount = 0
      var slideTimer = setInterval(() => {
        cards.scrollLeft += direction
        scrollAmount += 10
        if (scrollAmount >= 380) {
          window.clearInterval(slideTimer)
        }
      }, 3)
    }
  }

  return (
    <div className={styles.carousel}>
      <h2>Best Selling {collection.title}</h2>
      <div className={styles.carousel__container}>
        <div className={styles.carousel__container__arrows}>
          <img
            src='/home/left.png'
            alt='Left Arrow'
            onClick={() => {
              // setIndex((prevIndex) => prevIndex + 1),
              scrollSlider(-10)
            }}
          />
          <img
            src='/home/right.png'
            alt='Right Arrow'
            onClick={() => {
              // collection.products.edges.length

              scrollSlider(10)
            }}
          />
        </div>
        <div
          className={styles.carousel__container__cards}
          id='cards'
          // style={{ transform: `translate3d(${-index * 30}%, 0, 0)` }}
        >
          {collection.products.edges.map((product, index) => {
            return (
              <Product
                image={product.node.featuredImage.url}
                title={product.node.title}
                price={product.node.priceRange.minVariantPrice.amount}
                page={product.node.handle}
                key={product.node.handle}
                carousel={true}
                index={index}
              />
            )
          })}
          {/* <ProductCard
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
          /> */}
        </div>
      </div>
    </div>
  )
}

export default CollectionCarousel
