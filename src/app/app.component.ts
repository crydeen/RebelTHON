import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import * as firebase from 'firebase';
import { FCM } from '@ionic-native/fcm';

import { TabsPage } from '../pages/tabs/tabs';

const config = {
  apiKey: "AIzaSyCskX2Sq-uEberH6_FAtyaIvbYCUdGg-aI",
  authDomain: "rebelthon-app.firebaseapp.com",
  databaseURL: "https://rebelthon-app.firebaseio.com",
  projectId: "rebelthon-app",
  storageBucket: "rebelthon-app.appspot.com",
  messagingSenderId: "197021943634"
};

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = TabsPage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, private fcm: FCM) {
    // Register FCM listener for Push Notifications and Handle them here
    platform.ready().then(() => {
      this.fcm.subscribeToTopic('all');
      this.fcm.getToken().then(token => {
        // backend.registerToken(token);
      });
      this.fcm.onNotification().subscribe(data => {
        alert(data.test)
        if(data.wasTapped) {
          // This is how you handle them clicking on the notification from the notification bar
          console.info("Received in background");
        } else {
          // This is how you handle if they receieved the notification while already in the app
          console.info("Received in foreground");
        };
      });
      // This just subscribes to the token to make sure its still active while receiving a notification
      this.fcm.onTokenRefresh().subscribe(token => {
        // backend.registerToken(token);
      });
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
    firebase.initializeApp(config);
  }
}
