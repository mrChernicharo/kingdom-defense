import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";

const __dirname = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
    build: {
        rollupOptions: {
            input: {
                main: resolve(__dirname, "index.html"),
                lobby: resolve(__dirname, "/src/pages/lobby.html"),
                game: resolve(__dirname, "/src/pages/game.html"),
                units: resolve(__dirname, "/src/pages/units.html"),
                cards: resolve(__dirname, "/src/pages/cards.html"),
                shop: resolve(__dirname, "/src/pages/shop.html"),
            },
        },
    },
});
