module.exports = {
  ci: {
    collect: {
      url: [
        "https://tqa-test.deha.vn",
        "https://tqa-test.deha.vn/home"
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