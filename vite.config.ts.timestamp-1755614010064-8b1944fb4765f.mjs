// vite.config.ts
import { fileURLToPath, URL } from "node:url";
import { defineConfig, loadEnv } from "file:///Users/jack/Desktop/web/vue/vue3-h5-template/node_modules/.pnpm/vite@5.2.11_@types+node@20.12.12_less@4.2.0_terser@5.31.0/node_modules/vite/dist/node/index.js";
import vue from "file:///Users/jack/Desktop/web/vue/vue3-h5-template/node_modules/.pnpm/@vitejs+plugin-vue@5.0.4_vite@5.2.11_@types+node@20.12.12_less@4.2.0_terser@5.31.0__vue@3.4.27_typescript@5.4.5_/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import vueJsx from "file:///Users/jack/Desktop/web/vue/vue3-h5-template/node_modules/.pnpm/@vitejs+plugin-vue-jsx@3.1.0_vite@5.2.11_@types+node@20.12.12_less@4.2.0_terser@5.31.0__vue@3.4.27_typescript@5.4.5_/node_modules/@vitejs/plugin-vue-jsx/dist/index.mjs";
import Components from "file:///Users/jack/Desktop/web/vue/vue3-h5-template/node_modules/.pnpm/unplugin-vue-components@0.27.0_@babel+parser@7.24.5_rollup@4.17.2_vue@3.4.27_typescript@5.4.5_/node_modules/unplugin-vue-components/dist/vite.js";
import { VantResolver } from "file:///Users/jack/Desktop/web/vue/vue3-h5-template/node_modules/.pnpm/unplugin-vue-components@0.27.0_@babel+parser@7.24.5_rollup@4.17.2_vue@3.4.27_typescript@5.4.5_/node_modules/unplugin-vue-components/dist/resolvers.js";
import { createSvgIconsPlugin } from "file:///Users/jack/Desktop/web/vue/vue3-h5-template/node_modules/.pnpm/vite-plugin-svg-icons@2.0.1_vite@5.2.11_@types+node@20.12.12_less@4.2.0_terser@5.31.0_/node_modules/vite-plugin-svg-icons/dist/index.mjs";
import path from "path";
import mockDevServerPlugin from "file:///Users/jack/Desktop/web/vue/vue3-h5-template/node_modules/.pnpm/vite-plugin-mock-dev-server@1.5.0_rollup@4.17.2_vite@5.2.11_@types+node@20.12.12_less@4.2.0_terser@5.31.0_/node_modules/vite-plugin-mock-dev-server/dist/index.js";
import vueSetupExtend from "file:///Users/jack/Desktop/web/vue/vue3-h5-template/node_modules/.pnpm/vite-plugin-vue-setup-extend@0.4.0_vite@5.2.11_@types+node@20.12.12_less@4.2.0_terser@5.31.0_/node_modules/vite-plugin-vue-setup-extend/dist/index.mjs";
import viteCompression from "file:///Users/jack/Desktop/web/vue/vue3-h5-template/node_modules/.pnpm/vite-plugin-compression@0.5.1_vite@5.2.11_@types+node@20.12.12_less@4.2.0_terser@5.31.0_/node_modules/vite-plugin-compression/dist/index.mjs";
import { createHtmlPlugin } from "file:///Users/jack/Desktop/web/vue/vue3-h5-template/node_modules/.pnpm/vite-plugin-html@3.2.2_vite@5.2.11_@types+node@20.12.12_less@4.2.0_terser@5.31.0_/node_modules/vite-plugin-html/dist/index.mjs";

// build/cdn.ts
import { cdn } from "file:///Users/jack/Desktop/web/vue/vue3-h5-template/node_modules/.pnpm/vite-plugin-cdn2@1.1.0_rollup@4.17.2/node_modules/vite-plugin-cdn2/dist/index.mjs";
import { unpkg } from "file:///Users/jack/Desktop/web/vue/vue3-h5-template/node_modules/.pnpm/vite-plugin-cdn2@1.1.0_rollup@4.17.2/node_modules/vite-plugin-cdn2/dist/resolver/unpkg.mjs";
function enableCDN(isEnabled) {
  if (isEnabled === "true") {
    return cdn({
      resolve: unpkg(),
      modules: ["vue", "vue-demi", "pinia", "axios", "vant", "vue-router"]
    });
  }
}

// vite.config.ts
var __vite_injected_original_import_meta_url = "file:///Users/jack/Desktop/web/vue/vue3-h5-template/vite.config.ts";
var root = process.cwd();
var vite_config_default = defineConfig(({ mode }) => {
  const env = loadEnv(mode, root, "");
  return {
    base: env.VITE_PUBLIC_PATH || "/",
    plugins: [
      vue(),
      vueJsx(),
      mockDevServerPlugin(),
      // vant 组件自动按需引入
      Components({
        dts: "src/typings/components.d.ts",
        resolvers: [VantResolver()]
      }),
      // svg icon
      createSvgIconsPlugin({
        // 指定图标文件夹
        iconDirs: [path.resolve(root, "src/icons/svg")],
        // 指定 symbolId 格式
        symbolId: "icon-[dir]-[name]"
      }),
      // 允许 setup 语法糖上添加组件名属性
      vueSetupExtend(),
      // 生产环境 gzip 压缩资源
      viteCompression(),
      // 注入模板数据
      createHtmlPlugin({
        inject: {
          data: {
            ENABLE_ERUDA: env.VITE_ENABLE_ERUDA || "false"
          }
        }
      }),
      // 生产环境默认不启用 CDN 加速
      enableCDN(env.VITE_CDN_DEPS)
    ],
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", __vite_injected_original_import_meta_url))
      }
      // extensions:['.vue']
    },
    server: {
      host: true,
      // 仅在 proxy 中配置的代理前缀， mock-dev-server 才会拦截并 mock
      // doc: https://github.com/pengzhanbo/vite-plugin-mock-dev-server
      proxy: {
        "^/api": {
          target: "http://120.27.151.154:8076"
        }
      }
    },
    build: {
      outDir: env.VITE_DIRT,
      rollupOptions: {
        output: {
          chunkFileNames: "static/js/[name]-[hash].js",
          entryFileNames: "static/js/[name]-[hash].js",
          assetFileNames: "static/[ext]/[name]-[hash].[ext]"
        }
      }
    }
  };
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiLCAiYnVpbGQvY2RuLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiL1VzZXJzL2phY2svRGVza3RvcC93ZWIvdnVlL3Z1ZTMtaDUtdGVtcGxhdGVcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIi9Vc2Vycy9qYWNrL0Rlc2t0b3Avd2ViL3Z1ZS92dWUzLWg1LXRlbXBsYXRlL3ZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9Vc2Vycy9qYWNrL0Rlc2t0b3Avd2ViL3Z1ZS92dWUzLWg1LXRlbXBsYXRlL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgZmlsZVVSTFRvUGF0aCwgVVJMIH0gZnJvbSBcIm5vZGU6dXJsXCI7XG5pbXBvcnQgeyBkZWZpbmVDb25maWcsIGxvYWRFbnYgfSBmcm9tIFwidml0ZVwiO1xuaW1wb3J0IHZ1ZSBmcm9tIFwiQHZpdGVqcy9wbHVnaW4tdnVlXCI7XG5pbXBvcnQgdnVlSnN4IGZyb20gXCJAdml0ZWpzL3BsdWdpbi12dWUtanN4XCI7XG5pbXBvcnQgQ29tcG9uZW50cyBmcm9tIFwidW5wbHVnaW4tdnVlLWNvbXBvbmVudHMvdml0ZVwiO1xuaW1wb3J0IHsgVmFudFJlc29sdmVyIH0gZnJvbSBcInVucGx1Z2luLXZ1ZS1jb21wb25lbnRzL3Jlc29sdmVyc1wiO1xuaW1wb3J0IHsgY3JlYXRlU3ZnSWNvbnNQbHVnaW4gfSBmcm9tIFwidml0ZS1wbHVnaW4tc3ZnLWljb25zXCI7XG5pbXBvcnQgcGF0aCBmcm9tIFwicGF0aFwiO1xuaW1wb3J0IG1vY2tEZXZTZXJ2ZXJQbHVnaW4gZnJvbSBcInZpdGUtcGx1Z2luLW1vY2stZGV2LXNlcnZlclwiO1xuaW1wb3J0IHZ1ZVNldHVwRXh0ZW5kIGZyb20gXCJ2aXRlLXBsdWdpbi12dWUtc2V0dXAtZXh0ZW5kXCI7XG5pbXBvcnQgdml0ZUNvbXByZXNzaW9uIGZyb20gXCJ2aXRlLXBsdWdpbi1jb21wcmVzc2lvblwiO1xuaW1wb3J0IHsgY3JlYXRlSHRtbFBsdWdpbiB9IGZyb20gXCJ2aXRlLXBsdWdpbi1odG1sXCI7XG5pbXBvcnQgeyBlbmFibGVDRE4gfSBmcm9tIFwiLi9idWlsZC9jZG5cIjtcblxuLy8gXHU1RjUzXHU1MjREXHU1REU1XHU0RjVDXHU3NkVFXHU1RjU1XHU4REVGXHU1Rjg0XG5jb25zdCByb290OiBzdHJpbmcgPSBwcm9jZXNzLmN3ZCgpO1xuXG4vLyBodHRwczovL3ZpdGVqcy5kZXYvY29uZmlnL1xuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKCh7IG1vZGUgfSkgPT4ge1xuICAvLyBcdTczQUZcdTU4ODNcdTUzRDhcdTkxQ0ZcbiAgY29uc3QgZW52ID0gbG9hZEVudihtb2RlLCByb290LCBcIlwiKTtcbiAgcmV0dXJuIHtcbiAgICBiYXNlOiBlbnYuVklURV9QVUJMSUNfUEFUSCB8fCBcIi9cIixcbiAgICBwbHVnaW5zOiBbXG4gICAgICB2dWUoKSxcbiAgICAgIHZ1ZUpzeCgpLFxuICAgICAgbW9ja0RldlNlcnZlclBsdWdpbigpLFxuICAgICAgLy8gdmFudCBcdTdFQzRcdTRFRjZcdTgxRUFcdTUyQThcdTYzMDlcdTk3MDBcdTVGMTVcdTUxNjVcbiAgICAgIENvbXBvbmVudHMoe1xuICAgICAgICBkdHM6IFwic3JjL3R5cGluZ3MvY29tcG9uZW50cy5kLnRzXCIsXG4gICAgICAgIHJlc29sdmVyczogW1ZhbnRSZXNvbHZlcigpXVxuICAgICAgfSksXG4gICAgICAvLyBzdmcgaWNvblxuICAgICAgY3JlYXRlU3ZnSWNvbnNQbHVnaW4oe1xuICAgICAgICAvLyBcdTYzMDdcdTVCOUFcdTU2RkVcdTY4MDdcdTY1ODdcdTRFRjZcdTU5MzlcbiAgICAgICAgaWNvbkRpcnM6IFtwYXRoLnJlc29sdmUocm9vdCwgXCJzcmMvaWNvbnMvc3ZnXCIpXSxcbiAgICAgICAgLy8gXHU2MzA3XHU1QjlBIHN5bWJvbElkIFx1NjgzQ1x1NUYwRlxuICAgICAgICBzeW1ib2xJZDogXCJpY29uLVtkaXJdLVtuYW1lXVwiXG4gICAgICB9KSxcbiAgICAgIC8vIFx1NTE0MVx1OEJCOCBzZXR1cCBcdThCRURcdTZDRDVcdTdDRDZcdTRFMEFcdTZERkJcdTUyQTBcdTdFQzRcdTRFRjZcdTU0MERcdTVDNUVcdTYwMjdcbiAgICAgIHZ1ZVNldHVwRXh0ZW5kKCksXG4gICAgICAvLyBcdTc1MUZcdTRFQTdcdTczQUZcdTU4ODMgZ3ppcCBcdTUzOEJcdTdGMjlcdThENDRcdTZFOTBcbiAgICAgIHZpdGVDb21wcmVzc2lvbigpLFxuICAgICAgLy8gXHU2Q0U4XHU1MTY1XHU2QTIxXHU2NzdGXHU2NTcwXHU2MzZFXG4gICAgICBjcmVhdGVIdG1sUGx1Z2luKHtcbiAgICAgICAgaW5qZWN0OiB7XG4gICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgRU5BQkxFX0VSVURBOiBlbnYuVklURV9FTkFCTEVfRVJVREEgfHwgXCJmYWxzZVwiXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9KSxcbiAgICAgIC8vIFx1NzUxRlx1NEVBN1x1NzNBRlx1NTg4M1x1OUVEOFx1OEJBNFx1NEUwRFx1NTQyRlx1NzUyOCBDRE4gXHU1MkEwXHU5MDFGXG4gICAgICBlbmFibGVDRE4oZW52LlZJVEVfQ0ROX0RFUFMpXG4gICAgXSxcbiAgICByZXNvbHZlOiB7XG4gICAgICBhbGlhczoge1xuICAgICAgICBcIkBcIjogZmlsZVVSTFRvUGF0aChuZXcgVVJMKFwiLi9zcmNcIiwgaW1wb3J0Lm1ldGEudXJsKSlcbiAgICAgIH0sXG4gICAgICAvLyBleHRlbnNpb25zOlsnLnZ1ZSddXG4gICAgfSxcbiAgICBzZXJ2ZXI6IHtcbiAgICAgIGhvc3Q6IHRydWUsXG4gICAgICAvLyBcdTRFQzVcdTU3MjggcHJveHkgXHU0RTJEXHU5MTREXHU3RjZFXHU3Njg0XHU0RUUzXHU3NDA2XHU1MjREXHU3RjAwXHVGRjBDIG1vY2stZGV2LXNlcnZlciBcdTYyNERcdTRGMUFcdTYyRTZcdTYyMkFcdTVFNzYgbW9ja1xuICAgICAgLy8gZG9jOiBodHRwczovL2dpdGh1Yi5jb20vcGVuZ3poYW5iby92aXRlLXBsdWdpbi1tb2NrLWRldi1zZXJ2ZXJcbiAgICAgIHByb3h5OiB7XG4gICAgICAgIFwiXi9hcGlcIjoge1xuICAgICAgICAgIHRhcmdldDogXCJodHRwOi8vMTIwLjI3LjE1MS4xNTQ6ODA3NlwiXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LFxuICAgIGJ1aWxkOiB7XG4gICAgICBvdXREaXI6IGVudi5WSVRFX0RJUlQsXG4gICAgICByb2xsdXBPcHRpb25zOiB7XG4gICAgICAgIG91dHB1dDoge1xuICAgICAgICAgIGNodW5rRmlsZU5hbWVzOiBcInN0YXRpYy9qcy9bbmFtZV0tW2hhc2hdLmpzXCIsXG4gICAgICAgICAgZW50cnlGaWxlTmFtZXM6IFwic3RhdGljL2pzL1tuYW1lXS1baGFzaF0uanNcIixcbiAgICAgICAgICBhc3NldEZpbGVOYW1lczogXCJzdGF0aWMvW2V4dF0vW25hbWVdLVtoYXNoXS5bZXh0XVwiXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH07XG59KTtcbiIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiL1VzZXJzL2phY2svRGVza3RvcC93ZWIvdnVlL3Z1ZTMtaDUtdGVtcGxhdGUvYnVpbGRcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIi9Vc2Vycy9qYWNrL0Rlc2t0b3Avd2ViL3Z1ZS92dWUzLWg1LXRlbXBsYXRlL2J1aWxkL2Nkbi50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vVXNlcnMvamFjay9EZXNrdG9wL3dlYi92dWUvdnVlMy1oNS10ZW1wbGF0ZS9idWlsZC9jZG4udHNcIjtpbXBvcnQgeyBjZG4gfSBmcm9tIFwidml0ZS1wbHVnaW4tY2RuMlwiO1xuaW1wb3J0IHsgdW5wa2cgfSBmcm9tIFwidml0ZS1wbHVnaW4tY2RuMi9yZXNvbHZlci91bnBrZ1wiO1xuXG5leHBvcnQgZnVuY3Rpb24gZW5hYmxlQ0ROKGlzRW5hYmxlZDogc3RyaW5nKSB7XG4gIGlmIChpc0VuYWJsZWQgPT09IFwidHJ1ZVwiKSB7XG4gICAgcmV0dXJuIGNkbih7XG4gICAgICByZXNvbHZlOiB1bnBrZygpLFxuICAgICAgbW9kdWxlczogW1widnVlXCIsIFwidnVlLWRlbWlcIiwgXCJwaW5pYVwiLCBcImF4aW9zXCIsIFwidmFudFwiLCBcInZ1ZS1yb3V0ZXJcIl1cbiAgICB9KTtcbiAgfVxufVxuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUFzVCxTQUFTLGVBQWUsV0FBVztBQUN6VixTQUFTLGNBQWMsZUFBZTtBQUN0QyxPQUFPLFNBQVM7QUFDaEIsT0FBTyxZQUFZO0FBQ25CLE9BQU8sZ0JBQWdCO0FBQ3ZCLFNBQVMsb0JBQW9CO0FBQzdCLFNBQVMsNEJBQTRCO0FBQ3JDLE9BQU8sVUFBVTtBQUNqQixPQUFPLHlCQUF5QjtBQUNoQyxPQUFPLG9CQUFvQjtBQUMzQixPQUFPLHFCQUFxQjtBQUM1QixTQUFTLHdCQUF3Qjs7O0FDWHVSLFNBQVMsV0FBVztBQUM1VSxTQUFTLGFBQWE7QUFFZixTQUFTLFVBQVUsV0FBbUI7QUFDM0MsTUFBSSxjQUFjLFFBQVE7QUFDeEIsV0FBTyxJQUFJO0FBQUEsTUFDVCxTQUFTLE1BQU07QUFBQSxNQUNmLFNBQVMsQ0FBQyxPQUFPLFlBQVksU0FBUyxTQUFTLFFBQVEsWUFBWTtBQUFBLElBQ3JFLENBQUM7QUFBQSxFQUNIO0FBQ0Y7OztBRFZnTSxJQUFNLDJDQUEyQztBQWVqUCxJQUFNLE9BQWUsUUFBUSxJQUFJO0FBR2pDLElBQU8sc0JBQVEsYUFBYSxDQUFDLEVBQUUsS0FBSyxNQUFNO0FBRXhDLFFBQU0sTUFBTSxRQUFRLE1BQU0sTUFBTSxFQUFFO0FBQ2xDLFNBQU87QUFBQSxJQUNMLE1BQU0sSUFBSSxvQkFBb0I7QUFBQSxJQUM5QixTQUFTO0FBQUEsTUFDUCxJQUFJO0FBQUEsTUFDSixPQUFPO0FBQUEsTUFDUCxvQkFBb0I7QUFBQTtBQUFBLE1BRXBCLFdBQVc7QUFBQSxRQUNULEtBQUs7QUFBQSxRQUNMLFdBQVcsQ0FBQyxhQUFhLENBQUM7QUFBQSxNQUM1QixDQUFDO0FBQUE7QUFBQSxNQUVELHFCQUFxQjtBQUFBO0FBQUEsUUFFbkIsVUFBVSxDQUFDLEtBQUssUUFBUSxNQUFNLGVBQWUsQ0FBQztBQUFBO0FBQUEsUUFFOUMsVUFBVTtBQUFBLE1BQ1osQ0FBQztBQUFBO0FBQUEsTUFFRCxlQUFlO0FBQUE7QUFBQSxNQUVmLGdCQUFnQjtBQUFBO0FBQUEsTUFFaEIsaUJBQWlCO0FBQUEsUUFDZixRQUFRO0FBQUEsVUFDTixNQUFNO0FBQUEsWUFDSixjQUFjLElBQUkscUJBQXFCO0FBQUEsVUFDekM7QUFBQSxRQUNGO0FBQUEsTUFDRixDQUFDO0FBQUE7QUFBQSxNQUVELFVBQVUsSUFBSSxhQUFhO0FBQUEsSUFDN0I7QUFBQSxJQUNBLFNBQVM7QUFBQSxNQUNQLE9BQU87QUFBQSxRQUNMLEtBQUssY0FBYyxJQUFJLElBQUksU0FBUyx3Q0FBZSxDQUFDO0FBQUEsTUFDdEQ7QUFBQTtBQUFBLElBRUY7QUFBQSxJQUNBLFFBQVE7QUFBQSxNQUNOLE1BQU07QUFBQTtBQUFBO0FBQUEsTUFHTixPQUFPO0FBQUEsUUFDTCxTQUFTO0FBQUEsVUFDUCxRQUFRO0FBQUEsUUFDVjtBQUFBLE1BQ0Y7QUFBQSxJQUNGO0FBQUEsSUFDQSxPQUFPO0FBQUEsTUFDTCxRQUFRLElBQUk7QUFBQSxNQUNaLGVBQWU7QUFBQSxRQUNiLFFBQVE7QUFBQSxVQUNOLGdCQUFnQjtBQUFBLFVBQ2hCLGdCQUFnQjtBQUFBLFVBQ2hCLGdCQUFnQjtBQUFBLFFBQ2xCO0FBQUEsTUFDRjtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBQ0YsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
