import { expect, test } from '@playwright/test'

test('Open', async ({page}) => {
    await page.goto('/')

    await expect(page.getByText('Articles')).toBeVisible()
})
