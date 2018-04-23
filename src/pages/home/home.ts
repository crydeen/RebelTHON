import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ModalController } from 'ionic-angular';
import { EventModalPage } from '../event-modal/event-modal';
import { AddEventPage } from '../add-event/add-event';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import * as firebase from 'firebase/app';
import { AlertController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  events: Observable<any[]>;
  date: any;
  user: any;
  // admin: any;

  constructor(public navCtrl: NavController, public angfire: AngularFireDatabase, public modalCtrl: ModalController, public alertCtrl: AlertController) {
    // this.events = angfire.list('events').valueChanges();
    this.events = this.angfire.list('/events', ref => ref.orderByChild('startDate').limitToLast(15)).valueChanges();
    this.date = new Date().toISOString();
    // let admin = null;
  }

  openModal(eventParam) {
    // let modal = this.modalCtrl.create(EventModalPage, eventParam);
    let local_modal = this.modalCtrl;
    this.user = firebase.auth().currentUser;
    var admin;
    if (this.user) {
      var ref = firebase.database().ref("users/"+this.user.uid);
      ref.once("value")
        .then(function(snapshot) {
          if(snapshot.child("userDetails/isAdmin").val()) {
            admin = true;
            console.log("true at snapshot");
            console.log(admin);
            console.log(eventParam);
            let data =  {eventParam:eventParam, admin:admin};
            let modal = local_modal.create(EventModalPage, data);
            modal.present();
          }
          else {
            admin = false;
            console.log("false at snapshot");
            console.log(admin);
            let data =  {eventParam:eventParam, admin:admin};
            let modal = local_modal.create(EventModalPage, data);
            modal.present();
          }
        });
    }
    else {
      admin = false
      console.log("False bc no user");
      console.log(admin);
      let data =  {eventParam:eventParam, admin:admin};
      let modal = local_modal.create(EventModalPage, data);
      modal.present();
    }

  }

  addEvent() {
    let modal = this.modalCtrl.create(AddEventPage);
    let admin_alert = this.alertCtrl.create({
      title: 'Admin',
      subTitle: "It seems you aren't an admin so you can't add events!",
      buttons: ['OK']
    });
    this.user = firebase.auth().currentUser;
    if (this.user) {
      var ref = firebase.database().ref("users/"+this.user.uid);
      ref.once("value")
        .then(function(snapshot) {
          if(snapshot.child("userDetails/isAdmin").val()) {
            modal.present();
          }
          else {
            admin_alert.present();
          }
        });

    }
    else {
      let login_alert = this.alertCtrl.create({
        title: 'Login',
        subTitle: "Admin Login required in order to add events!",
        buttons: ['OK']
      });
      login_alert.present();
    }
  }
}
