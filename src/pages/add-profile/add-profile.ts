import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import * as firebase from 'Firebase';


@IonicPage()
@Component({
  selector: 'page-add-profile',
  templateUrl: 'add-profile.html',
})
export class AddProfilePage {

//variable to hold the profiles and reference the database
data = { roomname:'' };
ref = firebase.database().ref('userProfiles/');

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }
//Add this function to the constructor for saving a new Room data to Firebase Database.
addRoom() {
  let newData = this.ref.push();
  newData.set({
    roomname:this.data.roomname
  });
  this.navCtrl.pop();
}
  ionViewDidLoad() {
    console.log('ionViewDidLoad AddProfilePage');
  }

}
