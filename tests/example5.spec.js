const {test,expect} =require('@playwright/test')

test('Playwright Special Locators', async ({page})=>{

    await page.goto("https://rahulshettyacademy.com/angularpractice/")
    
    //getByLabel()
    await page.getByLabel("Check me out if you Love IceCreams!").check()
    await page.getByLabel("Employed").check()
    await page.getByLabel("Gender").selectOption("Male")

    //getByPlaceholder()
    await page.getByPlaceholder("Password").fill("Password")

    //getByRole()
    await page.getByRole("button", {name:'Submit'}).click()

    //getByText()
    await page.getByText("Success! The form has been submitted successfully!.").isVisible()

    await page.getByRole("link", {name: 'Shop'}).click()

    //Filter Method and Chaining of Locators
    await page.locator("app-card").filter({hasText: 'Nokia Edge'}).getByRole("button").click()


})
