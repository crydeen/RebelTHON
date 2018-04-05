import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { catchError, retry, tap } from 'rxjs/operators';
import { ToastController } from 'ionic-angular';
import { Clipboard } from '@ionic-native/clipboard';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { ModalController } from 'ionic-angular';
import { LoginPage } from '../login/login'
import { Storage } from '@ionic/storage';

import { AngularFireDatabase } from 'angularfire2/database';
import 'rxjs/add/operator/map';
import * as firebase from 'firebase/app';

@Component({
  selector: 'page-portal',
  templateUrl: 'portal.html'
})
export class PortalPage {
  imageLoaded: any;
  imageUrl: any;
  myImage: any;
  posts: any;
  link: any;
  isLoggedIn: any;
  user: any;
  profile: any;
  dancer_id: any;
  name: any;
  team: any;
  size: any;
  queryObservable: any;
  name_test: any;
  date: any;

  constructor(public navCtrl: NavController, private http: HttpClient, private toastCtrl: ToastController, private clipboard: Clipboard, private iab: InAppBrowser, public modalCtrl: ModalController, public angfire: AngularFireDatabase, public storage: Storage) {
    this.profile = null;
    this.user = firebase.auth().currentUser;
    this.date = Date.now();
    console.log(this.date);
    console.log(this.user);
    if (this.user) {
      console.log(this.user.uid);
      this.isLoggedIn = true;
      // firebase.database().ref("/users/" + this.user.uid).on("child_added", function(snapshot) {
      //   if(snapshot.key == "dancer_id") {
      //     this.dancer_id=snapshot.val();
      //   }
      //   else if(snapshot.key == "name") {
      //     this.name=snapshot.val();
      //   }
      //   else if(snapshot.key == "team") {
      //     this.team=snapshot.val();
      //   }
      //   });
      this.profile = angfire.list('users/' + this.user.uid).valueChanges();
      this.imageUrl = "http://bfapps1.boundlessfundraising.com/badge/cmndm/display/" + window.localStorage.getItem(this.user.uid) + "/1606";
      console.log(this.imageUrl);
      // this.size = new Subject<string>();
      // this.queryObservable = size.switchMap(size =>
      //   db.list('/users', ref => ref.orderByChild('key').equalTo(this.user.uid)).valueChanges()
      // );
    }
    else {
      this.isLoggedIn = false;
    }
    this.imageLoaded = false;
    this.http.get("http://bfapps1.boundlessfundraising.com/badge/cmndm/display/324978/1606",{observe: 'response'})
    this.link = "https://events.dancemarathon.com/index.cfm?fuseaction=donorDrive.participant&participantID=324978"
  }

  markAsLoaded() {
    this.imageLoaded = true;
  }

  doRefresh(refresher) {
    console.log('Begin async operation', refresher);

    setTimeout(() => {
      location.reload();
      console.log('Async operation has ended');
      refresher.complete();
    }, 2000);
  }

  copy(link) {
    let toast = this.toastCtrl.create({
      message: 'Link Copied to Clipboard!',
      duration: 2000,
      position: 'bottom'
    });
    this.clipboard.copy(link);
    console.log(link)

    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });

    toast.present();
  }

  openWeb(link) {
    let target = "_system";
    const browser = this.iab.create(link, target);

    browser.close();
  }

  login() {
    let modal = this.modalCtrl.create(LoginPage);
    modal.present();
  }



}
