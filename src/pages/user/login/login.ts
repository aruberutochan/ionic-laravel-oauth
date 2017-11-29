import { RegisterPage } from '../register/register';

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { NgForm } from '@angular/forms';
import { Events } from 'ionic-angular';
import { TabsPage } from '../../tabs/tabs';
import { LoadingController } from 'ionic-angular';
import { OAuthServiceProvider } from './../../../providers/o-auth-service/o-auth-service';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  submitted = false;
  login: any = {username: '', password: ''};
  loading: any = {};

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public oAuth: OAuthServiceProvider,
    public events: Events,
    public loadingCtrl: LoadingController,
  ) {
    this.listenToUserEvents();
  }

  listenToUserEvents() {
    this.events.subscribe('user:login', () => {
        this.navCtrl.setRoot(TabsPage);
        this.loading.dismiss();
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }
  onLogin(form: NgForm) {
    this.loading = this.loadingCtrl.create({
      spinner: 'crescent',
      content: 'Loading Please Wait...'
    });

    this.loading.present();
    setTimeout(() => {
      this.loading.dismiss();
    }, 5000);
    this.submitted = true;
    if (form.valid) {
      this.login.username = form.value.username;
      this.login.password = form.value.password;
      this.oAuth.initOAuthService(form.value.username, form.value.password);
    }
  }

  onSingUpNow() {
    console.log('onsignup');
    this.navCtrl.push(RegisterPage);
  }

}
