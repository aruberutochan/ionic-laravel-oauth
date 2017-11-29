import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { OAuthServiceProvider } from '../../providers/o-auth-service/o-auth-service';

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {

  constructor(
    public navCtrl: NavController,
    public oAuth: OAuthServiceProvider,

  ) {

  }

  ionViewCanEnter() {
    return this.oAuth.loggedIn;
  }

  logout() {
    this.oAuth.logout();
  }

}
