export { default } from "next-auth/middleware";

export const config = {
  //You can add these decorators to your path matcher
  // * : zero or more
  // + : one or more
  // ? : zero or one
  // always start these redirects w/ forward slash
  matcher: ["/dashboard/:path*"],
};
