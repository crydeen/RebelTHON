import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import * as firebase from 'firebase';

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

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
    firebase.initializeApp(config);
  }
}
