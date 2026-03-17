module.exports = {
  ci: {
    collect: {
      url: [
        "https://tqa-test.deha.vn"
      ],
      numberOfRuns: 3,

      settings: {
        preset: "desktop"
      },

      puppeteerScript: "lighthouse-login.js",

      chromePath: "/usr/bin/chromium-browser",

      puppeteerLaunchOptions: {
        args: ["--no-sandbox", "--disable-gpu"]
      }
    },

    assert: {
      assertions: {
        "categories:performance": ["error", { minScore: 0.8 }],
        "categories:accessibility": ["error", { minScore: 0.9 }],
        "categories:best-practices": ["error", { minScore: 0.85 }],
        "categories:seo": ["error", { minScore: 0.9 }],

        "unused-javascript": ["warn", { maxLength: 2 }],
        "uses-text-compression": "warn",
        "network-dependency-tree-insight": "off",
        "render-blocking-resources": "warn"
      }
    }
  }
};