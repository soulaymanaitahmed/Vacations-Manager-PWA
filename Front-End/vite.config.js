import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: [
        "Images/bg1.png",
        "Images/deleg-logo.png",
        "Images/rm.png",
        "Images/deleg.png",
        "logo192.png",
        "logo512.png",
      ],
      manifest: {
        name: "Gestion des Vacances",
        short_name: "G-V",
        description: "Application de gestion des congés et vacances",
        theme_color: "#112d4e",
        background_color: "#ffffff",
        display: "standalone",
        icons: [
          {
            src: "logo192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "logo512.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },
      workbox: {
        globPatterns: ["**/*.{js,css,html,ttf,png,jpg,svg,ico,json}"],
        runtimeCaching: [
          {
            urlPattern: /^https?:\/\/.*\/Images\/.*/i,
            handler: "CacheFirst",
            options: {
              cacheName: "images",
              expiration: { maxEntries: 20, maxAgeSeconds: 86400 * 60 },
            },
          },
        ],
      },
    }),
  ],
  server: {
    host: "0.0.0.0",
    port: 7766,
  },
});
