import React, { useEffect } from 'react'
import Layout from '../../Components/Layout'
import styles from '../../styles/products.module.scss'
import { getAllProducts } from '../../lib/shopify'
import Product from '../../Components/Product'

export default function Products({ products }) {
  //shows me products gathered from graphql api
  useEffect(() => {
    console.log(products)
  }, [products])

  return (
    <Layout>
      <div className={styles.header}>
        <div className={styles.header__left}>
          <h1>All Products</h1>
          <p>508 Products</p>
        </div>
        <div className={styles.header__right}>
          <img src='/products/products.png' alt='Amish Remedy Bottles' />
        </div>
      </div>
      <div className={styles.products}>
        <div className={styles.products__filter}>
          <h2>Filters</h2>
          <div className={styles.products__filter__search}>
            <input type='text' placeholder='Keyword Search' />{' '}
            <img src='/home/Search.png' alt='Search' />
          </div>
          <h3>Product Type</h3>
          <div className={styles.products__filter__options}>
            <p>Remedies</p>
            <p>Hatching Eggs</p>
          </div>
          <h3>Price</h3>
          <div className={styles.products__filter__options}>
            <p>$0-$10</p>
            <p>$10-$20</p>
            <p>$20-$30</p>
            <p>$30-$40</p>
          </div>
        </div>
        <div className={styles.products__productlist}>
          <div className={styles.products__productlist__sort}>
            <label>Sort By:</label>
            <select id='standard-select'>
              <option value='Featured'>Featured</option>
              <option value='Price: Low-High'>Price: Low-High</option>
              <option value='Price: High-Low'>Price: High-Low</option>
            </select>
          </div>
          <div className={styles.products__productlist__products}>
            {products.map((product) => {
              return (
                <Product
                  image={product.node.featuredImage.url}
                  title={product.node.title}
                  price={product.node.priceRange.minVariantPrice.amount}
                  page={product.node.handle}
                  key={product.node.handle}
                />
              )
            })}
            <Product
              image={
                'https://cdn.shopify.com/s/files/1/0740/2494/3921/products/s-l1600-1.png?v=1679603451'
              }
              title={'Test'}
              price={20}
            />
            <Product
              image={
                'https://cdn.shopify.com/s/files/1/0740/2494/3921/products/s-l1600-1.png?v=1679603451'
              }
              title={'Test'}
              price={20}
            />
            <Product
              image={
                'https://cdn.shopify.com/s/files/1/0740/2494/3921/products/s-l1600-1.png?v=1679603451'
              }
              title={'Test'}
              price={20}
            />
            <Product
              image={
                'https://cdn.shopify.com/s/files/1/0740/2494/3921/products/s-l1600-1.png?v=1679603451'
              }
              title={'Test'}
              price={20}
            />
          </div>
        </div>
      </div>
    </Layout>
  )
}

export async function getStaticProps() {
  const products = await getAllProducts()

  return {
    props: { products }, // will be passed to the page component as props
  }
}
