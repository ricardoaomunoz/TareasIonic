import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AuthenticationProvider } from '../../providers/authentication/authentication';
import { HomePage } from '../home/home';



@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  usuario={
    email: '',
    password: ''
  }

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private auth: AuthenticationProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }
  login(){
    if(this.usuario.email && this.usuario.password)
    {
      this.auth.login(this.usuario).subscribe(
        (dato: any) => {
          console.log(dato.jwt);
          localStorage.setItem('jwt', dato.jwt);
          this.navCtrl.setRoot(HomePage);
          
        }
      );

    }

  }

}
