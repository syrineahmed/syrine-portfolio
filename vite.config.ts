import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// IMPORTANT pour GitHub Pages :
// Si le site est servi depuis https://<user>.github.io/<repo-name>/,
// "base" DOIT correspondre exactement à "/<repo-name>/".
// Si le site est servi depuis https://<user>.github.io/ (repo nommé <user>.github.io),
// laisser base: '/'.
export default defineConfig({
  base: '/portfolio/',
  plugins: [react()],
})
