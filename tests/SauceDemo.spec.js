const {test, expect } = require('@playwright/test')
const testData = require ('../Data/testData.json');
const {LoginPage} = require ('../pages/LoginPage')
const { addToCart} = require('../pages/addToCart')
const {checkOut} = require('../pages/checkOut')
test('Sauce demo', async({page})=>{
    const login = new LoginPage(page);
    await login.Navigation(testData.url);
    // const Saucelog = new LoginPage(page);
    await login.SauceLogin(testData.username, testData.password);
    await page.locator('.inventory_item_img').first().waitFor({state:'visible'})
    const addAllProdToCart = new addToCart(page)
    await addAllProdToCart.addCart()
    const checkedOut = new checkOut(page);
    await checkedOut.checkOutProd(testData.fname,testData.lname,testData.zipCode)
    await checkedOut.generatePdf(testData.Path)
   
})