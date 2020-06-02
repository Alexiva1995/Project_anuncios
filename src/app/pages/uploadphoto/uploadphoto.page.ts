import { Component, OnInit, NgZone } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { AlertController, NavController } from '@ionic/angular';
import { AdvertisementsService } from 'src/app/services/advertisements/advertisements.service';
import { UtilitiesService } from 'src/app/services/utilities/utilities.service';
import { CONSTANTES } from 'src/app/services/constantes';
import { ActivatedRoute } from '@angular/router';
import {
  Geolocation
} from '@ionic-native/geolocation/ngx';
declare var google;
@Component({
  selector: 'app-uploadphoto',
  templateUrl: './uploadphoto.page.html',
  styleUrls: ['./uploadphoto.page.scss'],
})
export class UploadphotoPage implements OnInit {
  imgSelected: string;
  dataRecibida:string;
  userCity: any;
  latLngResult: any;
  constructor(private camera: Camera, private alertCtrl: AlertController, 
              private ads: AdvertisementsService, private utilities: UtilitiesService,
              private capturar:ActivatedRoute,
              public zone: NgZone,
              private ruta: NavController,
              private geolocation: Geolocation) { }

  ngOnInit() {
    this.dataRecibida = this.capturar.snapshot.paramMap.get('id')
    this.getLocation();
  }

  async addImage() {
    let img = await this.captureImage();
    this.imgSelected = 'data:image/png;base64,' + img;
  }

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
    }, (err) => {
      // Handle error
      console.log("cameraE", err);
    });
  }

  selectOrigin() {
    return new Promise(async resolve => {

      const alert = await this.alertCtrl.create({
        header: 'Seleccionar Imágen',
        message: '¿Qué desea hacer?',
        buttons: [{
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


  async uploadMedia(){
      await this.utilities.displayLoading();
      let data;//Informacion y photos
       await this.ads.uploadPhoto(data).then(async (res) => {
        
        await this.utilities.dismissLoading();
        }, (err) => {
        this.utilities.dismissLoading();
        this.utilities.displayToastButtonTime(err.error.message ? err.error.message : CONSTANTES.MESSAGES.error);
        console.log("getError", err);
      })
  }
//Ubicacion
  getLocation() {
    this.geolocation.getCurrentPosition().then((resp) => {
      this.getAddress(resp.coords.latitude, resp.coords.longitude, 'reverseGeocode')
    }).catch((error) => {
      console.log('Error getting location', error);
    });
  }

  ///Direccion
  async getAddress(lat: number, lng: number, type?) {
    if (navigator.geolocation) {
      let geocoder = await new google.maps.Geocoder();
      let latlng = await new google.maps.LatLng(lat, lng);
      let request = { latLng: latlng };
      await geocoder.geocode(request, (results, status) => {
        if (status == google.maps.GeocoderStatus.OK) {
          let result = results[0];
          this.zone.run(() => {
            if (result != null) {
              //Ciudad del usuario
              this.userCity = result.formatted_address;
              if (type === 'reverseGeocode') {
                //Direccion completa
                this.latLngResult = result.formatted_address;
              }
            }
          })
        }
      });
    }
  }

  async finalizar(){
  
    if(this.imgSelected == null){
      return
    }else{
      // Metodo para finalizar
      const valor = await this.ads.createAds(JSON.parse(this.dataRecibida), this.imgSelected , this.userCity || 'Bogotá - Colombia')
      if(valor){
        this.ruta.navigateForward(['/congratulations'])
      }else{
        console.log("error")
      }
    }

  }

}
