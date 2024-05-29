import { createRequestHandler } from "@remix-run/express";
import express from "express";

const viteDevServer =
	process.env.NODE_ENV === "production"
		? null
		: await import("vite").then((vite) =>
			vite.createServer({
				server: { middlewareMode: true },
			})
		);

const app = express();
app.use(
	viteDevServer
		? viteDevServer.middlewares
		: express.static("build/client")
);

// Remix fingerprints its assets so we can cache forever.
app.use('/build', express.static('public/build', { immutable: true, maxAge: '1y' }));

// Everything else (like favicon.ico) is cached for an hour. You may want to be
// more aggressive with this caching.
app.use(express.static('public', { maxAge: '1h' }));

const build = viteDevServer
	? () =>
		viteDevServer.ssrLoadModule(
			"virtual:remix/server-build"
		)
	: await import("./build/server/index.js");

app.all("*", createRequestHandler({ build }));

app.listen(3000, () => {
	console.log("App listening on http://localhost:3000");
});
