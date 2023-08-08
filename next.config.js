/** @type {import('next').NextConfig} */
const nextConfig = {
	experimental: {
		appDir: true,
	},
	images: {
		domains: ["cdn.dribbble.com", "images.unsplash.com", "images.pexels.com"],
	}
};

module.exports = nextConfig;
