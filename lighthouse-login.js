module.exports = async (browser) => {
  const page = await browser.newPage();

  // vào đúng trang
  await page.goto("https://tqa-test.deha.vn", {
    waitUntil: "networkidle2"
  });

  // đợi React render form
  await page.waitForSelector('input[placeholder="Email"]');

  // nhập dữ liệu
  await page.type('input[placeholder="Email"]', "duy@gmail.com");
  await page.type('input[placeholder="Password"]', "123456");

  // submit
  await Promise.all([
    page.click('button.login-button'),
    page.waitForNavigation({ waitUntil: "networkidle2" })
  ]);

  // đợi redirect sang /home
  await page.waitForTimeout(2000);

  // lấy token từ localStorage để gửi kèm header Authorization
  const token = await page.evaluate(() => localStorage.getItem("token"));

  return {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };
};