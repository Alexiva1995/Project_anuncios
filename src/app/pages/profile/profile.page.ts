import { Component, OnInit, NgZone } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { UtilitiesService } from 'src/app/services/utilities/utilities.service';
import { NavController, AlertController, ModalController } from '@ionic/angular';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { CONSTANTES } from 'src/app/services/constantes';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { AuthService } from 'src/app/services/login/auth.service';

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
   autocomplete: { input: string; };
   autocompleteItems: any[];
  location: any;
   placeid: any;
   public geocoder = new google.maps.Geocoder;
   public zone: NgZone;
  descripcion
  latitud = 0
  longitud = 0
  userId = 0
  constructor(
    private fb: FormBuilder,
    private utilities: UtilitiesService,
    private navCtrl: NavController,
    private camera: Camera,
    public alertCtrl: AlertController,
    public Zone: NgZone,
    private geolocation: Geolocation,
    private webView: WebView,
    private auth: AuthService,
    private alertController: AlertController,
    public modalController: ModalController,
  ) {
    this.form = this.fb.group({
      name: ['', Validators.compose([Validators.required])],
      apellido: [''],
      direccion: ['', Validators.compose([Validators.required])],
      email: ['', Validators.compose([Validators.required, Validators.pattern(/^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/)])],
      telefono: ['', Validators.compose([Validators.required, Validators.maxLength(20), Validators.minLength(11)])],
      fecha_nac: ['', Validators.compose([Validators.required])],
      fotoPerfil: [null],
      latitud: [0],
      longitud: [0],
      fk_rolid: [1]
    });

     this.GoogleAutocomplete = new google.maps.places.AutocompleteService();
     this.autocomplete = { input: '' };
     this.autocompleteItems = [];
     this.zone = Zone;
   }

   async ngOnInit() {
    /* await this.getUser(); */
    await this.getLocation();
  }


  //**Método que inicia el cambio de imagen */
  async cambiarImagen() {
    let img = await this.captureImage();
    this.imgSelected = 'data:image/png;base64,'+img;
  }


  /**Metodo para buscar la imagen en el dispositivo o tomar foto*/
  async captureImage() {
    let st = this.camera.PictureSourceType.CAMERA;
    await this.seleccionarFuente().then((result: boolean) => {
      if (result) {
        st = this.camera.PictureSourceType.CAMERA;
      } else {
        st = this.camera.PictureSourceType.PHOTOLIBRARY;
      }
    });

    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
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
      // let base64Image = 'data:image/png;base64,' + imageData;
      this.imgSelected = this.webView.convertFileSrc(imageData);
      this.imgUri = imageData;
      // this.form.controls['fotoPerfil'].setValue(imageData);
     }, (err) => {
      // Handle error
      console.log("cameraE", err);
     });
  }

  /**
   * Alert para preguntar si se desea tomar una foto o buscar en galería
   */
  seleccionarFuente() {
    return new Promise(async resolve => {

      const alert = await this.alertCtrl.create({
        header: 'Seleccionar Imágen',
        message: '¿Qué desea hacer?',
        buttons: [
          {
            text: "Tomar Foto",
            handler: () => {
              resolve(true);
            }
          },
          {
            text: "Buscar en Galería",
            handler: () => {
              resolve(false);
            }
          }
        ]
      });

      await alert.present();
    });
  }
   updateSearchResults(){
    this.autocomplete.input = this.form.get("direccion").value;
     if (this.autocomplete.input == '') {
       this.autocompleteItems = [];
       return;
     }
     this.GoogleAutocomplete.getPlacePredictions({ input: this.autocomplete.input,  componentRestrictions: {country: 'arg'} },
     (predictions, status) => {
       this.autocompleteItems = [];
       this.zone.run(() => {
         predictions.forEach((prediction) => {
           this.autocompleteItems.push(prediction);
         });
       });
     });
   }
  
   selectSearchResult(item){
  
     this.descripcion = item
     this.form.controls["direccion"].setValue(item);
  
     console.log(item)
     this.autocompleteItems = [];
     this.geocoder.geocode({'placeId': item.place_id}, (results, status) => {
     
     
     })
   } 

  limpiarDom(){
    this.descripcion=null;
  }
  goTo(url) {
    this.navCtrl.navigateForward(url)
  }
  getLocation(){
    this.geolocation.getCurrentPosition().then((resp) => {
      this.latitud=resp.coords.latitude;
      this.longitud=resp.coords.longitude;
      this.form.controls['latitud'].setValue(resp.coords.latitude);
      this.form.controls['longitud'].setValue(resp.coords.longitude);
      console.log("FORM", this.form.value);
      console.log(this.latitud, this.longitud);
     }).catch((error) => {
       console.log('Error getting location', error);
     });
  }
  async logout() {
    const alert = await this.alertController.create({ 
      message: '¿Seguro querés salir de Libreando?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (data) => {
            console.log('Confirm Cancel: data');
          }
        }, {
          text: 'Si',
          handler: () => {
            this.auth.logout();
          }
        }
      ]
    });
    await alert.present();
  }
  goback(){
    this.navCtrl.pop();
  }
  /* async getUser(){
    await this.utilities.displayLoading();
    await this.userS.getUser().then(async (res)=>{
      let data = JSON.parse(JSON.stringify(res));
     await this.utilities.dismissLoading();
      console.log("getUser",data);
      this.form.controls['name'].setValue(data.name+' '+ data.apellido);
      this.form.controls['apellido'].setValue(data.apellido);
      this.form.controls['direccion'].setValue(data.direccion);
      this.form.controls['email'].setValue(data.email);
      this.form.controls['telefono'].setValue(data.telefono);
      this.form.controls['fecha_nac'].setValue(data.fecha_nac);

      this.userId = data.id;
      if(data.url_imagen){
        this.imgSelected = data.url_imagen;
      }else{
        this.imgSelected = null;
      }
    },(err)=>{
      this.utilities.dismissLoading();
      this.utilities.displayToastButtonTime(err.error.message ? err.error.message : CONSTANTES.MESSAGES.error);
      console.log("getError", err );
    })
  } */
  //FORMATO DEL TELEFONO<<<<<<<<<<<<<<<<<<<<<<
  phoneFormat(e: KeyboardEvent){  //evita el ingreso de caracteres no numericos
    let telefono = this.form.get("telefono").value;
    console.log("entre");
    if(telefono.length > 18) {
      while(telefono.length > 18){
        telefono = telefono.slice(0,-1);
      }
        return;
    }
    if(e.key == "Backspace" || e.key == "ArrowLeft" || e.key == "ArrowRight"){
        return;
    }
    if(e.key.search(/[0-9]/) == -1) {
      telefono = telefono.slice(0,-1);
      return;
    }

    let phone = (e.target as HTMLInputElement).value;    
    this.phoneFormatView(phone);
}

phoneFormatView(num:any){  //formatea la vista del número
  //+54 9 11 0000 0000
  let split:any = num.split("");
  let format = "";
  for (var i = 0; i < split.length; ++i) {
    if(!(split[i] == " ") && !(split[i] == "+")) {
      format+= split[i];
    }
  }
  split  = format.split("");
  format = "+";

  for (var j = 0; j < split.length; ++j) {
    if(j == 1 || j == 2 || j == 4 || j == 8) {
      format = format + split[j] + " ";
    }else{
      format = format + split[j];
    }
  }
   this.form.controls["telefono"].setValue(format);
    // this.telefono = format;
}

checkForm(){
  return this.form.pristine;
}

  async delete(){
  const alert = await this.alertController.create({
    message: '¿Seguro querés eliminar tu cuenta Libreando?',
    buttons: [
      {
        text: 'Cancel',
        role: 'cancel',
        cssClass: 'secondary',
        handler: (blah) => {
          console.log('Confirm Cancel: blah');
        }
      }, {
        text: 'Si',
        handler: () => {
          this.auth.delete(this.userId);
        }
      }
    ]
  });

  await alert.present();
}





//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
}
