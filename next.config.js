/** @type {import('next').NextConfig} */
const withImages = require("next-images")

module.exports = withImages({
  reactStrictMode: true,
  images: {
    disableStaticImages: true,
    domains: [process.env.NEXT_PUBLIC_IMAGE_URL, "cf.shopee.vn"],
  },
})
