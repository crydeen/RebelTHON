import { Component } from '@angular/core';
import { NavController, NavParams, Platform, ViewController } from 'ionic-angular';
import { Calendar } from '@ionic-native/calendar';
import { AlertController } from 'ionic-angular';
import { EditEventPage } from '../edit-event/edit-event';
import { ModalController } from 'ionic-angular';
import * as firebase from 'firebase/app';
/**
 * Generated class for the EventModalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-event-modal',
  templateUrl: 'event-modal.html',
})
export class EventModalPage {
  event: any;
  start: any;
  creationAlert: any;
  confirmDelete: any;
  status: any;
  admin: any;
  timezone: any;
  startDate: any;
  endDate: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public platform: Platform, public viewCtrl: ViewController, private calendar: Calendar, public alertCtrl: AlertController, public modalCtrl: ModalController) {
    // Using navParams, the event object is retrieved from the previous page in order to see what event to display
    this.event = this.navParams.get('eventParam').eventParam;
    console.log(this.event);
    this.admin = this.navParams.get('admin');
    console.log(this.admin);
    this.status = this.checkCalendar();
    // Create the alert to show the user when the event has been added to their calendar
    this.creationAlert = this.alertCtrl.create({
    title: 'Event Added!',
    subTitle: 'The event has been added to your calendar!',
    buttons: [{
      text: 'OK',
      handler: () => {
        this.viewCtrl.dismiss();
      }
    }]
  });
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  addToCalendar() {
    // Creates the date objects to add the event to the user's calendar, correcting by 5 hours since we are in central time
    this.startDate = new Date(this.event.startDate);
    this.startDate.setHours(this.startDate.getHours()+5);
    this.endDate = new Date(this.event.endDate);
    this.endDate.setHours(this.endDate.getHours()+5);
    this.calendar.createEvent(this.event.title , this.event.location, this.event.notes, this.startDate, this.endDate)
    .then(function(result) {
      console.log(result);
    }, function(err) {
      console.log(err)
    });
    // Run findEvent afterwards to make sure the event made it in the calendar
    this.calendar.findEvent(this.event.title , this.event.location, this.event.notes, this.startDate, this.endDate)
    .then((result) => {
      if(result) {
        this.status = result;
      }
      console.log(result);
    });
    this.checkCalendar();
    this.creationAlert.present();

  }

  public checkCalendar() {
    // Check the user's calendar on entry to the page to see if the event is present in order to display the correct message at the bottom of the page
    this.startDate = new Date(this.event.startDate);
    this.startDate.setHours(this.startDate.getHours()+5);
    this.endDate = new Date(this.event.endDate);
    this.endDate.setHours(this.endDate.getHours()+5);
    this.calendar.findEvent(this.event.title , this.event.location, this.event.notes, this.startDate, this.endDate)
    .then((result) => {
      if(result) {
        this.status = result;
        if(Object.keys(result).length) {
          this.status = true;
        }
        else {
          this.status = false;
        }
      }
    });
    return this.status;
  }

  updateEvent(event) {
    // Create a modal page and pass in the event as a parameter to the editEventPage to make changes to the event
    console.log(event)
    let modal = this.modalCtrl.create(EditEventPage, {event:event});
    modal.present();
  }

  deleteEvent(key) {
    // This method takes the key of the event as a parameter and then uses it to locate the item in the database and delete it
    this.confirmDelete = this.alertCtrl.create({
      title: 'Confirm Deletion',
      subTitle: 'Are you sure you would like to delete this event?',
      buttons: [
        {
          text: 'Keep',
          handler: () => {

          }
        },
        {
          text: 'Delete',
          handler: () => {
            firebase.database().ref('/events/' + key).remove();
            this.viewCtrl.dismiss();
          }
        }
    ]
    });
    this.confirmDelete.present();
  }

}
