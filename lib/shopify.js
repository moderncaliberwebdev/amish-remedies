// import Client from 'shopify-buy'
// export const shopifyClient = Client.buildClient({
//   storefrontAccessToken: process.env.SHOPIFY_STORE_FRONT_ACCESS_TOKEN,
//   domain: process.env.SHOPIFY_STORE_DOMAIN,
// })

// export const parseShopifyResponse = (response) =>
//   JSON.parse(JSON.stringify(response))

const domain = process.env.SHOPIFY_STORE_DOMAIN
const storefrontAccessToken = process.env.SHOPIFY_STORE_FRONT_ACCESS_TOKEN

//get data from shopify graphql pi
async function ShopifyData(query) {
  const URL = `https://${domain}/api/2022-10/graphql.json`

  const options = {
    endpoint: URL,
    method: 'POST',
    headers: {
      'X-Shopify-Storefront-Access-Token': storefrontAccessToken,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query }),
  }

  try {
    const data = await fetch(URL, options).then((response) => {
      return response.json()
    })

    return data
  } catch (error) {
    throw new Error('Products not fetched')
  }
}

// graphql query
export async function getProductsInCollection() {
  const query = `
  {
    collections(first: 2) {
      nodes {
        title
        products(first: 5, sortKey: BEST_SELLING) {
          edges {
            node {
              title
              featuredImage {
                url
              }
              priceRange {
                minVariantPrice {
                  amount
                }
              }
              handle
            }
          }
        }
      }
    }
  }`

  const response = await ShopifyData(query)

  // if there's a response, send it
  const allProducts = response.data.collections.nodes
    ? response.data.collections.nodes
    : []

  return allProducts
}

export async function getAllProducts() {
  const query = `
  {
    products(first: 250) {
      edges {
        node {
          title
          featuredImage {
            url
          }
          priceRange {
            minVariantPrice {
              amount
            }
          }
          handle
        }
      }
    }
  }`

  const response = await ShopifyData(query)

  // if there's a response, send it
  const allProducts = response.data.products.edges
    ? response.data.products.edges
    : []

  return allProducts
}

export async function getProductByHandle(handle) {
  const query = `
  {
    productByHandle(handle: "${handle}") {
      descriptionHtml
      images(first: 10) {
        nodes {
          url
        }
      }
      title
      priceRange {
        minVariantPrice {
          amount
        }
      }
    }
  }`

  const response = await ShopifyData(query)

  // if there's a response, send it
  const product = response.data.productByHandle
    ? response.data.productByHandle
    : []

  return product
}
