// import Client from 'shopify-buy'
// export const shopifyClient = Client.buildClient({
//   storefrontAccessToken: process.env.SHOPIFY_STORE_FRONT_ACCESS_TOKEN,
//   domain: process.env.SHOPIFY_STORE_DOMAIN,
// })

// export const parseShopifyResponse = (response) =>
//   JSON.parse(JSON.stringify(response))

const domain = process.env.SHOPIFY_STORE_DOMAIN
const storefrontAccessToken = process.env.SHOPIFY_STORE_FRONT_ACCESS_TOKEN

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
            }
          }
        }
      }
    }
  }`

  const response = await ShopifyData(query)

  const allProducts = response.data.collections.nodes
    ? response.data.collections.nodes
    : []

  return allProducts
}
