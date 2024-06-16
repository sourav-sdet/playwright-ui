const {test,expect} =require('@playwright/test')


//Use of Test annototation which is treated as a single test case.
test('Lets Shop Web App Login', async ({page})=>{

    //Variables
    const productName='ZARA COAT 3'

    //Locators
    const username=page.locator('#userEmail')
    const password=page.locator('#userPassword')
    const loginBtn=page.locator("[value='Login']")
    const products=page.locator('div .card-body')
    const cartButton=page.locator("[routerLink*='cart']")
    

    //Login to the page
    await page.goto("https://rahulshettyacademy.com/client/")
    await username.fill("anshika@gmail.com")
    await password.fill("Iamking@000")
    await loginBtn.click()
    
    await products.first().waitFor()

    //Number of elements matching the selector
    const productsCount= await products.count();
    console.log(productsCount)

    //Select Product Zara Coat 3
    for(let i=0; i< productsCount; ++i){

        if (await products.nth(i).locator('b').textContent() === productName){
            //Add the Product to Cart
            await products.nth(i).locator("text= Add To Cart").click()
            break;
        }

    }

    //Click On Cart Button
    await cartButton.click()

    //Validate if the added product is present on Cart Page
    //isVisible() method does not have any general checks for waiting
    await page.locator('div li').first().waitFor() 
    const productPresent=await page.locator("h3:has-text('ZARA COAT 3')").isVisible()
    expect(productPresent).toBeTruthy()


});