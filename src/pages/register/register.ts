import { Component, trigger, state, style, transition, animate, keyframes } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import { HomePage } from '../home/home';
import { ModalController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';

import { Observable } from 'rxjs/Observable';
import { AngularFireAuthModule, AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-register',
  templateUrl: 'register.html',

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
export class RegisterPage {

  logoState: any = "in";
  cloudState: any = "in";
  loginState: any = "in";
  formState: any = "in";
  name: any;
  team: any;
  dancer_id: any;
  user: any;
  email: any;
  password: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, public afAuth: AngularFireAuth) {

  }

  closeModal() {
        this.navCtrl.pop();
  }

  help () {
    let alert = this.alertCtrl.create({
      title: 'Help',
      subTitle: "Your Team is what you signed up for when you signed up for the Dance Marathon!<br><br> Your Dancer ID can be found on your Donor Drive Page if you go here and log in!<br><br>And don't worry you can change these later if you want to leave them blank now!",
      buttons: ['OK']
    });
    alert.present();
  }

  register() {
    this.afAuth.auth.createUserWithEmailAndPassword(this.email, this.password)
      .then((user) => {
        console.log(user.email)
        this.user = firebase.auth().currentUser;
        firebase.database().ref('/users/' + this.user.uid + "/userDetails").set({
          name: this.name,
          team: this.team,
          userId: this.dancer_id
        })
        window.localStorage.setItem(this.user.uid, this.dancer_id);
        let creation_alert = this.alertCtrl.create({
          title: 'Success',
          subTitle: "Your account has been successfully created!",
          buttons: [{
            text:'OK',
            handler: () => {
              this.navCtrl.setRoot(TabsPage);
            }
          }]
        });
        creation_alert.present();
      })
      .catch((error) => {
        console.log(error)
      })
  }

}
