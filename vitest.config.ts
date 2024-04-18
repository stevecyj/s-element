import { fileURLToPath } from 'node:url'
import { mergeConfig, defineConfig, configDefaults } from 'vitest/config'
import viteConfig from './vite.config'
import Components from 'unplugin-vue-components/vite'

export default mergeConfig(
  viteConfig,
  defineConfig({
    plugins: [
      // ...
      Components({
        dirs: ['src/components'],
        dts: 'src/auto-components-test.ts'
      })
    ],
    test: {
      environment: 'jsdom',
      exclude: [...configDefaults.exclude, 'e2e/*'],
      root: fileURLToPath(new URL('./', import.meta.url))
    }
  })
)
