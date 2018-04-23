import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { LogoutPage } from '../logout/logout';
import { AboutPage } from '../about/about';
import { ModalController } from 'ionic-angular';

import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public afAuth: AngularFireAuth, public alertCtrl: AlertController, public modalCtrl: ModalController) {

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
