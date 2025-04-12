export const baseUrl = "https://ecommerce.routemisr.com";
export const getTopSellingProducts = (products) => {
  return products.sort((a, b) => b.sold - a.sold).slice(0, 20);
};
