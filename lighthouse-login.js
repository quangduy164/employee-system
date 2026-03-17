module.exports = async (browser) => {
  const page = await browser.newPage();

  await page.goto("https://tqa-test.deha.vn", {
    waitUntil: "networkidle2"
  });

  // đợi form login
  await page.waitForSelector('input[placeholder="Email"]');

  // nhập login
  await page.type('input[placeholder="Email"]', "duy@gmail.com");
  await page.type('input[placeholder="Password"]', "123456");

  await Promise.all([
    page.click('button.login-button'),
    page.waitForNavigation({ waitUntil: "networkidle2" })
  ]);

  // ✅ ĐỢI HOME LOAD (QUAN TRỌNG NHẤT)
  await page.waitForSelector('input[placeholder="Search name or email..."]');

  // lấy token
  const token = await page.evaluate(() => localStorage.getItem("token"));

  await page.close();

  return {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };
};