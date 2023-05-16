import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import peerDepsExternal from 'rollup-plugin-peer-deps-external'
import dts from 'vite-plugin-dts'
import { ViteAliases } from 'vite-aliases'


const path = require('path')

// https://vitejs.dev/config/
export default defineConfig({
  test: {
    environment: 'jsdom',
    globals: true
  },
  build: {
    target: 'esnext',
    minify: true,
    lib: {
      entry: path.resolve(__dirname, 'src/index.tsx'),
      name: 'Mui-tel-input',
      fileName: format => `mui-tel-input.${format}.js`
    },
    rollupOptions: {
      output: {
        sourcemapExcludeSources: true,
        globals: {
          react: 'React',
          '@mui/material/InputAdornment': 'InputAdornment',
          '@mui/material/TextField': 'TextField',
          '@mui/material/IconButton': 'IconButton',
          '@mui/material/styles': 'styles',
          'react/jsx-runtime': 'jsxRuntime',
          '@mui/material/Menu': 'Menu',
          '@mui/material/MenuItem': 'MenuItem',
          '@mui/material/Typography': 'Typography',
          '@mui/material/ListItem': 'ListItem',
          '@mui/material/ListItemIcon': 'ListItemIcon',
          '@mui/material/ListItemText': 'ListItemText',
          '@mui/material/colors': 'colors',
          '@mui/material/Autocompelte': 'Autocomplete',
          '@mui/material/ClickAwayListener': 'ClickAwayListener',
        }
      }
    }
  },
  plugins: [
    peerDepsExternal(),
    react(),
    ViteAliases({
      deep: false,
      createGlobalAlias: false,
      useTypescript: true
    }),
    dts({
      exclude: ['src/components/**/*'],
      insertTypesEntry: true
    })
  ]
})
