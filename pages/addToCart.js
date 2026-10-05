const { expect } = require('@playwright/test')
class addToCart{
   constructor(page) {
        this.page = page;

        this.products = page.locator('.inventory_item');
        this.productNames = page.locator('.inventory_item_name');
    }

    async addCart() {

        const productNames = await this.productNames.allTextContents();

        console.log(productNames);

        for (const product of await this.products.all()) {

            const prodName = await product
                .locator('.inventory_item_name')
                .textContent();

            const addButton = product.getByRole('button', {
                name: 'Add to cart'
            });

            await addButton.click();

            const removeButton = product.getByRole('button', {
                name: 'Remove'
            });

            await removeButton.waitFor({
                state: 'visible'
            });

            console.log(`Product is added to bag "${prodName}"`);
        }
    }
}


module.exports= {addToCart }