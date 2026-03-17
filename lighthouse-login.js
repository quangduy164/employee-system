module.exports = async (browser) => {
  const page = await browser.newPage();

  // 1. vào đúng trang login
  await page.goto("https://tqa-test.deha.vn/login", {
    waitUntil: "networkidle2"
  });

  // 2. nhập email + password (FIX selector)
  await page.type('input[placeholder="Email"]', "duy@gmail.com");
  await page.type('input[placeholder="Password"]', "123456");

  // 3. submit form
  await Promise.all([
    page.click('button.login-button'),
    page.waitForNavigation({ waitUntil: "networkidle2" })
  ]);

  // 4. đợi redirect (React thường chậm)
  await page.waitForTimeout(2000);

  // 5. lấy cookie
  const token = await page.evaluate(() => localStorage.getItem("token"));

  return {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };
};