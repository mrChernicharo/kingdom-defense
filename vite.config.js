import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";

const __dirname = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
    build: {
        rollupOptions: {
            input: {
                main: resolve(__dirname, "index.html"),
                lobby: resolve(__dirname, "/src/html/lobby.html"),
                game: resolve(__dirname, "/src/html/game.html"),
                units: resolve(__dirname, "/src/html/units.html"),
                cards: resolve(__dirname, "/src/html/cards.html"),
                shop: resolve(__dirname, "/src/html/shop.html"),
            },
        },
    },
});
