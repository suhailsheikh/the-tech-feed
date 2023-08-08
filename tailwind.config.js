/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./app/**/*.{js,ts,jsx,tsx,mdx}",
		"./pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./components/**/*.{js,ts,jsx,tsx,mdx}",
	],
	variants: {
		extend: {
			display: ["group-hover"],
		},
	},
	theme: {
		extend: {},
	},
	plugins: [],
};
