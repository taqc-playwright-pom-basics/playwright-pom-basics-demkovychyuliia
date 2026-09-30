import { type Locator, type Page } from '@playwright/test';

import { BaseComponent } from './base/BaseComponent';

export class LoginModal extends BaseComponent {
  private readonly title: Locator;
  private readonly emailInput: Locator;
  private readonly passwordInput: Locator;
  private readonly submitButton: Locator;
  private readonly googleButton: Locator;
  private readonly facebookButton: Locator;
  private readonly forgotPasswordLink: Locator;
  private readonly validationErrors: Locator;

  constructor(page: Page) {
    super(page, page.locator('.modal-login'));

    this.title = this.root.getByRole('heading', {
      name: 'Вхід',
      exact: true,
    });

    this.emailInput = this.root.getByPlaceholder('Введіть ваш емейл');

    this.passwordInput = this.root.getByPlaceholder('Введіть ваш пароль');

    this.submitButton = this.root.getByRole('button', {
      name: 'Увійти',
      exact: true,
    });

    this.googleButton = this.root.getByRole('link', {
      name: 'Увійти через Google',
      exact: true,
    });

    this.facebookButton = this.root.getByRole('link', {
      name: 'Увійти через Facebook',
      exact: true,
    });

    this.forgotPasswordLink = this.root.getByRole('link', {
      name: 'Забули пароль?',
      exact: true,
    });

    this.validationErrors = this.root.locator(
      '.ant-form-item-explain-error',
    );
  }

  async waitForOpen(): Promise<void> {
    await this.root.waitFor({ state: 'visible' });
  }

  async getTitleText(): Promise<string> {
    return (await this.title.innerText()).trim();
  }

  async isEmailVisible(): Promise<boolean> {
    return this.emailInput.isVisible();
  }

  async isPasswordVisible(): Promise<boolean> {
    return this.passwordInput.isVisible();
  }

  async isSubmitVisible(): Promise<boolean> {
    return this.submitButton.isVisible();
  }

  async isGoogleButtonVisible(): Promise<boolean> {
    return this.googleButton.isVisible();
  }

  async isFacebookButtonVisible(): Promise<boolean> {
    return this.facebookButton.isVisible();
  }

  async isForgotPasswordVisible(): Promise<boolean> {
    return this.forgotPasswordLink.isVisible();
  }

  async submitEmptyForm(): Promise<void> {
    await this.submitButton.click();
  }

  async getValidationErrors(): Promise<string[]> {
    return this.validationErrors.allTextContents();
  }
}