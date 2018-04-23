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
    this.event = this.navParams.get('eventParam').eventParam;
    console.log(this.event);
    this.admin = this.navParams.get('admin');
    console.log(this.admin);
    // console.log(this.event.startDate);
    // this.dateTest = new Date(this.event.startDate);
    // console.log(this.dateTest);
    // this.utcTest = Date.UTC(this.dateTest.getFullYear(),this.dateTest.getMonth(),this.dateTest.getDay(),this.dateTest.getHours(),this.dateTest.getMinutes(),this.dateTest.getSeconds(),this.dateTest.getMilliseconds());
    // this.localString = this.dateTest.toString();
    // console.log(this.localString);
    // this.utcTest2 = Date.UTC(this.dateTest.getFullYear(),this.dateTest.getMonth(),this.dateTest.getDay(),23,this.dateTest.getMinutes(),this.dateTest.getSeconds(),this.dateTest.getMilliseconds());
    // console.log(this.dateTest.getFullYear() this.dateTest.getMonth());
    this.status = this.checkCalendar();
    // this.calendar.findEvent(this.event.title , this.event.location, this.event.notes, new Date(this.event.startDate), new Date(this.event.endDate))
    // .then((result) => {
    //   if(result) {
    //     this.status = result;
    //   }
    //   console.log(result);
    // });
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
    console.log(event)
    let modal = this.modalCtrl.create(EditEventPage, {event:event});
    modal.present();
  }

  deleteEvent(key) {
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
