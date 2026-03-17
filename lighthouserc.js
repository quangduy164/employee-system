module.exports = {
  ci: {
    collect: {
      chromePath: "/usr/bin/chromium",
      url: [
        "https://tqa-test.deha.vn",
        "https://tqa-test.deha.vn/home"
      ],
      numberOfRuns: 1,
      puppeteerScript: "lighthouse-login.js",
      settings: {
        chromeFlags: "--headless --no-sandbox --disable-gpu"
      }
    }
  }
};