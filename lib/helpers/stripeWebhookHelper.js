import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const extractOrderItems = async (line_items) => {
  if (!line_items || !line_items.data) {
    throw new Error("Invalid line items data");
  }
  //wait for all promises to resolve
  const orderItems = await Promise.all(
    line_items.data.map(async (lineItem) => {
      const product = await stripe.products.retrieve(lineItem.price.product);
      return {
        productId: product.metadata.productId,
        productName: product.name,
        // Convert cents to dollars for the unit amount
        price: lineItem.price.unit_amount / 100,
        quantity: lineItem.quantity,
        productImage: product.images[0],
      };
    })
  );

  return orderItems;
};
