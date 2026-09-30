import { type Locator, type Page } from '@playwright/test';

import { BaseComponent } from '../../pages/base/BaseComponent';

import { CityDropdown } from '../dropdowns/CityDropdown';

import { TopMenu, type TopMenuItem } from './TopMenu';

export class Header extends BaseComponent {
  private readonly logoLink: Locator;
  private readonly topMenu: TopMenu;
  private readonly cityDropdown: CityDropdown;
  private readonly userProfile: Locator;

  constructor(page: Page) {
    super(page, page.locator('header.ant-layout-header'));

    this.logoLink = page.locator('header .left-side-menu a').first();
    this.topMenu = new TopMenu(page);
    this.cityDropdown = new CityDropdown(page);
    this.userProfile = page.locator('.user-profile');
  }

  async clickLogo(): Promise<void> {
    await this.logoLink.click();
  }

  async navigateViaTopMenu(item: TopMenuItem): Promise<void> {
    await this.topMenu.navigateTo(item);
  }

  async selectCity(cityName: string): Promise<void> {
    await this.cityDropdown.selectCity(cityName);
  }

  async openProfileMenu(): Promise<void> {
    await this.userProfile.click();

    await this.getLoginMenuItem().waitFor({ state: 'visible' });
    await this.getRegisterMenuItem().waitFor({ state: 'visible' });
  }

  async clickLogin(): Promise<void> {
    await this.getLoginMenuItem().click();
  }

  async clickRegister(): Promise<void> {
    await this.getRegisterMenuItem().click();
  }

  getLoginMenuItem(): Locator {
    return this.page.getByRole('menuitem', {
      name: 'Увійти',
      exact: true,
    });
  }

  getRegisterMenuItem(): Locator {
    return this.page.getByRole('menuitem', {
      name: 'Зареєструватися',
      exact: true,
    });
  }

  getCityDropdown(): CityDropdown {
    return this.cityDropdown;
  }
}