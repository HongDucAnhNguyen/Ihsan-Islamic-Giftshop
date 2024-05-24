export const accountSessionOptions = {
  password: `${process.env.COOKIE_SECRET}`,
  cookieName: "account-session",
  cookieOptions: {
    httpOnly: true,
    secure: true,
  },
};

export const cartSessionOptions = {
  password: `${process.env.COOKIE_SECRET}`,
  cookieName: "cart-session",
  cookieOptions: {
    httpOnly: true,
    secure: true,
  },
};
