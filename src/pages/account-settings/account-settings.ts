import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';

import { EmailComposer } from '@ionic-native/email-composer';
import { AngularFireDatabase } from 'angularfire2/database';
import 'rxjs/add/operator/map';
import * as firebase from 'firebase/app';


/**
 * Generated class for the AccountSettingsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-account-settings',
  templateUrl: 'account-settings.html',
})
export class AccountSettingsPage {
  user: any;
  profile: any;
  account: any;
  name: any;
  team: any;
  isAdmin: any;
  userId: any;
  email: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public angfire: AngularFireDatabase, public alertCtrl: AlertController, private emailComposer: EmailComposer) {
    this.account = this.navParams.get('account');
    console.log(this.account);
    this.user = firebase.auth().currentUser;
    this.name = this.account.name;
    this.team = this.account.team;
    this.userId = this.account.userId;
    this.isAdmin = this.account.isAdmin;
    this.email = this.user.email;
  }

  changeName() {
    let prompt = this.alertCtrl.create({
      title: 'Change Name',
      message: "Enter your full name",
      inputs: [
        {
          name: 'name',
          placeholder: 'Name'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Save',
          handler: data => {
            this.name = data.name;
          }
        }
      ]
    });
    prompt.present();
  }

  changeTeam() {
    let prompt = this.alertCtrl.create({
      title: 'Change Team',
      message: "Enter the Team that you are on",
      inputs: [
        {
          name: 'team',
          placeholder: 'Team Name'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Save',
          handler: data => {
            this.team = data.team;
          }
        }
      ]
    });
    prompt.present();
  }

  changeUserId() {
    let prompt = this.alertCtrl.create({
      title: 'Change Dancer ID',
      message: "Enter your Dancer ID from the Donor Drive Website",
      inputs: [
        {
          name: 'userId',
          placeholder: 'Dancer ID'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Save',
          handler: data => {
            this.userId = data.userId;
          }
        }
      ]
    });
    prompt.present();
  }

  save() {
    firebase.database().ref('/users/' + this.user.uid + "/userDetails").set({
      name: this.name,
      team: this.team,
      userId: this.userId,
      isAdmin: this.isAdmin
    })
    window.localStorage.setItem(this.user.uid, this.userId);
    let save_alert = this.alertCtrl.create({
      title: 'Success',
      subTitle: "Your changes have been successfully saved!",
      buttons: [{
        text:'OK',
        handler: () => {
          this.navCtrl.pop();
        }
      }]
    });
    save_alert.present();
  }

  requestAdmin() {
    this.emailComposer.isAvailable().then((available: boolean) =>{
      if(available) {
        // let admin_alert = this.alertCtrl.create({
        //   title: 'Request Sent',
        //   subTitle: "Your request to be an Admin has been sent and will be reviewed by the RebelTHON Director of Technology",
        //   buttons: [{
        //     text:'OK',
        //     handler: () => {
        //
        //     }
        //   }]
        // });
        // admin_alert.present();
      }
    });
    let email = {
      to: 'rebelthontech@gmail.com',
      subject: 'Admin Request',
      body: 'Hello!<br><br> My name is ' + String(this.name) + " and I would like to become an admin because of [Insert Reason]. My User ID in the database is " + String(this.user.uid) + ".<br><br>Thanks!",
      isHtml: true
    };
    this.emailComposer.open(email);
  }

  closeModal() {
    this.navCtrl.pop();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AccountSettingsPage');
  }

}
