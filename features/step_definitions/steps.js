const seleniumWebdriver = require('selenium-webdriver');
const { Given, And, Then, When, By, AfterAll } = require('cucumber');
const assert = require('assert')

require('./hooks.js')

//const {AfterAll} = require('cucumber')

driver = new seleniumWebdriver.Builder()
                .forBrowser('chrome')
                .build();

Given('I visit the Pantry Website', () => {
  driver.sleep(500);
  return driver.get('http://localhost:3000/');
});

Given('I click login', () => {
  return driver.findElement(seleniumWebdriver.By.id("login")).click();
});

Given('I enter my username and password',  () => {
  driver.findElement(seleniumWebdriver.By.id("email")).click();
  driver.findElement(seleniumWebdriver.By.id("email")).sendKeys("testAuto@mail.com");
  driver.findElement(seleniumWebdriver.By.id("password")).click();
  driver.findElement(seleniumWebdriver.By.id("password")).sendKeys("Test_Automation");
  return driver.findElement(seleniumWebdriver.By.id("login-button")).click();
});
/*
When('I visit the Pantry Website', () => {
  return driver.get('http://localhost:3000/')
    .then(res => res.json())
    .then(body => doSomethingWithResponse(body));
});
*/
Then('I see Welcome Test_Automation', () => {
  driver.findElement(seleniumWebdriver.By.id("welcome")).getText()
  .then(res => console.log(res));
  // NoSuchElementError: no such element: Unable to locate element: {"method":"css selector","selector":"*[id="welcome"]"}
  // var text = driver.findElement(seleniumWebdriver.By.id("welcome")).getText();
  // console.log(text + "Welcome screen");
});

Then('I click on Recipes', function () {
  return driver.findElement(seleniumWebdriver.By.id("recipes-nav")).click();
});

Then('I enter a recipe Name', function () {
  driver.findElement(seleniumWebdriver.By.id("recipe-name")).click();
  driver.findElement(seleniumWebdriver.By.id("recipe-name")).sendKeys("BLT");
});

Then('I enter recipe Ingredients', function () {
  driver.findElement(seleniumWebdriver.By.id("recipe-ingredients")).click();
  driver.findElement(seleniumWebdriver.By.id("recipe-ingredients")).sendKeys("Bread Bacon Lettuce Tomato Mayonaise");
  driver.sleep(500);
});

Then('I enter a recipe method', function () {
  driver.findElement(seleniumWebdriver.By.id("recipe-method")).click();
  driver.findElement(seleniumWebdriver.By.id("recipe-method")).sendKeys("Fry the bacon in a little oil - Toast the bread - Assemble sandwich");
});

Then('I click submit to add the recipe', function () {
  return driver.findElement(seleniumWebdriver.By.id("recipe-submit")).click();
});

AfterAll(() => {
    console.log('----Executing AfterAll hook----');
    return driver.quit();
})
