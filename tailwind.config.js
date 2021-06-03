module.exports = {
	theme: {
		extend: {},
		fill: (theme) => ({
			red: theme('colors.red.primary'),
		}),
		colors: {
			white: {
				DEFAULT: '#ffffff',
			},
			blue: {
				medium: '#0095f6',
			},
			black: {
				light: '#262626',
				faded: '#00000059',
			},
			gray: {
				light: '#8e8e8e',
				base: '#616161',
				background: '#fafafa',
				primary: '#dbdbdb',
			},
			red: {
				primary: '#ed4956',
			},
		},
		flexGrow: {
			0: 0,
			DEFAULT: 1,
			2: 2,
		},
	},
	variants: {
		extend: {
			display: ['group-hover'],
		},
	},
	purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
	plugins: [],
}
