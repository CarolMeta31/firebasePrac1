import { HomePage } from './../home/home';
import { AddProfilePage } from './../add-profile/add-profile';
import { SigninPage } from './../signin/signin';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import * as firebase from 'Firebase';



@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
 

//variable to hold the profiles and reference the database
  profiles=[];
  ref = firebase.database().ref('userProfiles/');

  constructor(public navCtrl: NavController, public navParams: NavParams) {
 //Add this Firebase function to listening any value changes from Firebase Database.
 this.ref.on('value', resp => {
  this.profiles = [];
  this.profiles = snapshotToArray(resp);
});
 
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
  }
  //navigation to add profile page
 addProfile(){
   this.navCtrl.push(AddProfilePage);
 }
  
 //nav to home page or chat room 
 joinRoom(key) {
  this.navCtrl.setRoot(HomePage, {
    key:key,
    username:this.navParams.get("username")
  });
}

}
//Add this constant function below the Class block 
//for converting Firebase response to an array.

export const snapshotToArray = snapshot => {
  let returnArr = [];

  snapshot.forEach(childSnapshot => {
      let item = childSnapshot.val();
      item.key = childSnapshot.key;
      returnArr.push(item);
  });

  return returnArr;
};