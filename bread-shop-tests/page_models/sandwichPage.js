import { By, Select } from "selenium-webdriver";

class SandwichPage {
  
  constructor(driver) {
    this.driver = driver;
  }

  async validatePage() {
    let title = await this.driver.getTitle();
    if (title != "Order a Sandwich | BreadShop") {
      throw Error("You are on the wrong page!");
    }
  }

  selectRyeBreadOption() {
    return this.driver.findElement(By.id("bread-type-rye")).click();
  }

  getBreadTypeOverview() {
    return this.driver.findElement(By.className("bread-type-value")).getText();
  }

  async selectTofuFillingOption () {
    let mainFillingElement = await this.driver.findElement(By.id("form-select-main-filling"));
    let select = new Select(mainFillingElement);
    await select.selectByValue("tofu");
  }

  getMainFillingOverview() {
    return this.driver.findElement(By.className("main-filling-value")).getText();
  }

  getTotalPrice() {
    return this.driver.findElement(By.className("total-price")).getText();
  }
}

export { SandwichPage }