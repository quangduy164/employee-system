module.exports = {
  ci: {
    collect: {
      url: [
        "https://tqa-test.deha.vn"
      ],
      numberOfRuns: 1,

      puppeteerScript: "lighthouse-login.js",

      chromePath: "/usr/bin/chromium-browser",

      puppeteerLaunchOptions: {
        args: ["--no-sandbox", "--disable-gpu"]
      }
    }
  }
};