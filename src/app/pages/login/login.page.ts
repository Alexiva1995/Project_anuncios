import { Component, OnInit } from '@angular/core';
import { ambiente } from 'src/app/app.module';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { UtilitiesService } from 'src/app/services/utilities/utilities.service';
import { CONSTANTES } from 'src/app/services/constantes';
import { AuthService } from '../../services/login/auth.service';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user/user.service';
/* import * as firebase from 'firebase';
 import { AngularFireAuth } from '@angular/fire/auth';   
 import { GooglePlus } from '@ionic-native/google-plus/ngx'; */
import { NotificationsService } from 'src/app/notifications.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  public formGroup: FormGroup;
  ambiente = ambiente;
  formGroup_: any;
  step: string = 'login';
  constructor(
    private service: AuthService,
    private fb: FormBuilder,
    private utilities: UtilitiesService,
    private navCtrl: NavController,
    private router: Router,
    public userS: UserService,
    private serviceNotification: NotificationsService,
   /*  private afAuth: AngularFireAuth,   
     private googlePlus: GooglePlus  */
  ) {
    this.formGroup = this.fb.group({
      email: ['', Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(8)])],
      remember_me: [true]
    });
  }
  update(){
   let email;
   email =  this.formGroup.get("email").value;
   email = email.toLocaleLowerCase();
   this.formGroup.controls['email'].setValue(email);
  }

  ngOnInit() {
  }

  async iniciarSesion() {
    await this.utilities.displayLoading();
    let data = this.formGroup.value;
    // this.service.loginp(data);
    try {
      // Iniciamos la consulta
      this.service.login(data).then((res: any) => {
        //Almacenamos en local storage el nombre del usuario
        console.log(res)
        localStorage.setItem(CONSTANTES.LOCAL_STORAGE.token, res.access_token);
        localStorage.setItem(CONSTANTES.LOCAL_STORAGE.fotoPerfil, res.fotoPerfilURL);
        localStorage.setItem(CONSTANTES.LOCAL_STORAGE.ayuda, 'true');
        this.utilities.dismissLoading();
        this.getUser();
      }, e => {
        //En caso de error
        this.utilities.dismissLoading();
        console.log(e);
        
        this.utilities.displayToastButtonTime(e.error.message ? e.error.message : CONSTANTES.MESSAGES.error);
        console.error(e);
      })

    }
    catch (e) {
      this.utilities.dismissLoading();
      this.utilities.displayToastButtonTime(e.error.message ? e.error.message : CONSTANTES.MESSAGES.error);
      console.error(e);
    }

  }

     /* async iniciarSesionGoogle() {
     const res = await this.googlePlus.login({
      'webClientId': '332692881398-t6ujib02qeqvb81q4gn10l1t382sa09c.apps.googleusercontent.com',
      'offline': true
    });
    const resConfirmed = await this.afAuth.signInWithCredential(firebase.auth.GoogleAuthProvider.credential(res.idToken));
    const user = resConfirmed.user;
      this.service.loginp(user).then((res: any) => {
       
        console.log(res)
        localStorage.setItem(CONSTANTES.LOCAL_STORAGE.token, res.access_token);
        localStorage.setItem(CONSTANTES.LOCAL_STORAGE.fotoPerfil, user.photoURL);
        localStorage.setItem(CONSTANTES.LOCAL_STORAGE.ayuda, 'true');
     
        this.getUser();
      }, e => {
        console.log(e);
        
        this.utilities.displayToastButtonTime(e.error.message ? e.error.message : CONSTANTES.MESSAGES.error);
        console.error(e);
      })
  }   */


  goTo(url) {
    this.navCtrl.navigateForward(url)
  }
  async getUser(){
    
    await this.userS.getUser().then(async (res)=>{
      let data = JSON.parse(JSON.stringify(res));
      //this.serviceNotification.getToken();
      console.log("getUser",data);
      localStorage.setItem(CONSTANTES.LOCAL_STORAGE.usuario, data.id);
      localStorage.setItem(CONSTANTES.LOCAL_STORAGE.nombreUsuario, data.name);
      this.navCtrl.navigateRoot('/home/libros');
    },(err)=>{
      
      this.utilities.displayToastButtonTime(err.error.message ? err.error.message : CONSTANTES.MESSAGES.error);
      console.log("getError", err );
    })
  }

 async doRecovery(){/* Funcion para recuperar contrase;a */
  await this.utilities.displayLoading();
  let data = this.formGroup_.value;
  try {
    // Iniciamos la consulta
    this.service.recovery(data).then((res: any) => {
      this.utilities.dismissLoading();
      this.utilities.displayToastButtonTime(res.msj);
    }, e => {
      //En caso de error
      this.utilities.dismissLoading();
      this.utilities.displayToastButtonTime(e.error.message ? e.error.message : CONSTANTES.MESSAGES.error);
      console.error(e);
    })

  }
  catch (e) {
    this.utilities.dismissLoading();
    this.utilities.displayToastButtonTime(e.error.message ? e.error.message : CONSTANTES.MESSAGES.error);
    console.error(e);
  }

  }

  get errorControl() {
    return this.formGroup.controls;
  }
  get errorControl_(){
    return this.formGroup_.controls;
  }
}
