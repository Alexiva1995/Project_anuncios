import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { UtilitiesService } from 'src/app/services/utilities/utilities.service';
import { CONSTANTES } from 'src/app/services/constantes';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  public formGroup: FormGroup;
  public formGroup_: FormGroup;
  public type: string = 'password';
  constructor(
    private service: AuthService,
    private fb: FormBuilder,
    private utilities: UtilitiesService,
    private navCtrl: NavController,
    private router: Router,
    public auth: AuthService,
  ) {
    this.formGroup = this.fb.group({
      email: ['', Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
      remember_me: [true]
    });
  }


  ngOnInit() {
  }

  async signIn() {
    await this.utilities.displayLoading();
    let data = this.formGroup.value;

    //Validamos el formulario
    if(!this.formGroup.controls.email.valid || !this.formGroup.controls.password.valid){
      this.utilities.displayToastButtonTime('Contrasena o correo electronico incorrecto');
      this.utilities.dismissLoading();
    }else{
      try {
        // Iniciamos la consulta
        this.service.signIn(data).then((res: any) => {
          //Almacenamos en local storage el nombre del usuario
          console.log(res)
          localStorage.setItem(CONSTANTES.LOCAL_STORAGE.token, res.access_token);
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

  }

  //Metodo de enrutamiento de pantallas
  goTo(url) {
    this.navCtrl.navigateForward(url)
  }

  //Metodo para obtener la informacion del usuario logueado
  async getUser(){
    // Iniciamos la consulta
    await this.auth.getUser().then(async (res)=>{
      let data = JSON.parse(JSON.stringify(res));
      //this.serviceNotification.getToken();
      //Guardamos el token recibido
      localStorage.setItem(CONSTANTES.LOCAL_STORAGE.token, data.access_token);
      this.navCtrl.navigateRoot('/tabs/explore');
    },(err)=>{
      //En caso de error
      this.utilities.displayToastButtonTime(err.error.message ? err.error.message : CONSTANTES.MESSAGES.error);
      console.log("getError", err );
    })
  }

 async doRecovery(){/* Funcion para recuperar contrase;a */
  await this.utilities.displayLoading();
  let data = this.formGroup_.value;
  try {
    // Iniciamos la consulta
    this.service.signUp(data).then((res: any) => {
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
     //En caso de error
    this.utilities.dismissLoading();
    this.utilities.displayToastButtonTime(e.error.message ? e.error.message : CONSTANTES.MESSAGES.error);
    console.error(e);
  }

  }

  get errorControl() {
    //getting para recibir la informacion del formulario
    return this.formGroup.controls;
  }
}
