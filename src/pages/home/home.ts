import { ProfilePage } from './../profile/profile';
import { Component ,ViewChild } from '@angular/core';
import { NavController,Content ,NavParams} from 'ionic-angular';
import * as firebase from 'Firebase';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
 // Declare content module on the first line of the Class block.
  
 @ViewChild(Content) content: Content;
 //variables for hold data object, chats array, room key, nickname and status for sign out.
 data = { type:'', username:'', message:'' };
 chats = [];
 roomkey:string;
 username:string;
 offStatus:boolean = false;
 
 constructor(public navCtrl: NavController,public navParams:NavParams) {
  
  this.roomkey = this.navParams.get("key") as string;
  this.username = this.navParams.get("username") as string;
  this.data.type = 'message';
  this.data.username = this.username;
 
  let joinData = firebase.database().ref('userProfiles/'+this.roomkey+'/chats').push();
  joinData.set({
    type:'join',
    user:this.username,
    message:this.username+' has joined this room.',
    sendDate:Date()
  });
  this.data.message = '';

  firebase.database().ref('userProfiles/'+this.roomkey+'/chats').on('value', resp => {
    this.chats = [];
    this.chats = snapshotToArray(resp);
    setTimeout(() => {
      if(this.offStatus === false) {
        this.content.scrollToBottom(300);
      }
    }, 1000);
  });
}
//function for sending a message that actually saves message data to Firebase database as room child.
sendMessage() {
  let newData = firebase.database().ref('userProfiles/'+this.roomkey+'/chats').push();
  newData.set({
    type:this.data.type,
    user:this.data.username,
    message:this.data.message,
    sendDate:Date()
  });
  this.data.message = '';
}
//function for exit or sign out from the current chat room. 
//This also sends the message for exit status to Firebase database.
exitChat() {
  let exitData = firebase.database().ref('userProfiles/'+this.roomkey+'/chats').push();
  exitData.set({
    type:'exit',
    user:this.username,
    message:this.username+' has exited this room.',
    sendDate:Date()
  });

  this.offStatus = true;

  this.navCtrl.setRoot(ProfilePage, {
    username:this.username
  });
}

}
// add this constant function after the Class body for converting Firebase response to an array.
export const snapshotToArray = snapshot => {
  let returnArr = [];

  snapshot.forEach(childSnapshot => {
      let item = childSnapshot.val();
      item.key = childSnapshot.key;
      returnArr.push(item);
  });

  return returnArr;
};