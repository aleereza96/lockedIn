// https://nuxt.com/docs/api/configuration/nuxt-config

import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
	compatibilityDate: '2025-07-15',
	devtools: { enabled: true },
	modules: ['@pinia/nuxt'],
	css: ['~/assets/css/main.css'],

	vite: {
		plugins: [tailwindcss()]
	},
	app: {
		head: {
			title: 'lockedIn',
			link: [
				{
					rel: 'stylesheet',
					href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;700&display=swap'
				},
				{
					rel: 'stylesheet',
					href: 'https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@latest/tabler-icons.min.css'
				}
			]
		}
	}
})
