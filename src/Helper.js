// GraphQL query for fetching products from a specific collection
export const collectionQuery = `
  query Collection($handle: String, $first: Int, $filters: [ProductFilter!]) {
    collection(handle: $handle) {
      id
      title
      products(first: $first, filters: $filters) {
        edges {
          node {
            id
            title
            images(first: 1) {
              edges {
                node {
                  src
                }
              }
            }
            priceRange {
              maxVariantPrice {
                amount
                currencyCode
              }
            }
            featuredImage {
              url
              altText
            }
            handle
            compareAtPriceRange {
              maxVariantPrice {
                amount
                currencyCode
              }
            }
            vendor
            productType
          }
        }
        pageInfo {
          endCursor
          hasNextPage
          hasPreviousPage
          startCursor
        }
        filters {
          type
          label
          id
          values {
            count
            input
            id
            label
          }
        }
      }
    }
  }
`;