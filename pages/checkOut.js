const { expect }= require('@playwright/test')
class checkOut{
constructor(page) {
    this.page = page;
    this.bagIcon = page.locator('//span[@data-test="shopping-cart-badge"]');
    this.products = page.locator('.inventory_item_name')
    this.checkOut = page.locator('#checkout')
    this.price = page.locator('.inventory_item_price')
    this.FirstNameInput = page.locator('#first-name')
    this.LastNameInput = page.locator('#last-name')
    this.zipCodeInput = page.locator('#postal-code')
    this.continueBtn = page.locator('#continue')
    this.finishBtn =  page.locator('//button[@name="finish"]')
    this.taxAmount = page.locator('.summary_tax_label')
    this.TotalPrice = page.locator('.summary_total_label')
    this.downloadPDF = page.locator('#generate-pdf-order')
}

async checkOutProd (fname,lname,zipCode){
    await this.bagIcon.click();
    await expect(this.products.first()).toBeVisible();
    const allPrice = await this.price.allTextContents();
    // const allPrice1 = parseFloat(allPrice.replace('$',''))
    console.log(allPrice)
    const totalPrice = allPrice.reduce((sum, price) => {
    return sum + parseFloat(price.replace('$', ''));
    }, 0);
    console.log(`Total price: ${totalPrice.toFixed(2)}`);
    const allProducts = await this.products.allTextContents();
    console.log (`added all products "${allProducts}"`);
    await this.checkOut.click();
    await this.FirstNameInput.fill(fname)
    await this.LastNameInput.fill(lname);
    await this.zipCodeInput.fill(zipCode);
    await this.continueBtn.click();
    // const tax = await this.taxAmount.textContent();
    // const Tax = parseFloat(tax.replace(/^[0-9.]/g, ''))
    // console.log (Tax)
    // const grandTotal = Tax + totalPrice
    // const ExpGrandTotal = await this.TotalPrice.textContent()
    // console.log(ExpGrandTotal)
    // expect(ExpGrandTotal.replace("$",'')).toBe(grandTotal)
    const taxText = await this.taxAmount.textContent();
    const tax = parseFloat(taxText.replace(/[^0-9.]/g, ''));

    const grandTotal = tax + totalPrice;

    const totalText = await this.TotalPrice.textContent();
    const expectedGrandTotal = parseFloat(totalText.replace(/[^0-9.]/g, ''));

    console.log(`Tax: ${tax}`);
    console.log(`Calculated total: ${grandTotal}`);
    console.log(`Expected total: ${expectedGrandTotal}`);

    expect(expectedGrandTotal).toBeCloseTo(grandTotal, 2);
    await this.finishBtn.click()
    }

    async generatePdf(Path){
    const downloadPromise = this.page.waitForEvent('download');
    await this.downloadPDF.click();
    const download = await downloadPromise;
    console.log('File name:', download.suggestedFilename());
    const filePath = await download.path();
    console.log('Downloaded to:', Path);
    }
}
module.exports= {checkOut}