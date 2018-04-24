import { Component, trigger, state, style, transition, animate, keyframes } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import { RegisterPage } from '../register/register';
import { ModalController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';

import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

/**
 * Generated class for the SigninPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',

  animations: [

    //For the logo
    trigger('flyInBottomSlow', [
      state('in', style({
        transform: 'translate3d(0,0,0)'
      })),
      transition('void => *', [
        style({transform: 'translate3d(0,2000px,0'}),
        animate('2000ms ease-in-out')
      ])
    ]),

    //For the background detail
    trigger('flyInBottomFast', [
      state('in', style({
        transform: 'translate3d(0,0,0)'
      })),
      transition('void => *', [
        style({transform: 'translate3d(0,2000px,0)'}),
        animate('1000ms ease-in-out')
      ])
    ]),

    //For the login form
    trigger('bounceInBottom', [
      state('in', style({
        transform: 'translate3d(0,0,0)'
      })),
      transition('void => *', [
        animate('2000ms 200ms ease-in', keyframes([
          style({transform: 'translate3d(0,2000px,0)', offset: 0}),
          style({transform: 'translate3d(0,-20px,0)', offset: 0.9}),
          style({transform: 'translate3d(0,0,0)', offset: 1})
        ]))
      ])
    ]),

    //For login button
    trigger('fadeIn', [
      state('in', style({
        opacity: 1
      })),
      transition('void => *', [
        style({opacity: 0}),
        animate('1000ms 2000ms ease-in')
      ])
    ])
  ]
})
export class LoginPage {

  logoState: any = "in";
  cloudState: any = "in";
  loginState: any = "in";
  formState: any = "in";
  user: any;
  email: any;
  password: any;
  isLoggedIn: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public afAuth: AngularFireAuth, public modalCtrl: ModalController, public alertCtrl: AlertController) {
    this.user = firebase.auth().currentUser;
    if (this.user) {
      console.log(this.user.uid);
      this.isLoggedIn = true;
    }
    else {
      this.isLoggedIn = false;
    }
  }

  login() {
    this.afAuth.auth.signInWithEmailAndPassword(this.email, this.password)
      .then((user) => {
        console.log(user.email);
        let login_alert = this.alertCtrl.create({
          title: 'Success',
          subTitle: "You have been logged in!",
          buttons: [{
            text:'OK',
            handler: () => {
              this.navCtrl.setRoot(TabsPage);
            }
        }]
        });
        login_alert.present();
      })
      .catch((error) => {
        console.log(error)
        let failure_alert = this.alertCtrl.create({
          title: 'Error',
          subTitle: "Email/Password Incorrect",
          buttons: [{
            text:'OK',
            handler: () => {
              // this.navCtrl.setRoot(TabsPage);
            }
        }]
        });
        failure_alert.present();
      })
  }

  register() {
    let modal = this.modalCtrl.create(RegisterPage);
    modal.present();
  }

  forgot() {
    let reset_alert = this.alertCtrl.create({
      title: 'Success',
      subTitle: "Your password reset has been sent to your email",
      buttons: [{
        text:'OK',
        handler: () => {

        }
    }]
    });
    let failure_alert = this.alertCtrl.create({
      title: 'Error',
      subTitle: "Email not found!",
      buttons: [{
        text:'OK',
        handler: () => {

        }
    }]
    });
    let prompt = this.alertCtrl.create({
      title: 'Reset Password',
      message: "Enter your email address",
      inputs: [
        {
          name: 'email',
          placeholder: 'Email'
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
          text: 'Send Reset',
          handler: data => {
            console.log(data.email);
            firebase.auth().sendPasswordResetEmail(data.email)
              .then(function() {
                reset_alert.present();
              })
              .catch(function(error) {
                failure_alert.present();
              });
          }
        }
      ]
    });
    prompt.present();
  }

  closeModal() {
        this.navCtrl.pop();
  }

}
