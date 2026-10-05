const{ expect } = require('@playwright/test')
class LoginPage {
    constructor(page){
        this.page = page;
        this.usernameInput = page.locator('#user-name')
        this.passwordInput = page.locator('#password')
        this.loginBtn  = page.locator ('//input[@name="login-button"]')       
      
    }
        async Navigation(url){
            await this.page.goto(url)
        }
        async SauceLogin(username, password){
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password) ;
        await this.loginBtn.click()
        
        }
}

module.exports = {LoginPage}