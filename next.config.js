/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "cloudinary.com",
      },
      {
        protocol: "https",
        hostname: "upload.wikimedia.org",
      },
    ],
    domains: ["wallpapercave.com", "media.gettyimages.com","res.cloudinary.com","lh3.googleusercontent.com"],
    domains: [
      "wallpapercave.com",
      "media.gettyimages.com",
      "lh5.googleusercontent.com",
    ],
  },
};

module.exports = nextConfig;
