// File to import all the modules used for the entire app, reference here https://ionicframework.com/docs/intro/tutorial/project-structure/

import { NgModule, ErrorHandler } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { Calendar } from '@ionic-native/calendar';
import { IonicImageLoader } from 'ionic-image-loader';
import { Clipboard } from '@ionic-native/clipboard';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { FCM } from '@ionic-native/fcm';
import { IonicStorageModule } from '@ionic/storage';
import { EmailComposer } from '@ionic-native/email-composer';

import { NotificationsPage } from '../pages/notifications/notifications';
import { PortalPage } from '../pages/portal/portal';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { SettingsPage } from '../pages/settings/settings';
import { EventModalPage } from '../pages/event-modal/event-modal';
import { LoginPage } from '../pages/login/login';
import { RegisterPage } from '../pages/register/register';
import { LogoutPage } from '../pages/logout/logout';
import { AddEventPage } from '../pages/add-event/add-event';
import { AboutPage } from '../pages/about/about';
import { AccountSettingsPage } from '../pages/account-settings/account-settings';
import { EditEventPage } from '../pages/edit-event/edit-event';

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
    AddEventPage,
    EditEventPage,
    LoginPage,
    RegisterPage,
    LogoutPage,
    AboutPage,
    AccountSettingsPage,
    TabsPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    BrowserAnimationsModule,
    IonicImageLoader.forRoot(),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    NotificationsPage,
    SettingsPage,
    PortalPage,
    HomePage,
    EventModalPage,
    AddEventPage,
    EditEventPage,
    LoginPage,
    RegisterPage,
    LogoutPage,
    AboutPage,
    AccountSettingsPage,
    TabsPage
  ],
  providers: [
    StatusBar,
    Calendar,
    SplashScreen,
    Clipboard,
    InAppBrowser,
    LocalNotifications,
    FCM,
    EmailComposer,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
