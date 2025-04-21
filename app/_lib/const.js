export const baseUrl = process.env.BASE_URL;
export const getTopSellingProducts = (products) => {
  return products.sort((a, b) => b.sold - a.sold).slice(0, 20);
};
