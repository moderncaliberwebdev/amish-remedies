import React, { useEffect, useState } from 'react'
import Layout from '../../Components/Layout'
import styles from '../../styles/products.module.scss'
import { getAllProducts, getCollections } from '../../lib/shopify'
import Product from '../../Components/Product'
import { useRouter } from 'next/router'
import Fuse from 'fuse.js'
import { useMediaQuery } from 'react-responsive'

export default function Products({ products, collections }) {
  const router = useRouter()
  const { query } = router
  const [displayProducts, setDisplayProducts] = useState(products)
  const [filterCollectionName, setFilterCollectionName] = useState(
    query.collection || ''
  )
  const [filterPrice, setFilterPrice] = useState(query.price || '')
  const [filterKeyword, setFilterKeyword] = useState(query.keyword || '')
  const [filterOpen, setFilterOpen] = useState(false)
  const [productSortValue, setProductSortValue] = useState('Featured')

  const isMobile = useMediaQuery({ query: '(max-width: 1000px)' })

  useEffect(() => {
    let filteredProducts = products

    if (filterCollectionName) {
      filteredProducts = filteredProducts.filter(
        (product) =>
          product.node.collections.nodes[0].title === filterCollectionName
      )
    }

    if (filterPrice) {
      const priceRangeStart = Number(filterPrice)
      const priceRangeEnd = priceRangeStart + 10
      filteredProducts = filteredProducts.filter((product) => {
        const price = Number(product.node.priceRange.minVariantPrice.amount)
        return (
          price >= priceRangeStart &&
          (priceRangeStart === 40 ? true : price <= priceRangeEnd)
        )
      })
    }

    if (filterKeyword) {
      const options = {
        keys: ['node.title'],
        includeScore: true,
        ignoreLocation: true,
        threshold: 0.3,
      }
      const fuse = new Fuse(filteredProducts, options)
      const result = fuse.search(filterKeyword)
      filteredProducts = result.map((item) => item.item)
    }

    setDisplayProducts(filteredProducts)
    filterProducts()
  }, [filterCollectionName, filterPrice, filterKeyword])

  const toggleFilter = () => {
    if (isMobile) {
      const filters = document.querySelector('#filters')
      const expand = document.querySelector('#expand')

      filters.style.display = filterOpen ? 'none' : 'block'
      filters.style.maxHeight = filterOpen ? '0' : '50rem'

      expand.style.transform = filterOpen ? 'rotate(0deg)' : 'rotate(180deg)'

      setFilterOpen(!filterOpen)
    }
  }

  const filterProducts = (search) => {
    console.log('filter products')
    router.push(
      `/products?collection=${filterCollectionName}&price=${filterPrice}&keyword=${filterKeyword}`
    )
  }

  const filterListener = (number) => {
    String(query.price) === String(number)
      ? setFilterPrice('')
      : setFilterPrice(number)
  }

  return (
    <Layout>
      <div className={styles.header}>
        <div className={styles.header__left}>
          <h1>
            {filterCollectionName.length > 0
              ? filterCollectionName
              : 'All Products'}
          </h1>
          <p>
            {displayProducts.length}
            {displayProducts.length == 1 ? ' Product' : ' Products'}
          </p>
        </div>
        <div className={styles.header__right}>
          <img
            src={
              filterCollectionName == 'Hatching Eggs'
                ? '/home/eggs.png'
                : '/products/products.png'
            }
            alt='Amish Products Banner'
          />
        </div>
      </div>
      <div className={styles.products}>
        <div className={styles.products__filter}>
          <div
            className={styles.products__filter__header}
            onClick={toggleFilter}
          >
            <h2>Filters</h2>
            <img src='/products/expand.png' alt='Expand Arrow' id='expand' />
          </div>
          <div className={styles.products__filter__filters} id='filters'>
            <div className={styles.products__filter__filters__search}>
              <input
                type='text'
                placeholder='Keyword Search'
                onChange={(e) => setFilterKeyword(e.target.value)}
                value={filterKeyword}
                onKeyDown={(e) => e.key === 'Enter' && filterProducts('search')}
              />
              <img
                src='/home/Search.png'
                alt='Search'
                onClick={() => filterProducts('search')}
              />
            </div>
            <h3>Product Type</h3>
            <div className={styles.products__filter__filters__options}>
              {collections.map((collectionName) => {
                return (
                  <p
                    onClick={() => {
                      console.log(query.collection, collectionName.title)
                      String(query.collection) === String(collectionName.title)
                        ? setFilterCollectionName('')
                        : setFilterCollectionName(collectionName.title)
                    }}
                    key={collectionName.title}
                    style={{
                      color:
                        query.collection &&
                        collectionName.title == query.collection &&
                        '#ebb54a',
                    }}
                  >
                    {collectionName.title}
                  </p>
                )
              })}
            </div>
            <h3>Price</h3>
            <div className={styles.products__filter__filters__options}>
              <p
                onClick={() => filterListener(0)}
                style={{
                  color: query.price && query.price == 0 && '#ebb54a',
                }}
              >
                $0-$10
              </p>
              <p
                onClick={() => filterListener(10)}
                style={{
                  color: query.price && query.price == 10 && '#ebb54a',
                }}
              >
                $10-$20
              </p>
              <p
                onClick={() => filterListener(20)}
                style={{
                  color: query.price && query.price == 20 && '#ebb54a',
                }}
              >
                $20-$30
              </p>
              <p
                onClick={() => filterListener(30)}
                style={{
                  color: query.price && query.price == 30 && '#ebb54a',
                }}
              >
                $30-$40
              </p>
              <p
                onClick={() => filterListener(40)}
                style={{
                  color: query.price && query.price == 40 && '#ebb54a',
                }}
              >
                $40+
              </p>
            </div>
          </div>
        </div>
        <div className={styles.products__productlist}>
          <div className={styles.products__productlist__sort}>
            <label>Sort By:</label>
            <select
              id='standard-select'
              value={productSortValue}
              onChange={(e) => setProductSortValue(e.target.value)}
            >
              <option value='Featured'>Featured</option>
              <option value='Price: Low-High'>Price: Low-High</option>
              <option value='Price: High-Low'>Price: High-Low</option>
            </select>
          </div>
          <div className={styles.products__productlist__products}>
            {displayProducts.length > 0 ? (
              displayProducts
                .sort((a, b) => {
                  //sort products by price, low to high
                  if (productSortValue == 'Price: Low-High') {
                    return (
                      parseFloat(a.node.priceRange.minVariantPrice.amount) -
                      parseFloat(b.node.priceRange.minVariantPrice.amount)
                    )
                  }
                  //sort products by price, high to low
                  else if (productSortValue == 'Price: High-Low') {
                    return (
                      parseFloat(b.node.priceRange.minVariantPrice.amount) -
                      parseFloat(a.node.priceRange.minVariantPrice.amount)
                    )
                  }
                  //sort products alphabetically by title
                  else {
                    if (a.node.title < b.node.title) {
                      return -1
                    }
                    if (a.node.title > b.node.title) {
                      return 1
                    }
                    return 0
                  }
                })
                .map((product) => {
                  return (
                    <Product
                      image={product.node.featuredImage.url}
                      title={product.node.title}
                      price={product.node.priceRange.minVariantPrice.amount}
                      page={product.node.handle}
                      key={product.node.handle}
                    />
                  )
                })
            ) : (
              <p>No Products</p>
            )}
            {/* <Product
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
            /> */}
          </div>
        </div>
      </div>
    </Layout>
  )
}

export async function getServerSideProps(context) {
  const products = await getAllProducts()
  const collections = await getCollections()

  return {
    props: { products, collections },
  }
}
