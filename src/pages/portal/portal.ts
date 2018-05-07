import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { ToastController } from 'ionic-angular';
import { Clipboard } from '@ionic-native/clipboard';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { ModalController } from 'ionic-angular';
import { LoginPage } from '../login/login'
import { AccountSettingsPage } from '../account-settings/account-settings';
import { Storage } from '@ionic/storage';

import { AngularFireDatabase } from 'angularfire2/database';
import 'rxjs/add/operator/map';
import * as firebase from 'firebase/app';

@Component({
  selector: 'page-portal',
  templateUrl: 'portal.html'
})
export class PortalPage {
  imageLoaded: any;
  imageUrl: any;
  myImage: any;
  posts: any;
  link: any;
  isLoggedIn: any;
  user: any;
  profile: any;
  dancer_id: any;
  name: any;
  team: any;
  size: any;
  queryObservable: any;
  name_test: any;
  date: any;

  constructor(public navCtrl: NavController, private http: HttpClient, private toastCtrl: ToastController, private clipboard: Clipboard, private iab: InAppBrowser, public modalCtrl: ModalController, public angfire: AngularFireDatabase, public storage: Storage) {
    this.profile = null;
    this.user = firebase.auth().currentUser;
    this.date = Date.now();
    console.log(this.date);
    console.log(this.user);
    // If the user is logged in, then pull their profile
    if (this.user) {
      console.log(this.user.uid);
      this.isLoggedIn = true;
      this.profile = angfire.list('users/' + this.user.uid).valueChanges();
      this.imageUrl = "https://bfapps1.boundlessfundraising.com/badge/cmndm/display/" + window.localStorage.getItem(this.user.uid) + "/1606";
      console.log(this.imageUrl);
    }
    // Otherwise set isLoggedIn to false so the login prompt is shown
    else {

      this.isLoggedIn = false;
    }
    this.imageLoaded = false;
    this.http.get("http://bfapps1.boundlessfundraising.com/badge/cmndm/display/324978/1606",{observe: 'response'})
    this.link = "https://events.dancemarathon.com/index.cfm?fuseaction=donorDrive.participant&participantID=324978"
  }

  markAsLoaded() {
    this.imageLoaded = true;
  }

  copy(link) {
    // Copy link to clipboard using ionic plugin and display a toast showing its been copied
    let toast = this.toastCtrl.create({
      message: 'Link Copied to Clipboard!',
      duration: 2000,
      position: 'bottom'
    });
    this.clipboard.copy(link);
    console.log(link)

    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });

    toast.present();
  }

  openWeb(link) {
    // Target the user's system browser and open the link there
    let target = "_system";
    const browser = this.iab.create(link, target);

    browser.close();
  }

  login() {
    // Push a modal of the login page
    let modal = this.modalCtrl.create(LoginPage);
    modal.present();
  }

  accountSettings(account) {
    // Push a modal of the account settings page, passing the account information as a parameter
    let modal = this.modalCtrl.create(AccountSettingsPage, {account:account});
    modal.present();
  }

}
