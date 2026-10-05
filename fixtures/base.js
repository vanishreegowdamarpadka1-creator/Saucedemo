
const base = require('@playwright/test');
//const { Swagllabslogin } = require('../POM/Swaglabslogin');
const { LoginPage } = require('../pages/LoginPage')
exports.test = base.test.extend({
    login: async ({ page }, use) => {
         const login = new LoginPage(page);
        await use(login);
    }
});
exports.expect = base.expect;