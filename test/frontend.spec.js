const chai = require('chai');
const should = chai.should();
const webdriver = require('selenium-webdriver');
const test  = require('selenium-webdriver/testing');

describe('front-end usage', () => {
  let driver;

  test.beforeEach(()=> {
    this.timeout(100000);
    driver = new webdriver.Builder()
                          .forBrowser('chrome')
                          .build();
    driver.get('http://localhost:3000');
  });

  test.afterEach(()=> {
    driver.quit();
  });
  
  test.it('should allow you to put something into the garage', () => {
    const nameInput = driver.findElement({ id: 'item-name'});
    const reasonInput = driver.findElement({ id: 'item-reason'});
    const button = driver.findElement({ id: 'add-btn' });
    const opener = driver.findElement({ id: 'opener' });
    
    nameInput.sendKeys('Car');
    reasonInput.sendKeys('just kidding');
    button.click();
    
    opener.click();
    
    const renderedNames = driver.findElement({ id: 'item-name' });
    const renderedReasons = driver.findElement({ id: 'item-reason' });
    
    renderedNames.getText().then(text => {
      text.should.equal('Car');
    });
    
    renderedReasons.getText().then(text => {
      text.should.equal('just kidding');
    });
  });
  
  test.it('should not allow you to add something if data is missing', () => {
    
  });
  
  test.it('should start with the garage closed', () => {
    
  });
  
  test.it('should display garage items when the door is open', () => {
    
  });
});