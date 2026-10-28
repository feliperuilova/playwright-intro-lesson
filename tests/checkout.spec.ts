
import { test, expect } from '@playwright/test';

test('show success message when order created', async ({ page }) => {
    await page.goto('https://shop.tl-academy.ee/checkout');

    await page.getByTestId('email-input').fill('test@gmail.com');
    await page.getByTestId('name-input').fill('Dan Brown');

    // check button enabled
    await expect(page.getByTestId('place-order-button')).toBeEnabled();

    // click on button
    await page.getByTestId('place-order-button').click();

    // check success message -- order message
    await expect(page.getByTestId('order-message')).toBeVisible();
});

// default state: button disabled + Delivery method is parcel + Payment method is bank card

test.only ('default state validation', async ({ page }) => {
    await page.goto('https://shop.tl-academy.ee/checkout');

    // 1. check button disabled
    await expect(page.getByTestId('place-order-button')).toBeDisabled();

    // 2. radio is active for parcel -- delivery-parcel-locker-radio
    await expect(page.getByTestId('delivery-parcel-locker-radio')).toBeChecked();
    //delivery-home-radio
    await expect(page.getByTestId('delivery-home-radio')).not.toBeChecked();

    // 2. radio is active for payment card  -- payment-card-radio
    await expect(page.getByTestId('payment-card-radio')).toBeChecked();
    //payment-paypal-radio
    await expect(page.getByTestId('payment-paypal-radio')).not.toBeChecked();
});

