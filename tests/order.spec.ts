import { test, expect } from '@playwright/test';

test('fill all fields and submit order', async ({ page }) => {
  await page.goto('https://basic-ui.tl-academy.ee/en/');

  await expect(page.getByTestId('create-order-button')).toBeDisabled();

  // fill first name
  await page.getByTestId('first-name-input').fill('Dan');
  await expect(page.getByTestId('create-order-button')).toBeDisabled();

  // fill last name
  await page.getByTestId('last-name-input').fill('Brown');
  await expect(page.getByTestId('create-order-button')).toBeDisabled();
  // fill email
  await page.getByTestId('email-input').fill('test@gmail.com');
  await expect(page.getByTestId('create-order-button')).toBeDisabled();
  // fill address
  await page.getByTestId('address-input').fill('Tallinn, Viimsi, 4');
  await expect(page.getByTestId('create-order-button')).toBeEnabled();
  // click 'create order'
  await page.getByTestId('create-order-button').click();

  // Expect success message is visible.
  await expect(page.getByTestId('order-success')).toBeVisible();
});

//email-error
test('Shows error on invalid email and disabled button', async ({ page }) => {
  await page.goto('https://basic-ui.tl-academy.ee/en/');


  // fill first name
  await page.getByTestId('first-name-input').fill('Dan');

  // fill last name
  await page.getByTestId('last-name-input').fill('Brown');

  // fill email
  await page.getByTestId('email-input').fill('test@');

  // fill address
  await page.getByTestId('address-input').fill('Tallin, Viimsi, 4');

  // click 'create order'
  await expect(page.getByTestId('email-error')).toBeVisible();

  // Expect success message is visible.
  await expect(page.getByTestId('create-order-button')).toBeDisabled();
});


test('Shows error on each field', async ({ page }) => {
  await page.goto('https://basic-ui.tl-academy.ee/en/');


  await page.getByTestId('first-name-input').click();
  await page.getByTestId('last-name-input').click();

//first name error
  await expect(page.getByTestId('first-name-error')).toBeVisible();

  await page.getByTestId('email-input').click();

  //last name error
  await expect(page.getByTestId('last-name-error')).toBeVisible();
  await page.getByTestId('address-input').click();

  // email error
  await expect(page.getByTestId('email-error')).toBeVisible();
  await page.getByTestId('first-name-input').click();

  // address error
  await expect(page.getByTestId('address-error')).toBeVisible();
});
