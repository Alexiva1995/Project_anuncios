import {
  Component,
  OnInit,
  NgZone
} from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators
} from '@angular/forms';
import {
  UtilitiesService
} from 'src/app/services/utilities/utilities.service';
import {
  NavController,
  AlertController,
  ModalController
} from '@ionic/angular';
import {
  Camera,
  CameraOptions
} from '@ionic-native/camera/ngx';
import {
  CONSTANTES
} from 'src/app/services/constantes';
import {
  Geolocation
} from '@ionic-native/geolocation/ngx';
import {
  WebView
} from '@ionic-native/ionic-webview/ngx';
import {
  AuthService
} from 'src/app/services/auth/auth.service';
declare var google;

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})

export class ProfilePage implements OnInit {
  public form: FormGroup;
  defaultPicture: 'assets/img/addPhoto.jpg';
  imgSelected: any;
  imgUri: any;
  GoogleAutocomplete;
  autocomplete: {
    input: string;
  };
  autocompleteItems: any[];
  location: any;
  placeid: any;
  //  public geocoder = new google.maps.Geocoder;
  public zone: NgZone;
  descripcion;
  latitud = 0;
  longitud = 0;
  userId = 0;
  constructor(
    private fb: FormBuilder,
    private utilities: UtilitiesService,
    private navCtrl: NavController,
    private camera: Camera,
    public alertCtrl: AlertController,
    public Zone: NgZone,
    private geolocation: Geolocation,
    private auth: AuthService,
    private alertController: AlertController,
    public modalController: ModalController,
  ) {
    this.form = this.fb.group({
      name: ['', Validators.compose([Validators.required])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
      email: ['', Validators.compose([Validators.required, Validators.pattern(/^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/)])],
      country:['', Validators.compose([Validators.required, Validators.maxLength(4), Validators.minLength(2)])],
      phone: ['', Validators.compose([Validators.required, Validators.maxLength(20), Validators.minLength(11)])],
      confirm_password: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
      new_password: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
      photoUrl:['']
    })

  }

  async ngOnInit() {
     await this.getUser(); 
  }


  //**Método que inicia el cambio de imagen */
  async changeImage() {
    let img = await this.captureImage();
    this.imgSelected = 'data:image/png;base64,' + img;
    this.form.controls.photoUrl.setValue(this.imgSelected);
  }


  /**Metodo para buscar la imagen en el dispositivo o tomar foto*/
  async captureImage() {
    let st = this.camera.PictureSourceType.CAMERA;
    await this.selectOrigin().then((result: boolean) => {
      if (result) {
        st = this.camera.PictureSourceType.CAMERA;
      } else {
        st = this.camera.PictureSourceType.PHOTOLIBRARY;
      }
    });

    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      mediaType: this.camera.MediaType.PICTURE,
      encodingType: this.camera.EncodingType.PNG,
      sourceType: st,
      allowEdit: true,
      targetHeight: 1080,
      targetWidth: 1080
    }

    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64 (DATA_URL):
      this.imgSelected = 'data:image/png;base64,' + imageData;
      this.imgUri = imageData;
    }, (err) => {
      // Handle error
      console.log("cameraE", err);
    });
  }

  /**
   * Alert para preguntar si se desea tomar una foto o buscar en galería
   */
  selectOrigin() {
    return new Promise(async resolve => {

      const alert = await this.alertCtrl.create({
        header: 'Sélectionnez une image',
        message: '¿Ce que vous voulez faire?',
        buttons: [{
            text: "Prendre une photo",
            handler: () => {
              resolve(true);
            }
          },
          {
            text: "Rechercher dans la galerie",
            handler: () => {
              resolve(false);
            }
          }
        ]
      });

      await alert.present();
    });
  }


  goTo(url) {
    this.navCtrl.navigateForward(url)
  }

  async signOut() {
    const alert = await this.alertController.create({
      message: 'Vous êtes sûr de vouloir quitter Smarbunny ?',
      buttons: [{
        text: 'Cancelar',
        role: 'cancel',
        cssClass: 'secondary',
        handler: (data) => {
          console.log('Confirm Cancel: data');
        }
      }, {
        text: 'Yes',
        handler: async () => {
          await this.auth.logOut();
          this.navCtrl.navigateRoot('/login')
        }
      }]
    });
    await alert.present();
  }
  goback() {
    this.navCtrl.pop();
  }
  async getUser() {
    await this.utilities.displayLoading();
    await this.auth.getUser().then(async (res) => {
      let data = res;
      console.log("datos", res)
      this.form.controls.email.setValue(data['email']);
      this.form.controls.name.setValue(data['name']);
      this.form.controls.phone.setValue(data['phone']);
      this.form.controls.photoUrl.setValue(data['photo']);
      await this.utilities.dismissLoading();
    }, (err) => {
      this.utilities.dismissLoading();
      this.utilities.displayToastButtonTime(err.error.message ? err.error.message : CONSTANTES.MESSAGES.error);
      console.log("getError", err);
    })
  }
  //FORMATO DEL TELEFONO<<<<<<<<<<<<<<<<<<<<<<
  phoneFormat(e: KeyboardEvent) { //evita el ingreso de caracteres no numericos
    let telefono = this.form.get("country").value;
    if (telefono.length > 18) {
      while (telefono.length > 18) {
        telefono = telefono.slice(0, -1);
      }
      return;
    }
    if (e.key == "Backspace" || e.key == "ArrowLeft" || e.key == "ArrowRight") {
      return;
    }
    if (e.key.search(/[0-9]/) == -1) {
      telefono = telefono.slice(0, -1);
      return;
    }

    let phone = (e.target as HTMLInputElement).value;
    this.phoneFormatView(phone);
  }

  phoneFormatView(num: any) { //formatea la vista del número
    //+54 9 11 0000 0000
    let split: any = num.split("");
    let format = "";
    for (var i = 0; i < split.length; ++i) {
      if (!(split[i] == " ") && !(split[i] == "+")) {
        format += split[i];
      }
    }
    split = format.split("");
    format = "+";

    for (var j = 0; j < split.length; ++j) {
      if (j == 1 || j == 2 || j == 4 || j == 8) {
        format = format + split[j] + " ";
      } else {
        format = format + split[j];
      }
    }
    this.form.controls["country"].setValue(format);
    // this.telefono = format;
  }

  checkForm() {
    return this.form.pristine;
  }

  async delete() {
    const alert = await this.alertController.create({
      message: 'Êtes-vous sûr de vouloir clôturer votre compte SmartBunny?',
      buttons: [{
        text: 'Cancel',
        role: 'cancel',
        cssClass: 'secondary',
        handler: (blah) => {
          console.log('Confirm Cancel: blah');
        }
      }, {
        text: 'Yes',
        handler: () => {
          this.auth.delete();
          this.signOut();
        }
      }]
    });

    await alert.present();
  }

  get errorControl() {
    //getting para recibir la informacion del formulario
    return this.form.controls;
  }
}