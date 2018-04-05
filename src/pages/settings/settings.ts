import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';

import { AngularFireAuthModule, AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {

  constructor(public navCtrl: NavController, public afAuth: AngularFireAuth, public alertCtrl: AlertController) {

  }

  logout() {
    let logout_alert = this.alertCtrl.create({
      title: 'Success',
      subTitle: "You have been logged out!",
      buttons: [{
        text:'OK',
        handler: () => {
          this.navCtrl.setRoot(TabsPage);
        }
        }]
    });
    firebase.auth().signOut().then(function() {
      logout_alert.present();
    }, function(error) {
      console.error('Sign Out Error', error);
    });


  }

}
