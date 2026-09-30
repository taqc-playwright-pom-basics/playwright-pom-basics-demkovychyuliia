import { type Locator, type Page } from '@playwright/test';

import { BaseComponent } from './base/BaseComponent';

export class RegistrationModal extends BaseComponent {
  private readonly title: Locator;
  private readonly visitorRole: Locator;
  private readonly managerRole: Locator;
  private readonly lastNameInput: Locator;
  private readonly firstNameInput: Locator;
  private readonly phoneInput: Locator;
  private readonly emailInput: Locator;
  private readonly passwordInput: Locator;
  private readonly confirmPasswordInput: Locator;
  private readonly submitButton: Locator;

  constructor(page: Page) {
    super(page, page.locator('.modal-registration'));

    this.title = this.root.getByRole('heading', {
      name: 'Реєстрація',
      exact: true,
    });

    this.visitorRole = this.root.getByText('Відвідувач', {
      exact: true,
    });

    this.managerRole = this.root.getByText('Керівник', {
      exact: true,
    });

    this.lastNameInput = this.root.getByPlaceholder(
      'Введіть ваше прізвище',
    );

    this.firstNameInput = this.root.getByPlaceholder(
      "Введіть ваше ім'я",
    );

    this.phoneInput = this.root.getByPlaceholder('__________');

    this.emailInput = this.root.getByPlaceholder(
      'Введіть ваш email',
    );

    this.passwordInput = this.root.getByPlaceholder(
      'Введіть ваш пароль',
    );

    this.confirmPasswordInput = this.root.getByPlaceholder(
      'Підтвердіть ваш пароль',
    );

    this.submitButton = this.root.getByRole('button', {
      name: 'Зареєструватися',
      exact: true,
    });
  }

  async waitForOpen(): Promise<void> {
    await this.root.waitFor({ state: 'visible' });
  }

  async getTitleText(): Promise<string> {
    return (await this.title.innerText()).trim();
  }

  async isVisitorRoleVisible(): Promise<boolean> {
    return this.visitorRole.isVisible();
  }

  async isManagerRoleVisible(): Promise<boolean> {
    return this.managerRole.isVisible();
  }

  async isLastNameVisible(): Promise<boolean> {
    return this.lastNameInput.isVisible();
  }

  async isFirstNameVisible(): Promise<boolean> {
    return this.firstNameInput.isVisible();
  }

  async isPhoneVisible(): Promise<boolean> {
    return this.phoneInput.isVisible();
  }

  async isEmailVisible(): Promise<boolean> {
    return this.emailInput.isVisible();
  }

  async isPasswordVisible(): Promise<boolean> {
    return this.passwordInput.isVisible();
  }

  async isConfirmPasswordVisible(): Promise<boolean> {
    return this.confirmPasswordInput.isVisible();
  }

  async isSubmitDisabled(): Promise<boolean> {
    return this.submitButton.isDisabled();
  }
}