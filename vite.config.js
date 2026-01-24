import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// SUBSTITUA 'nome-do-seu-repo' PELO NOME QUE VOCÊ CRIOU NO GITHUB
export default defineConfig({
  plugins: [react()],
  base: '/territorios-palmas/',
})