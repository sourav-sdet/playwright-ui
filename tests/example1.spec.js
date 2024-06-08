//Playwright Test Annotation
const {test,expect} =require('@playwright/test');

//Use of Test annototation which is treated as a single test case.


//{browser}: Playwright fixture for browser context, available globally for all tests
test.only('Browser Fixture in Playwright', async ({browser})=>{

    //Create a new browser context
    const context= await browser.newContext();

    //Initialize a page for the browser context and navigate to a URL
    const page=await context.newPage();
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    
    //Identify an element in the webpage, enter text/perform click action
    await page.locator('input#username').fill('rahulshetty')
    await page.locator("[type='password']").fill('learning')
    await page.locator('#signInBtn').click()

    //Extract Text from a web element
    console.log(await page.locator("[style*='block']").textContent())
    await expect(page.locator('')).toHaveText('Incorrect username/password.')




});

//Default Browser Context with {page} fixture
test('Page Fixture in Playwright', async ({page})=>{

    await page.goto("https://www.google.com");

    //Get the title of the page
    console.log(await page.title());

    //Assert Page Title
    await expect(page).toHaveTitle("Google")

})
