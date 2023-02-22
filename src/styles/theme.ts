import { extendTheme } from '@chakra-ui/react';

export const theme = extendTheme({
	colors: {
		gray: {
			'900': '#343a40',
			'800': '#67757c',
			'700': '#495057',
			'600': '#8898aa',
			'500': '#66788a',
			'400': '#ced4da',
			'300': '#dee2e6',
			'200': '#eef5f9',
			'100': '#f8f9fa',
			'50': '#EEEEF2',
		},

		base: {
			primary: '#1e88e5',
			secondary: '#2f3d4a',
			success: '#21c1d6',
			info: '#7460ee',
			warning: '#ffb22b',
			danger: '#fc4b6c',
			light: '#eaf2fb',
			dark: '#2f3d4a',
			lightPrimary: '#d6ecff',
			lightSuccess: '#c8f9ff',
			lightInfo: '#dedaf9',
			lightWarning: '#f8ecdc',
			lightDanger: '#f9e7eb',
			lightSecondary: '#dde1e4',
		},

		main: {
			primary: '#285598',
			secondary: '#4677b2',
			contrast: '#82a8db',
			hotPink: '#dd2663',
			vividOrange: '#fc9e19',
			light: '#f4f4f4',
			dark: '#181B23',
		},
	},

	fonts: {
		heading: ` 'Baloo 2', cursive`,
		body: ` 'Nunito', sans-serif`,
	},

	styles: {
		global: {
			scrolscrollBehavior: 'smooth',

			'*': {
				boxSizing: 'border-box',
				padding: 0,
				margin: 0,
			},

			'h1, h2, h3, h4, h5': {
				color: '#455a64',
			},

			body: {
				bg: 'gray.200',
				color: 'gray.800',
				WebkitFontSmoothing: 'antialiased',
			},
		},
	},
});
