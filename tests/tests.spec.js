const {test, expect} = require('@playwright/test')

//saves to trace.zip file specified
let context;
let page;
test.beforeAll(async({browser}) => {
    context = await browser.newContext({
        recordVideo: {
            dir: 'videos/',
            size: {width: 800, height: 600}
        }
});
    await context.tracing.start({
        snapshots:true,
        screenshots:true
    })
    page= await context.newPage()
});

test.afterAll(async()=>{
    await context.tracing.stop({path: 'test_trace.zip'})
})

test.afterAll(async()=>{
    await page.close();
})

test('Test Search Bar', async ({}) => {

    await page.goto('https://www.outdoorgearlab.com/')
    await page.pause()
    
    await page.getByPlaceholder('Search...').click();
    await page.getByPlaceholder('Search...').fill('shoes');
    await page.getByPlaceholder('Search...').press('Enter');
})

test('Test Learn More and Let Us Know Links @fast', async({}) => {
    await page.goto('https://www.outdoorgearlab.com/')
    await page.getByText('Let us know!').click()
    await page.getByRole('textbox', { name: 'your name' }).fill('Jane Doe')
    await page.getByRole('textbox', { name: 'email address' }).fill('janedoe123@email.com')
    await page.locator('#feedback_comments').fill('This is a pretty cool website! I found the perfect pair of shoes. Thanks!')
})

//using copy selector locator method as hero wrapper changes every render
test('Test Review Button @fast', async ({}) => {
    await page.goto('https://www.outdoorgearlab.com/')
    await page.pause()
    await expect(page.locator('#hero_wrapper > div > div > a > div > div > span')).toBeVisible()
    await expect(page.locator('#hero_wrapper > div > div > a > div > div > span')).toHaveText('Read the Reviews')
    await expect(page.locator('#hero_wrapper > div > div > a > div > div > span')).toHaveCount(1)
    await page.locator('#hero_wrapper > div > div > a > div > div > span').click()
})