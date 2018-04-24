import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { LogoutPage } from '../logout/logout';
import { AboutPage } from '../about/about';
import { AccountSettingsPage } from '../account-settings/account-settings';
import { ModalController } from 'ionic-angular';

import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import 'rxjs/add/operator/map';
import * as firebase from 'firebase/app';


@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {
  user: any;
  isLoggedIn: any;
  profile: any;
  account: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public afAuth: AngularFireAuth, public alertCtrl: AlertController, public modalCtrl: ModalController, public angfire: AngularFireDatabase) {
    this.user = firebase.auth().currentUser;
    if (this.user) {
      console.log(this.user.uid);
      this.isLoggedIn = true;
      this.profile = angfire.list('users/' + this.user.uid).valueChanges();
    }
    else {
      this.isLoggedIn = false;
    }
  }

  accountSettings(account) {
    let modal = this.modalCtrl.create(AccountSettingsPage, {account:account});
    modal.present();
  }

  logout() {
    let modal = this.modalCtrl.create(LogoutPage);
    modal.present();

  }
  about() {
    let modal = this.modalCtrl.create(AboutPage);
    modal.present();
  }

}
