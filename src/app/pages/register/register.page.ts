import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UtilitiesService } from 'src/app/services/utilities/utilities.service';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { CONSTANTES } from 'src/app/services/constantes';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  public formGroup: FormGroup;
  constructor(   private service: AuthService,
    private fb: FormBuilder,
    private utilities: UtilitiesService,
    private navCtrl: NavController,
    private router: Router,
    public userS: AuthService) {
    this.formGroup = this.fb.group({
      email: ['', Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(8)])]
    });
  }

  ngOnInit() {
  }

  //Metodo de registrar usuario
  async signUp() {
    await this.utilities.displayLoading();
    let data = this.formGroup.value;
    try {
      // Iniciamos la consulta
      this.service.signUp(data).then((res: any) => {
        this.utilities.dismissLoading();
        this.utilities.displayToastButtonTime('Registro exitoso');
      }, e => {
        //En caso de error
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
}
