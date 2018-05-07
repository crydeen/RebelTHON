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
  timezone: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    // Set initial times
    this.incrementDate = new Date();
    this.timezone = new Date();
    // Correct for 5 hour difference since Central Time
    this.timezone.setHours(this.timezone.getHours()-5);
    // Error checking to keep the endDate always after the startDate
    this.incrementDate.setHours(this.timezone.getHours()+1);
    // ISO String is the standard used for Ionic DateTime picker. Reference: https://ionicframework.com/docs/api/components/datetime/DateTime/
    this.startDate = this.timezone.toISOString();
    console.log(this.timezone);
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

  // Add Event to the database, adding the event then taking a snapshot in order to pull the key out and store it in the database in order to
  // reference the correct place in the JSON object
  addEvent() {
    console.log(this.notes)
    if(this.notes === undefined) {
      // Notes can be left blank but firebase database doesn't allow storing of empty strings, so "None" is placed in there.
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
    // method called on change so that the endDate isn't ever allowed to come before startDate
    // this.endDate = this.startDate;
    this.testDate = new Date(this.startDate);
    this.testDate.setHours(this.testDate.getHours()+1);
    console.log(this.testDate);
    this.endDate = this.testDate.toISOString();
    console.log(this.testDate);
  }

  updateStartDate() {
    // method called on change so when the endDate is changed, the startDate won't ever be after the endDate
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
