//require('chromedriver'); // new addition - remove it later
const {Builder, By, until} = require('selenium-webdriver');

(async function testForm() {
  let driver = await new Builder().forBrowser('chrome').build();
  try {
    await driver.get('http://54.89.222.182/'); //<TESTING-WEB-SERVER-IP>

    // Fill out the form
    await driver.findElement(By.name('name')).sendKeys('Alice');
    await driver.findElement(By.name('email')).sendKeys('alice@example.com');
    await driver.findElement(By.name('role')).sendKeys('Developer');

    // Click submit
    await driver.findElement(By.id('submit')).click();

    // Wait for success message
    await driver.wait(until.elementLocated(By.id('success')), 3000);

    console.log('Test Success');
  } catch (e) {
    console.log('Test Failed', e);
  } finally {
    await driver.quit();
  }
})();