const serverStorefrontAccessToken = process.env.SHOPIFY_STORE_FRONT_ACCESS_TOKEN
const clientStorefrontAccessToken =
  process.env.NEXT_PUBLIC_SHOPIFY_STORE_FRONT_ACCESS_TOKEN

//get data from shopify graphql pi
async function ShopifyData(query, side) {
  const URL = `https://old-amish-remedies-plus.myshopify.com/api/2022-10/graphql.json`

  const options = {
    endpoint: URL,
    method: 'POST',
    headers: {
      'X-Shopify-Storefront-Access-Token':
        side == 'client'
          ? clientStorefrontAccessToken
          : serverStorefrontAccessToken,
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
    console.error(error)
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

  const response = await ShopifyData(query, 'server')

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
          collections(first: 10) {
            nodes {
              title
            }
          }
        }
      }
    }
  }`

  const response = await ShopifyData(query, 'server')

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
      handle
    }
  }`

  const response = await ShopifyData(query, 'server')

  // if there's a response, send it
  const product = response.data.productByHandle
    ? response.data.productByHandle
    : []

  return product
}

export async function getCollections() {
  const query = `
  {
    collections(first: 10) {
      nodes {
        title
      }
    }
  }`

  const response = await ShopifyData(query, 'server')

  // if there's a response, send it
  const product = response.data.collections.nodes
    ? response.data.collections.nodes
    : []

  return product
}

export async function getProductVariants() {
  const query = `
  {
    products(first:100) {
      edges {
        node {
          variants(first: 2) {
            edges {
              node {
                id
              }
            }
          }
          handle
        }
      }
    }
  }`

  const response = await ShopifyData(query, 'server')

  // if there's a response, send it
  const variants = response.data.products.edges
    ? response.data.products.edges
    : []

  console.log(variants)

  return variants
}

// export async function createCheckout(lineItems) {
//   const query = `mutation {
//     checkoutCreate(input: {
//       lineItems: [${lineItems.map(
//         (item) => `{variantId: "${item.variantId}", quantity: ${item.quantity}}`
//       )}]
//     }) {
//       checkout {
//          id
//          webUrl
//          lineItems(first: 100) {
//            edges {
//              node {
//                title
//                quantity
//              }
//            }
//          }
//       }
//     }
//   }`
//   const response = await ShopifyData(query, 'client')

//   // if there's a response, send it
//   const webUrl = response.data.checkoutCreate.checkout
//     ? response.data.checkoutCreate.checkout
//     : []

//   return webUrl
// }

export async function createCart(lineItems) {
  const query = `mutation {
    cartCreate(
      input: {lines: [${lineItems.map(
        (item) =>
          `{merchandiseId: "${item.variantId}", quantity: ${item.quantity}}`
      )}]}
    ) {
      cart {
        id
        lines(first: 50) {
          nodes {
            id
            quantity
          }
        }
        checkoutUrl
      }
    }
  }`

  const response = await ShopifyData(query, 'client')

  // if there's a response, send it
  const webUrl = response.data ? response.data : []

  return webUrl
}

export async function cartExists(id) {
  const query = `{
    cart(id: "${id}") {
      id
    }
  }`

  const response = await ShopifyData(query, 'client')

  // if there's a response, send it
  const cart = response.data ? response.data : []

  return cart
}
