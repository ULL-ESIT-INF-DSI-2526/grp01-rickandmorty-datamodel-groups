import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    include: ["tests/**/*.{test,spec}.ts"],
    exclude: ["**/node_modules/**", "**/dist/**"],
    
    coverage: {
      provider: 'v8', 
      exclude: [
        "**/node_modules/**",
        "**/dist/**",
        "src/index.ts", 
        "tests/**"
      ],
      include: ["src/**"],
    },
  },
});