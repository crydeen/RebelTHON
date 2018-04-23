import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LocalNotifications } from '@ionic-native/local-notifications';

@Component({
  selector: 'page-notifications',
  templateUrl: 'notifications.html'
})
export class NotificationsPage {

  constructor(public navCtrl: NavController, private localNotifications: LocalNotifications) {

  }
  schedule() {
    this.localNotifications.schedule({
    id: 1,
    text: 'Disney Hour',
    at: new Date(new Date().getTime() + 5 * 1000), //Put time you want in to here
    icon: 'assets/imgs/logo.png'
  });
  }



}
