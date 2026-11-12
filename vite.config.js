import {defineConfig} from 'vite';
export default defineConfig({root:'explore-src',base:'/explore/',publicDir:'../explore-public',build:{outDir:'../dist/explore',emptyOutDir:true,chunkSizeWarningLimit:800}});
