export const SessionOptions = {
  password: `${process.env.COOKIE_SECRET}`,
  cookieName: "ihsan-session",
  cookieOptions: {
    httpOnly: true,
    secure: true,
  },
};
