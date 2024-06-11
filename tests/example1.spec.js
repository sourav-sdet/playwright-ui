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


    //Locators
    const userName=page.locator('#username')
    const password=page.locator("[type='password']")
    const signInBtn=page.locator('#signInBtn')
    
    //Identify an element in the webpage, enter text/perform click action
    await page.locator('input#username').fill('rahulshetty')
    await page.locator("[type='password']").fill('learning')
    await page.locator('#signInBtn').click()

    //Extract Text from a web element
    console.log(await page.locator("[style*='block']").textContent())
    await expect(page.locator("[style*='block']")).toHaveText('Incorrect username/password.')

    //Clear the username text field
    await userName.fill("")
    await userName.fill("rahulshettyacademy")
    await signInBtn.click()

    //Extract Text from a web element- resolves to 4 elements- WRONG WAY
    //await page.locator('.card-body a').textContent();

    //Extract Text from a single web element- resolves to 4 elements- CORRECT WAY
    console.log(await page.locator('.card-body a').first().textContent());
    console.log(await page.locator('.card-body a').nth(1).textContent());

    //Extract Text from a multiple web elements- resolves to 4 elements
    //No Auto Waiting for allTextContents()
    //No explicit synchronization for allTextContents()
    const allTitles=await page.locator('.card-body a').allTextContents()
    console.log(allTitles)

    


});

//Default Browser Context with {page} fixture
test('Page Fixture in Playwright', async ({page})=>{

    await page.goto("https://www.google.com");

    //Get the title of the page
    console.log(await page.title());

    //Assert Page Title
    await expect(page).toHaveTitle("Google")

})
