import { NgModule, ErrorHandler } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { Calendar } from '@ionic-native/calendar';
import { IonicImageLoader } from 'ionic-image-loader';

import { NotificationsPage } from '../pages/notifications/notifications';
import { PortalPage } from '../pages/portal/portal';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { SettingsPage } from '../pages/settings/settings'
import { EventModalPage } from '../pages/event-modal/event-modal'

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

export const firebaseConfig = {
  apiKey: "AIzaSyCskX2Sq-uEberH6_FAtyaIvbYCUdGg-aI",
  authDomain: "rebelthon-app.firebaseapp.com",
  databaseURL: "https://rebelthon-app.firebaseio.com",
  projectId: "rebelthon-app",
  storageBucket: "rebelthon-app.appspot.com",
  messagingSenderId: "197021943634"
};

@NgModule({
  declarations: [
    MyApp,
    NotificationsPage,
    SettingsPage,
    PortalPage,
    HomePage,
    EventModalPage,
    TabsPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    IonicImageLoader.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    NotificationsPage,
    SettingsPage,
    PortalPage,
    HomePage,
    EventModalPage,
    TabsPage
  ],
  providers: [
    StatusBar,
    Calendar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
