import { ProfilePage } from './../profile/profile';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';



@IonicPage()
@Component({
  selector: 'page-signin',
  templateUrl: 'signin.html',
})
export class SigninPage {

    //variable that holds sign in data
    data={username:""}

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SigninPage');
  }
//method 
enterName(){
  this,this.navCtrl.setRoot(ProfilePage,{
    username:this.data.username
  });
}
}
