/** @type {import('next').NextConfig} */
const withImages = require("next-images")

module.exports = withImages({
  reactStrictMode: true,
  images: {
    disableStaticImages: true,
    domains: [
      process.env.NEXT_PUBLIC_IMAGE_URL,
      "cf.shopee.vn",
      process.env.NEXT_PUBLIC_IMAGE_URL2,
      "f12.photo.talk.zdn.vn",
      "172.16.0.48",
    ],
  },
})
