/** @type {import('next').NextConfig} */
const withImages = require("next-images")

module.exports = withImages({
  reactStrictMode: true,
  images: {
    disableStaticImages: true,
    domains: ["quanly.exxe.vn", "192.168.10.124"],
  },
})
