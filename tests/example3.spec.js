//Playwright Test Annotation
const {test,expect} =require('@playwright/test')

//Use of Test annototation which is treated as a single test case.

test('Handling Dropdowns and checkboxes', async ({page})=>{

    //Login to the page
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/")
    await page.locator('input#username').fill('rahulshetty')
    await page.locator("[type='password']").fill('learning')


    //Static Dropdown- Select Tag
    await page.locator("select.form-control").selectOption('consult')

    //Pause the execution- Playwright Inspector to debug
    //await page.pause()

    //Handle Radio Button
    await page.locator('.radiotextsty').last().click()

    //Assertion toBeChecked()
    await expect (page.locator('.radiotextsty').last()).toBeChecked()


    //Not an assertion, just returns boolean value
    console.log(await page.locator('.radiotextsty').last().isChecked())

    await page.locator('#okayBtn').click()


    //Handle Checkbox- Check: click(), Uncheck: uncheck()
    await page.locator('#terms').click()
    await expect (page.locator('#terms')).toBeChecked()
    await page.locator('#terms').uncheck()

    //Assertion
    expect(await page.locator('#terms').isChecked()).toBeFalsy()


    //Assertion to check attribute value
    await expect (page.locator("[href*='documents-request']")).toHaveAttribute('class', 'blinkingText')

});