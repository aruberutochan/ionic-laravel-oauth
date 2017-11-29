import { Component, ViewChild } from '@angular/core';
import { Platform, NavController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TabsPage } from '../pages/tabs/tabs';
import { OAuthServiceProvider } from '../providers/o-auth-service/o-auth-service';
import { Storage } from '@ionic/storage';
import { LoginPage } from '../pages/user/login/login';
import { Events } from 'ionic-angular/util/events';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  @ViewChild('myNav') nav: NavController;
  public rootPage:any = '';

  constructor(
    platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    oAuth: OAuthServiceProvider,
    storage: Storage,
    public events: Events,

  ) {
    platform.ready().then(() => {

      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });

    storage.get('access_token').then(
      (accessToken) => {
        let res:any = {};
        if(accessToken){
          res.accessToken = accessToken;
          storage.get('refresh_token').then(
            (refreshToken) => {
              if(refreshToken){
                res.refreshToken = refreshToken;
                this.nav.setRoot(TabsPage);
                return oAuth.loginWithTokens(res.accessToken, res.refreshToken);
              } else {
                this.nav.setRoot(LoginPage);
                return res;
              }
            }
          );
        } else {
          this.nav.setRoot(LoginPage);
        }

      }
    ).catch(
      (err) => {
        console.log(err);
        this.nav.setRoot(LoginPage);
      }
    );

    this.listenToUserEvents();
  }

  listenToUserEvents() {
    this.events.subscribe('user:logout', () => {
        //this.rootPage = LoginPage;
        this.nav.setRoot(LoginPage);

    });
    this.events.subscribe('user:login', () => {
      //this.rootPage = LoginPage;
      this.nav.setRoot(TabsPage);

    });

  }
}
