import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import * as firebase from 'firebase/app';

/**
 * Generated class for the EditEventPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-edit-event',
  templateUrl: 'edit-event.html',
})
export class EditEventPage {
  title: any;
  location: any;
  incrementDate: any;
  startDate: any;
  endDate: any;
  notes: any;
  testDate: any;
  key: any;
  event: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    // Exact same set up as addEventPage, reference that for variable purposes
    this.event = this.navParams.get('event');
    console.log(this.event);
    this.title = this.event.title;
    this.location = this.event.location;
    this.startDate = this.event.startDate;
    console.log(this.startDate);
    this.incrementDate = new Date(this.startDate);
    this.incrementDate.setHours(this.incrementDate.getHours()+1);
    this.endDate= this.event.endDate;
    this.testDate = new Date(this.startDate);
    this.testDate.setHours(this.testDate.getHours()+1);
    this.testDate = this.testDate.toISOString();
    this.notes = this.event.notes;
    this.key = this.event.key;
    console.log(this.key);
  }

  closeModal() {
    this.navCtrl.pop();
  }

  updateEvent() {
    if(this.notes === undefined) {
      this.notes = "None";
      firebase.database().ref('/events/' + this.key).set({
        title: this.title,
        location: this.location,
        startDate: this.startDate,
        endDate: this.endDate,
        notes: this.notes,
        key: this.key
      })
    }
    else {
      firebase.database().ref('/events/' + this.key).set({
        title: this.title,
        location: this.location,
        startDate: this.startDate,
        endDate: this.endDate,
        notes: this.notes,
        key: this.key
      })
    }
    this.navCtrl.pop();
    this.navCtrl.pop();
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
    console.log('ionViewDidLoad EditEventPage');
  }

}
