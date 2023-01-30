/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	safelist: [
		"fill-crema",
		"fill-midnight",
		"fill-silver",
		"fill-gold",
		"border-midnight",
		"border-silver",
		"border-gold",
		"border-1cost",
		"border-2cost",
		"border-3cost",
		"border-4cost",
		"border-5cost",
		"text-1cost",
		"text-2cost",
		"text-3cost",
		"text-4cost",
		"text-5cost",
		"bg-3cost",
		"w-3",
		"w-4",
	],
	theme: {
		container: {
			center: true,
		},
		colors: {
			midnight: "#041C32",
			earlynight: "#04293A",
			midday: "#064663",
			morning: "#ECB365",
			crema: "#ffffd2",
			silver: "#b5cbde",
			gold: "#f9be0a",
			"1cost": "#9f9a89",
			"2cost": "#39b65a",
			"3cost": "#2875be",
			"4cost": "#aa09a4",
			"5cost": "#d78e00",
		},
	},
	plugins: [],
};
