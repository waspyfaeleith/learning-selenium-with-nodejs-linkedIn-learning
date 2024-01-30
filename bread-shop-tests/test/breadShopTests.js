//const { expect } = require("chai");
import { expect } from "chai";
import { Builder, By, Select } from "selenium-webdriver";
import { SandwichPage } from "../page_models/sandwichPage.js";
//const { SandwichPage } = require("../page_models/sandwichPage");

describe("sandwich order", function () {
  this.timeout(5000);
  let driver;
  let sandwichPage;

  beforeEach(async function () {
    // setup/arrange
    await driver.get("http://localhost:4200/order/sandwich");
    sandwichPage = new SandwichPage(driver);
    sandwichPage.validatePage();
  });

  after(async function () {
    // teardown
    await driver.quit();
  });

  before(async function () {
    driver = await new Builder().forBrowser('chrome').build();
    await driver.manage().setTimeouts({ implicit: 1000 });

  });

  describe("bread type selection", function() {
    it("displays the selected value", async function () {

      // act
      await sandwichPage.selectRyeBreadOption();
  
      // assert
      let selectedValue = await sandwichPage.getBreadTypeOverview();
  
      expect(selectedValue).to.equal("rye bread");
    });

    it("removes the placeholder text", async function () {

      // act
      await sandwichPage.selectRyeBreadOption();
  
      // assert
      let breadTypePlaceholders = await sandwichPage.getBreadTypePlaceholders();
      expect(breadTypePlaceholders).to.have.length(0);
    });
  });
  

  it("selects the main filling", async function () {

    // act
    await sandwichPage.selectTofuFillingOption();

    // assert
    let selectedValue = await sandwichPage.getMainFillingOverview();

    expect(selectedValue).to.equal("tofu");
  });

  it("updates the total price when the bread type is selected", async function() {
    
    // act
    expect(await sandwichPage.getTotalPrice()).to.equal("$0");

    await sandwichPage.selectRyeBreadOption();

    // assert
    expect(await sandwichPage.getTotalPrice()).to.equal("$6");

  });

  it("selects tomatoes and ketchup extras", async function() {
    
    // act
    await sandwichPage.selectExtraOption("extra-option-1");
    await sandwichPage.selectExtraOption("extra-option-3");

    // assert
    expect(await sandwichPage.selectedExtraFillingOveview()).to.equal("tomatoes, ketchup");

  });

  // suggested solution
  it("selects extra fillings", async function() {
    // act
    await sandwichPage.selectExtraSaladFilling();
    await sandwichPage.selectExtraKetchupFilling();

    // assert
    expect(await sandwichPage.selectedExtraFillingOveview()).to.equal("salad, ketchup");
  });
});