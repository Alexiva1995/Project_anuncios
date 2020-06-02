import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UtilitiesService } from 'src/app/services/utilities/utilities.service';
import { NavController } from '@ionic/angular';
import { CONSTANTES } from 'src/app/services/constantes';
//import { NotificationsService } from 'src/app/notifications.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  public formGroup: FormGroup;
  public type: string = 'password';
  constructor(   private service: AuthService,
    private fb: FormBuilder,
    private utilities: UtilitiesService,
    private navCtrl: NavController,
    public auth: AuthService,
    //private notification: NotificationsService
    ) {
    this.formGroup = this.fb.group({
      name: ['', Validators.required],
      email: ['', Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
      token_fcm:[''],
      categories:[null],
      confirm_password: ['', Validators.compose([Validators.required, Validators.minLength(6)])]
    });
  }

  ngOnInit() {
  }

  //Metodo de registrar usuario
  async signUp() {
    console.log(this.formGroup);
    
    await this.utilities.displayLoading();
    //this.notification.refreshToken();
    let token = localStorage.getItem(CONSTANTES.LOCAL_STORAGE.token);
    this.formGroup.controls.token_fcm.setValue(token);
    let data = this.formGroup.value;
    try {
      // Iniciamos la consulta
      this.service.signUp(data).then((res: any) => {
        this.utilities.dismissLoading();
        this.utilities.displayToastButtonTime('Registro exitoso');
      }, e => {
        //En caso de error
        console.log(e);
        
        this.utilities.dismissLoading();
        this.utilities.displayToastButtonTime(e.error.message ? e.error.message : CONSTANTES.MESSAGES.error);
      })

    }
    catch (e) {
      this.utilities.dismissLoading();
      this.utilities.displayToastButtonTime(e.error.message ? e.error.message : CONSTANTES.MESSAGES.error);
      console.error(e);
    }

  }




  goTo(url) {
    this.navCtrl.navigateForward(url)
  }

  get errorControl() {
    //getting para recibir la informacion del formulario
    return this.formGroup.controls;
  }
}
