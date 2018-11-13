import { SigninPage } from './../pages/signin/signin';
import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import * as firebase from 'firebase';
 
const config = {
  apiKey: "AIzaSyC-Rx1k46tqSxAL0TVOyEMydn1NfQ69ThE",
  authDomain: "mychatpracapp.firebaseapp.com",
  databaseURL: "https://mychatpracapp.firebaseio.com",
  projectId: "mychatpracapp",
  storageBucket: "mychatpracapp.appspot.com",
  messagingSenderId: "491043623507"
};

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = SigninPage;

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

