export { default } from 'next-auth/middleware'

export const config = {
  matcher: ['/add-product', '/manage-products'],
}
