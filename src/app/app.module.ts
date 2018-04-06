import { NgModule, ErrorHandler } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule, AngularFireAuth } from 'angularfire2/auth';
import { Calendar } from '@ionic-native/calendar';
import { IonicImageLoader } from 'ionic-image-loader';
import { Clipboard } from '@ionic-native/clipboard';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { IonicStorageModule } from '@ionic/storage';

import { NotificationsPage } from '../pages/notifications/notifications';
import { PortalPage } from '../pages/portal/portal';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { SettingsPage } from '../pages/settings/settings';
import { EventModalPage } from '../pages/event-modal/event-modal';
import { LoginPage } from '../pages/login/login';
import { RegisterPage } from '../pages/register/register';
import { LogoutPage } from '../pages/logout/logout';

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
    LoginPage,
    RegisterPage,
    LogoutPage,
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
    LoginPage,
    RegisterPage,
    LogoutPage,
    TabsPage
  ],
  providers: [
    StatusBar,
    Calendar,
    SplashScreen,
    Clipboard,
    InAppBrowser,
    LocalNotifications,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
