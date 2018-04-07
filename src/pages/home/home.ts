
import { Component } from '@angular/core';
import { NavController, ModalController, AlertController, LoadingController } from 'ionic-angular';

import { LoginPage } from './../login/login';
import { AuthProvider } from './../../providers/auth/auth';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  loading: any;

  constructor(
    public navCtrl: NavController,
    public authService: AuthProvider,
    public modalCtrl: ModalController,
    public alertCtrl: AlertController, 
    public loadingCtrl: LoadingController
  ) {

  }

  ionViewDidLoad(){
 

 
  }
 
 

  showLoader(){
 
    this.loading = this.loadingCtrl.create({
      content: 'Authenticating...'
    });
 
    this.loading.present();
 
  }
 
  logout(){
 
    this.authService.logout();
    this.navCtrl.setRoot(LoginPage);
 
  }
 
}


