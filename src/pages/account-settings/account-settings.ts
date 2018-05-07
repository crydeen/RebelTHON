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
    // When this page is called, a user's account object is passed to this page
    this.account = this.navParams.get('account');
    console.log(this.account);
    // Pulling active user information from the firebase auth currentUser
    this.user = firebase.auth().currentUser;
    this.name = this.account.name;
    this.team = this.account.team;
    this.userId = this.account.userId;
    this.isAdmin = this.account.isAdmin;
    this.email = this.user.email;
  }

  changeName() {
    // create a prompt to change a user's name
    let prompt = this.alertCtrl.create({
      title: 'Change Name',
      message: "Enter your full name",
      inputs: [
        {
          name: 'name',
          placeholder: 'Name',
          value: this.name
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
            // Making sure the name field isn't empty, otherwise will mess up set() for firebase
            if(data.name == undefined || data.name == "None") {
              this.name = "None";
            }
            else {
              this.name = data.name;
            }
          }
        }
      ]
    });
    prompt.present();
  }

  changeTeam() {
    // Create prompt to change team name
    let prompt = this.alertCtrl.create({
      title: 'Change Team',
      message: "Enter the Team that you are on",
      inputs: [
        {
          name: 'team',
          placeholder: 'Team Name',
          value: this.team
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
            // Handle Empty String
            if(data.team == undefined || data.team == "None") {
              this.team = "None";
            }
            else {
              this.team = data.team;
            }
          }
        }
      ]
    });
    prompt.present();
  }

  changeUserId() {
    // Create prompt to update Dancer ID
    let prompt = this.alertCtrl.create({
      title: 'Change Dancer ID',
      message: "Enter your Dancer ID from the Donor Drive Website",
      inputs: [
        {
          name: 'userId',
          placeholder: 'Dancer ID',
          value: this.userId
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
            // Handle empty string
            if(data.userId == undefined || data.userId == "None") {
              this.userId = "None";
            }
            else {
              this.userId = data.userId;
            }
          }
        }
      ]
    });
    prompt.present();
  }

  save() {
    // Once the user clicks save, update the information in the firebase using .set()
    firebase.database().ref('/users/' + this.user.uid + "/userDetails").set({
      name: this.name,
      team: this.team,
      userId: this.userId,
      isAdmin: this.isAdmin
    })
    // Produce alert letting them know of the successful creation
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
    // Call Email Composer to compose email if the user would like to become an admin
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

  updatePassword() {
    // create authenticate failure alert
    let authenticate_failure_alert = this.alertCtrl.create({
      title: 'Error',
      subTitle: "Email/Password incorrect!",
      buttons: [{
        text:'OK',
        handler: () => {

        }
    }]
    });
    // create success update alert
    let success_update_alert = this.alertCtrl.create({
      title: 'Success',
      subTitle: "Your Password has been changed!",
      buttons: [{
        text:'OK',
        handler: () => {

        }
    }]
    });
    // create failure update alert
    let failure_update_alert = this.alertCtrl.create({
      title: 'Failure',
      subTitle: "Oops, something went wrong. Your Password has not been changed!",
      buttons: [{
        text:'OK',
        handler: () => {

        }
    }]
    });
    // Create the prompt for the new password they would like
    let update_prompt = this.alertCtrl.create({
      title: 'New Password',
      message: "Enter the new password you would like to have",
      inputs: [
        {
          name: 'password',
          placeholder: 'Password',
          type: 'password'
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
          text: 'Change',
          handler: data => {
            // Called the update password method to change it
            console.log('Made it to Password Change');
            this.user.updatePassword(data.password).then(function() {
              success_update_alert.present();
            }).catch(function(error) {
              failure_update_alert.present();
            });
          }
        }
      ]
    });
    // Create the prompt requiring them to re-authenticate their account so they can update their password
    let prompt = this.alertCtrl.create({
      title: 'Update Password',
      message: "Please re-enter your email address and password",
      inputs: [
        {
          name: 'email',
          placeholder: 'Email'
        },
        {
          name: 'password',
          placeholder: 'Password',
          type: 'password'
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
          text: 'Sign in',
          handler: data => {
            console.log(data.email);
            let credentials = firebase.auth.EmailAuthProvider.credential(
              data.email,
              data.password
            );
            // Re authenticate the user
            this.user.reauthenticateWithCredential(credentials).then(function() {
              console.log("Authenticated");
              update_prompt.present();
            }).catch(function(error) {
              console.log("Error - not authenticated");
              authenticate_failure_alert.present();
            });
          }
        }
      ]
    });
    prompt.present();
  }

  closeModal() {
    // Close the page
    this.navCtrl.pop();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AccountSettingsPage');
  }

}
