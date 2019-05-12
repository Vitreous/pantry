const seleniumWebdriver = require('selenium-webdriver');
const { Given, And, Then, When, By } = require('cucumber');
const assert = require('assert')


driver = new seleniumWebdriver.Builder()
                .forBrowser('chrome')
                .build();


Given('I visit the Pantry Website', function() {
  return driver.get('http://localhost:3000/');
});

Given('I click login', function () {
  return driver.findElement(seleniumWebdriver.By.id("login")).click();
});

Given('I enter my username and password', function () {
  console.log("Username and Password from");
  driver.findElement(seleniumWebdriver.By.id("email")).click();
  driver.findElement(seleniumWebdriver.By.id("email")).sendKeys("testAuto@mail.com");
  driver.findElement(seleniumWebdriver.By.id("password")).click();
  driver.findElement(seleniumWebdriver.By.id("password")).sendKeys("Test_Automation");
  return driver.findElement(seleniumWebdriver.By.id("login-button")).click();
});

Then('I see Welcome Test_Automation', function () {
  var text = driver.findElement(seleniumWebdriver.By.id("welcome")).getText();
  console.log(text);
});
