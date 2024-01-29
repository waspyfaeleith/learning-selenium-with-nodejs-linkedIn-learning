//const { expect } = require("chai");
import { expect } from "chai";
import { Builder, By, Select } from "selenium-webdriver";

describe("sandwich order", function () {
  this.timeout(5000);
  let driver;

  beforeEach(async function () {
    // setup/arrange
    await driver.get("http://localhost:4200/order/sandwich");
    let title = await driver.getTitle();

    expect(title).to.equal("Order a Sandwich | BreadShop");
  });

  after(async function () {
    // teardown
    await driver.quit();
  });

  before(async function () {
    driver = await new Builder().forBrowser('chrome').build();
    await driver.manage().setTimeouts({ implicit: 1000 });

  });

  it("selects the bread type", async function () {

    // act
    let ryeBreadOption = await driver.findElement(By.id("bread-type-rye"));
    await ryeBreadOption.click();

    //assert
    let selectedElement = await driver.findElement(By.className("bread-type-value"));
    let selectedValue = await selectedElement.getText();

    expect(selectedValue).to.equal("rye bread");
  });

  it("selects the main filling", async function () {

    // act
    let mainFillingElement = await driver.findElement(By.id("form-select-main-filling"));
    let select = new Select(mainFillingElement);
    await select.selectByValue("tofu");


    //assert
    let selectedElement = await driver.findElement(By.className("main-filling-value"));
    let selectedValue = await selectedElement.getText();

    expect(selectedValue).to.equal("tofu");
  });
});