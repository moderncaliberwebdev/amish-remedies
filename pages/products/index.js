import React, { useEffect, useState } from 'react'
import Layout from '../../Components/Layout'
import styles from '../../styles/products.module.scss'
import { getAllProducts, getCollections } from '../../lib/shopify'
import Product from '../../Components/Product'
import { useRouter } from 'next/router'
import Fuse from 'fuse.js'
import { useMediaQuery } from 'react-responsive'

export default function Products({ products, collections }) {
  //get queries from url
  const { query } = useRouter()
  const router = useRouter()

  //state for the products that are displayed on the page
  const [displayProducts, setDisplayProducts] = useState([])

  //after the api gets the products, it sends them here
  const [productsFromAPI, setProductsFromAPI] = useState([])

  //the state of the indivdual filters
  const [filterCollectionName, setFilterCollectionName] = useState('')
  const [filterPrice, setFilterPrice] = useState('')
  const [filterKeyword, setFilterKeyword] = useState('')
  const [filterOpen, setFilterOpen] = useState(false)

  //state for sorting products
  const [productSortValue, setProductSortValue] = useState('Featured')

  const isMobile = useMediaQuery({
    query: '(max-width: 1000px)',
  })

  //shows me products and collections gathered from graphql api
  useEffect(() => {
    setProductsFromAPI(products)
  }, [products])
  useEffect(() => {}, [collections])

  //run filter function when one of the filters is changed
  useEffect(() => {
    console.log('product filtering')
    filterProducts()
  }, [filterCollectionName, filterPrice, filterKeyword])

  //filter results on url update
  useEffect(() => {
    //new filtered products array
    let filteredDisplayProducts = productsFromAPI

    //if there are display products, run the filter
    if (productsFromAPI.length > 0) {
      const collectionFromQuery = query.collection
      const priceFromQuery = query.price
      const keywordFromQuery = query.keyword

      //if there is a collection filter, filter products by it
      if (collectionFromQuery && collectionFromQuery.length > 0) {
        const tempArray = []
        setFilterCollectionName(collectionFromQuery)
        filteredDisplayProducts.forEach((product) => {
          const collectionFromProduct = product.node.collections.nodes[0].title
          if (collectionFromQuery == collectionFromProduct) {
            tempArray.push(product)
          }
        })

        //set filtered products to be the values of the temp array
        filteredDisplayProducts = tempArray
      }

      // if there is a price filter, filter the remaining products by it
      if (priceFromQuery && priceFromQuery.length > 0) {
        const tempArray = []

        setFilterPrice(priceFromQuery)
        const priceRangeStart = Number(priceFromQuery)
        const priceRangeEnd = Number(priceFromQuery + 10)

        filteredDisplayProducts.forEach((product) => {
          const price = Number(product.node.priceRange.minVariantPrice.amount)

          //if product is in the price range, add it to temp array
          if (priceRangeStart == 40 && price >= 40) {
            tempArray.push(product)
          } else if (price >= priceRangeStart && price <= priceRangeEnd) {
            tempArray.push(product)
          }
        })

        //set filtered products to be the values of the temp array
        filteredDisplayProducts = tempArray
      }

      //if there is a keyword filter, filter the remaining products by it
      if (keywordFromQuery && keywordFromQuery.length > 0) {
        const tempArray = []
        setFilterKeyword(keywordFromQuery)

        const options = {
          keys: ['node.title'],
          includeScore: true,
          ignoreLocation: true,
          threshold: 0.3,
        }

        const fuseProducts = new Fuse(filteredDisplayProducts, options)

        const pattern = keywordFromQuery || ''

        const productsSearch = fuseProducts.search(pattern)

        productsSearch.forEach((product) => tempArray.push(product.item))

        filteredDisplayProducts = tempArray
      }

      //if there are any query parameters, set the filtered products to display, otherwise display all of them
      if (collectionFromQuery || priceFromQuery || keywordFromQuery) {
        router.isReady && setDisplayProducts(filteredDisplayProducts)
      } else setDisplayProducts(productsFromAPI)
    }
  }, [query, productsFromAPI])

  //sets filter to open when switching to desktop
  useEffect(() => {
    const filters = document.querySelector('#filters')
    const expand = document.querySelector('#expand')
    if (!isMobile) {
      filters.style.display = 'block'
      filters.style.maxHeight = '50rem'

      expand.style.transform = 'rotate(0deg)'

      setFilterOpen(false)
    } else {
      filters.style.display = 'none'
      filters.style.maxHeight = '0'
    }
  }, [isMobile])

  //send user to filtered product page when clicked by a filter
  const filterProducts = (search) => {
    //prevents keyword search from happening unless the search button is pressed
    // if (query.keyword != filterKeyword && !search) {
    //   return
    // } else
    router.push(
      `/products?collection=${filterCollectionName}&price=${filterPrice}&keyword=${filterKeyword}`
    )
  }

  //filter the price -> if the price is already selected, unselect it
  const filterListener = (number) => {
    String(query.price) === String(number)
      ? setFilterPrice('')
      : setFilterPrice(number)
  }

  //toggle mobile filter
  const toggleFilter = () => {
    if (isMobile) {
      console.log('toggle filter')
      const filters = document.querySelector('#filters')
      const expand = document.querySelector('#expand')

      filters.style.display = filterOpen ? 'none' : 'block'
      filters.style.maxHeight = filterOpen ? '0' : '50rem'

      expand.style.transform = filterOpen ? 'rotate(0deg)' : 'rotate(180deg)'

      setFilterOpen(!filterOpen)
    }
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
                    onClick={() =>
                      String(query.collection) === String(collectionName.title)
                        ? setFilterCollectionName('')
                        : setFilterCollectionName(collectionName.title)
                    }
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

export async function getStaticProps() {
  const products = await getAllProducts()
  const collections = await getCollections()

  return {
    props: { products, collections }, // will be passed to the page component as props
  }
}
