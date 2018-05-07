import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { InAppBrowser } from '@ionic-native/in-app-browser';


/**
 * Generated class for the AboutPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-about',
  templateUrl: 'about.html',
})
export class AboutPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private iab: InAppBrowser) {
  }

  privacyPolicy() {
    // Uses the InAppBrowser (iab) to link the user directly to the privacy policy
    let target = "_system";
    const browser = this.iab.create("https://www.rebelthon.org/privacy-policy", target);

    browser.close();
  }

  closeModal() {
    // If the user clicks the X at the top of the screen, this pops off the modal page
    this.navCtrl.pop();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AboutPage');
  }

}
