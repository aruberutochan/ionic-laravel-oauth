import { AruValidators } from './../../../helpers/validators/aru-validators';
import { LoginPage } from '../login/login';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { NgForm } from '@angular/forms';
import { Events } from 'ionic-angular';
import { TabsPage } from '../../tabs/tabs';
import { LoadingController } from 'ionic-angular';
import { OAuthServiceProvider } from '../../../providers/o-auth-service/o-auth-service';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';


/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
  submitAttempt = false;
  fields: any = {username: '', email: '', password: '', passwordConfirmation: ''};
  loading: any = {};
  public registerForm : FormGroup;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public oAuth: OAuthServiceProvider,
    public events: Events,
    public loadingCtrl: LoadingController,
    private formBuilder: FormBuilder,

  ) {

    this.listenToUserEvents();
    this.registerForm = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', Validators.required ],
      password: ['', Validators.compose(
        [
          Validators.required,
          AruValidators.fieldMatchCompared('passwordConfirmation')
        ]
      )],
      passwordConfirmation: ['', Validators.compose(
        [
          Validators.required,
          AruValidators.fieldMatchCompared('password')
        ]
      )]

    });
  }

  listenToUserEvents() {
    this.events.subscribe('user:login', () => {
        this.navCtrl.setRoot(TabsPage);
        this.loading.dismiss();
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  onSubmit(form: NgForm) {
    this.loading = this.loadingCtrl.create({
      spinner: 'crescent',
      content: 'Loading Please Wait...'
    });

    this.loading.present();
    setTimeout(() => {
      this.loading.dismiss();
    }, 5000);
    this.submitAttempt = true;
    if (!this.registerForm.valid) {
      return;
    } else {
      console.log(this.registerForm.value);
    }
  }

  onSingUpNow() {
    console.log('onsignup');
    this.navCtrl.push(RegisterPage);
  }

}
