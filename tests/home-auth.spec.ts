import { expect, test } from '@playwright/test';

import { ClubsPage } from './pages/ClubsPage';
import { HomePage } from './pages/HomePage';
import { LoginModal } from './pages/LoginModal';
import { RegistrationModal } from './pages/RegistrationModal';

test.describe('Guest auth & registration', () => {
  test('Profile dropdown shows Login and Register', async ({ page }) => {
    const homePage = new HomePage(page);

    await homePage.open();
    await homePage.openProfileMenu();

    await expect(homePage.getLoginMenuItem()).toBeVisible();
    await expect(homePage.getRegisterMenuItem()).toBeVisible();
  });

  test('Login menu item opens login modal', async ({ page }) => {
    const homePage = new HomePage(page);
    const loginModal = new LoginModal(page);

    await homePage.open();
    await homePage.openProfileMenu();
    await homePage.clickLogin();

    await loginModal.waitForOpen();

    await expect(loginModal.getTitleText()).resolves.toBe('Вхід');
    await expect(loginModal.isEmailVisible()).resolves.toBe(true);
    await expect(loginModal.isPasswordVisible()).resolves.toBe(true);
    await expect(loginModal.isGoogleButtonVisible()).resolves.toBe(true);
    await expect(loginModal.isFacebookButtonVisible()).resolves.toBe(true);
  });

  test('Register menu item opens registration modal', async ({ page }) => {
    const homePage = new HomePage(page);
    const registrationModal = new RegistrationModal(page);

    await homePage.open();
    await homePage.openProfileMenu();
    await homePage.clickRegister();

    await registrationModal.waitForOpen();

    await expect(registrationModal.getTitleText()).resolves.toBe('Реєстрація');
    await expect(
      registrationModal.isVisitorRoleVisible(),
    ).resolves.toBe(true);
    await expect(
      registrationModal.isManagerRoleVisible(),
    ).resolves.toBe(true);
    await expect(
      registrationModal.isLastNameVisible(),
    ).resolves.toBe(true);
    await expect(
      registrationModal.isFirstNameVisible(),
    ).resolves.toBe(true);
    await expect(
      registrationModal.isPhoneVisible(),
    ).resolves.toBe(true);
    await expect(
      registrationModal.isEmailVisible(),
    ).resolves.toBe(true);
    await expect(
      registrationModal.isPasswordVisible(),
    ).resolves.toBe(true);
    await expect(
      registrationModal.isConfirmPasswordVisible(),
    ).resolves.toBe(true);
    await expect(
      registrationModal.isSubmitDisabled(),
    ).resolves.toBe(true);
  });

  test('Add club button opens login modal for guest', async ({ page }) => {
    const homePage = new HomePage(page);
    const loginModal = new LoginModal(page);

    await homePage.open();
    await homePage.clickAddClub();

    await loginModal.waitForOpen();

    await expect(loginModal.getTitleText()).resolves.toBe('Вхід');
  });

  test('Login modal shows validation errors on empty submit', async ({
    page,
  }) => {
    const homePage = new HomePage(page);
    const loginModal = new LoginModal(page);

    await homePage.open();
    await homePage.openProfileMenu();
    await homePage.clickLogin();

    await loginModal.waitForOpen();
    await loginModal.submitEmptyForm();

    await expect(loginModal.getValidationErrors()).resolves.toEqual([
      'Please enter Емейл',
      'Please enter Пароль',
    ]);
  });

  test('Home page has Add club button and navigates to clubs via menu', async ({
    page,
  }) => {
    const homePage = new HomePage(page);

    await homePage.open();

    await expect(homePage.isAddClubButtonVisible()).resolves.toBe(true);

    await homePage.navigateViaTopMenu('Гуртки');

    const clubsPage = new ClubsPage(page);

    await expect(clubsPage.getPageTitleText()).resolves.toContain(
      'Гуртки в місті',
    );
  });
});