//Playwright Test Annotation
const {test,expect} =require('@playwright/test');


//Use of Test annototation which is treated as a single test case.

test('Multiple Webelements and waiting mechanisms', async ({page})=>{

    //Login to the page
    await page.goto("https://rahulshettyacademy.com/client/")
    await page.locator('#userEmail').fill("anshika@gmail.com")
    await page.locator('#userPassword').fill("Iamking@000")
    await page.locator("[value='Login']").click()
    
    //Extract Text from the first item in the page
    //console.log(await page.locator(".card-body a").first().textContent())

    //Extract Text all the items in the page
    //No auto wait for allTextContents
    //Wait till network comes to idle state
    //await page.waitForLoadState('networkidle')

    //Alternative for above
    await page.locator('.card-body b').first().waitFor()
    const allTitles= await page.locator(".card-body b").allTextContents()
    console.log(allTitles)


});