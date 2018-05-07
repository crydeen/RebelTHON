import { Component } from '@angular/core';

import { NotificationsPage } from '../notifications/notifications';
import { PortalPage } from '../portal/portal';
import { HomePage } from '../home/home';
import { SettingsPage } from '../settings/settings'

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  //Declare roots to all the correct pages

  tab1Root = HomePage;
  tab2Root = NotificationsPage;
  tab3Root = PortalPage;
  tab4Root = SettingsPage;

  constructor() {

  }
}
