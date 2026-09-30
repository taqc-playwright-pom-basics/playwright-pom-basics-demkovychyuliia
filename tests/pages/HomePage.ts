import { type Locator, type Page } from '@playwright/test';

import { SearchablePage } from './base/SearchablePage';

export class HomePage extends SearchablePage {
  private readonly addClubButton: Locator;

  constructor(page: Page) {
    super(page);

    this.addClubButton = page.getByRole('button', {
      name: 'Додати гурток',
      exact: true,
    });
  }

  async openProfileMenu(): Promise<void> {
    await this.header.openProfileMenu();
  }

  async clickLogin(): Promise<void> {
    await this.header.clickLogin();
  }

  async clickRegister(): Promise<void> {
    await this.header.clickRegister();
  }

  getLoginMenuItem(): Locator {
    return this.header.getLoginMenuItem();
  }

  getRegisterMenuItem(): Locator {
    return this.header.getRegisterMenuItem();
  }

  async clickAddClub(): Promise<void> {
    await this.addClubButton.click();
  }

  async isAddClubButtonVisible(): Promise<boolean> {
    return this.addClubButton.isVisible();
  }
}