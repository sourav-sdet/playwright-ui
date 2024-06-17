const {test,expect} =require('@playwright/test')


//Use of Test annototation which is treated as a single test case.
test('Lets Shop Web App Login', async ({page})=>{

    //Variables
    const productName='ZARA COAT 3'
    const userEmail="anshika@gmail.com"
    const userPwd="Iamking@000"

    //Locators
    const username=page.locator('#userEmail')
    const password=page.locator('#userPassword')
    const loginBtn=page.locator("[value='Login']")
    const products=page.locator('div .card-body')
    const cartButton=page.locator("[routerLink*='cart']")
    const checkoutButton=page.locator("text='Checkout'")
    const countryValue=page.locator("[placeholder*='Country']")
    const countryOptions=page.locator(".ta-results")
    const emailIDLabel=page.locator(".user__name [type='text']")
    const placeOrderButton=page.locator(".action__submit")
    const orderConfirmMessage=page.locator(".hero-primary")
    const orderIDLabel=page.locator(".em-spacer-1 .ng-star-inserted")
    const ordersButton=page.locator("button[routerLink*='myorders']")
    const orderHistoryRows=page.locator("tbody tr")
    const orderIDDetailsPageLabel=page.locator(".col-text")
    

    //Login to the page
    await page.goto("https://rahulshettyacademy.com/client/")
    await username.fill(userEmail)
    await password.fill(userPwd)
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
    //isVisible() method does not have any general checks for auto waiting
    await page.locator('div li').first().waitFor() 
    const productPresent=await page.locator("h3:has-text('ZARA COAT 3')").isVisible()
    expect(productPresent).toBeTruthy()

    //Click on Checkout Button
    await checkoutButton.click()

    //Enter Country Value
    await countryValue.pressSequentially("Ind")
    
    //Wait until the Country List Appears
    await countryOptions.waitFor()

    //Select India from the list of options
    const optionsCount= await countryOptions.locator("button").count()
    for(let i=0; i< optionsCount; i++){
        const countryText= await countryOptions.locator("button").nth(i).textContent()
        if(countryText === " India"){
            await countryOptions.locator("button").nth(i).click()
            break
        }
    }

    //Validate the Email ID
    await expect(page.locator(".user__name [type='text']").first()).toHaveText(userEmail);


    //Click on Place Order button
    await placeOrderButton.click()

    //Verify Order successful message
    await expect (orderConfirmMessage).toHaveText(" Thankyou for the order. ")

    //Find the orderID
    const orderID=await orderIDLabel.textContent()
    console.log(orderID)

    //Navigate to Order History Page
    await ordersButton.click()


    //Search Order ID and click on view link
    await page.locator("tbody").waitFor()
    const rows= orderHistoryRows
    for(let i=0; i< await rows.count(); i++){

        const rowOrderID= await rows.nth(i).locator('th').textContent()
        if(orderID.includes(rowOrderID)){
            await rows.nth(i).locator('button').first().click()
            break
        }

    }

    //Validation if order id is correct
    const orderIDdetailsPage=await orderIDDetailsPageLabel.textContent()
    expect(orderID.includes(orderIDdetailsPage)).toBeTruthy()
    

});