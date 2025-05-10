const config = (data) => {
 
  const shop = 'securecod3';
  const apiVersion = '2024-10';
  const accessToken = 'c584813e6f72cf3ed05c2dc42b5ca487';
  return {
    method: "post",
    url: `https://${shop}.myshopify.com/api/${apiVersion}/graphql.json`,
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': accessToken,
    },
    data: data,
  };
}
 
module.exports = config;