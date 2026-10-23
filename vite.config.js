import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { fileURLToPath } from "node:url";

// Serve the same page at /digital with or without a trailing slash in local
// development and production previews. Netlify uses public/_redirects.
function digitalPageRoute(server) {
  server.middlewares.use((request, response, next) => {
    if (/^\/digital\/?(?:\?|$)/.test(request.url)) {
      request.url = request.url.replace(/^\/digital\/?/, "/digital/index.html");
      response.setHeader("Cache-Control", "no-cache");
    }
    next();
  });
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    {
      name: "digital-page-route",
      configureServer: digitalPageRoute,
      configurePreviewServer: digitalPageRoute,
    },
  ],
  server: { allowedHosts: ["terminal.local"] },
  build: {
    rollupOptions: {
      input: {
        main: fileURLToPath(new URL("./index.html", import.meta.url)),
        digital: fileURLToPath(
          new URL("./digital/index.html", import.meta.url),
        ),
      },
    },
  },
});
