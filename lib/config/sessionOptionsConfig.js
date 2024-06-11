export const accountSessionOptions = {
  password: `${process.env.ACCOUNT_COOKIE_SECRET}`,
  cookieName: "account-session",
  cookieOptions: {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 48 * 60 * 60, // 48 hours in seconds
  },
};

export const cartSessionOptions = {
  password: `${process.env.CART_COOKIE_SECRET}`,
  cookieName: "cart-session",
  cookieOptions: {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 48 * 60 * 60, // 48 hours in seconds
  },
};
export const checkoutSessionOptions = {
  password: `${process.env.CHECKOUT_COOKIE_SECRET}`,
  cookieName: "checkout-session",
  cookieOptions: {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 48 * 60 * 60, // 48 hours in seconds
  },
};
