//Playwright Test Annotation
const {test,expect} =require('@playwright/test')

//Use of Test annototation which is treated as a single test case.

test('Handling Child Windows and Tabs', async ({browser})=>{

    //Navigate to the Base Page
    const context=await browser.newContext()
    const page=await context.newPage()
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/")
    

    //Assertion to check attribute value
    await expect (page.locator("[href*='documents-request']")).toHaveAttribute('class', 'blinkingText')

    //Click on the link
    //page.locator("[href*='documents-request']").click()

    //Switch to a new page
    //context.waitForEvent('page')

    const [page1]=await Promise.all(
        [
            context.waitForEvent('page'),
            page.locator("[href*='documents-request']").click()

        ]


    )

    //Fetch text from the new page
    const text= await page1.locator('.red').textContent()
    console.log(text)

    //Split the text from above to get the email id
    const arrayText=text.split('@')
    const email=arrayText[1].split(' ')[0]
    console.log(email)


    //Enter the email id in the original page for username
    await page.locator('#username').fill(email)
    await page.pause()




});