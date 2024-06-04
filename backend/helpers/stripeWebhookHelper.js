import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const extractOrderItems = async (line_items) => {
  return new Promise((resolve, reject) => {
    let orderItems = [];

    line_items?.data?.forEach(async (lineItem) => {
      const product = await stripe.products.retrieve(lineItem.price.product);

      const productId = product.metadata.productId;
      console.log(productId);
      orderItems.push({
        productId: productId,
        productName: product.name,
        //convert cents to dollars for the unit amount
        price: lineItem.price.unit_amount / 100,
        quantity: lineItem.quantity,
        productImage: product.images[0],
      });

      if (orderItems.length === line_items?.data.length) {
        resolve(orderItems);
      } else reject("order items were not processed properly");
    });
  });
};
