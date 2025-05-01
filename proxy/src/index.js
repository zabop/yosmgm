/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `npm run dev` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npm run deploy` to publish your worker
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

export default {
	async fetch(request) {
		const url = new URL(request.url);

		if (url.pathname.startsWith('/yosmgm')) {
			const pathParts = url.pathname.split('/').slice(1); // Remove the leading `/`

			if (pathParts.length === 4) {
				// "/yosmgm/{zoom}/{x}/{y}"
				const [_, zoom, x, y] = pathParts;

				const sourceUrl = `https://hel1.your-objectstorage.com/yosmgm/tiles/${zoom}/${x}/${y}.pbf`;

				// Make the request to the Mapbox API
				const resp = await fetch(sourceUrl, {
					method: request.method,
					headers: {
						'Content-Type': 'application/json',
						...request.headers,
					},
				});

				// Return the Mapbox response to the client
				return new Response(resp.body, {
					status: resp.status,
					headers: {
						'content-type': resp.headers.get('content-type'),
					},
				});
			} else {
				return new Response('Invalid URL format. Use /yosmgm/{zoom}/{x}/{y}', {
					status: 400,
				});
			}
		}

		// Default response for other paths
		return new Response('Welcome to Cloudflare Workers!', {
			headers: { 'content-type': 'text/html' },
		});
	},
};
