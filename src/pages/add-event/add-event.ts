import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import * as firebase from 'firebase/app';

/**
 * Generated class for the AddEventPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-add-event',
  templateUrl: 'add-event.html',
})
export class AddEventPage {
  title: any;
  location: any;
  incrementDate: any;
  startDate: any;
  endDate: any;
  notes: any;
  testDate: any;
  key: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.incrementDate = new Date();
    this.incrementDate.setHours(this.incrementDate.getHours()+1);
    this.startDate = new Date().toISOString();
    this.endDate= this.incrementDate.toISOString();
    console.log(this.startDate);
    this.testDate = new Date(this.startDate);
    this.testDate.setHours(this.testDate.getHours()+1);
    console.log(this.testDate);
    this.testDate = this.testDate.toISOString();
    console.log(this.testDate);
  }

  closeModal() {
    this.navCtrl.pop();
  }

  addEvent() {
    console.log(this.notes)
    if(this.notes === undefined) {
      this.notes = "None";
      firebase.database().ref('/events/').push({
        title: this.title,
        location: this.location,
        startDate: this.startDate,
        endDate: this.endDate,
        notes: this.notes
      })
      .then((snap) => {
        let key = snap.key;
        firebase.database().ref('/events/' + key).set({
          title: this.title,
          location: this.location,
          startDate: this.startDate,
          endDate: this.endDate,
          notes: this.notes,
          key: key
        })
      })
      this.navCtrl.pop();
    }
    else {
      firebase.database().ref('/events/').push({
        title: this.title,
        location: this.location,
        startDate: this.startDate,
        endDate: this.endDate,
        notes: this.notes
      })
      .then((snap) => {
        let key = snap.key;
        firebase.database().ref('/events/' + key).set({
          title: this.title,
          location: this.location,
          startDate: this.startDate,
          endDate: this.endDate,
          notes: this.notes,
          key: key
        })
      })

      this.navCtrl.pop();
    }
  }

  updateEndDate() {
    // this.endDate = this.startDate;
    this.testDate = new Date(this.startDate);
    this.testDate.setHours(this.testDate.getHours()+1);
    console.log(this.testDate);
    this.endDate = this.testDate.toISOString();
    console.log(this.testDate);
  }

  updateStartDate() {
    if(this.startDate > this.endDate) {
      this.testDate = new Date(this.endDate);
      this.testDate.setHours(this.testDate.getHours()-1);
      console.log(this.testDate);
      this.startDate = this.testDate.toISOString();
      console.log(this.testDate);
    }

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddEventPage');
  }

}
