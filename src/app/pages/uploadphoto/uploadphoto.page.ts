import { Component, OnInit } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { AlertController } from '@ionic/angular';
import { AdvertisementsService } from 'src/app/advertisements.service';
import { UtilitiesService } from 'src/app/services/utilities/utilities.service';
import { CONSTANTES } from 'src/app/services/constantes';

@Component({
  selector: 'app-uploadphoto',
  templateUrl: './uploadphoto.page.html',
  styleUrls: ['./uploadphoto.page.scss'],
})
export class UploadphotoPage implements OnInit {
  imgSelected: string;

  constructor(private camera: Camera, private alertCtrl: AlertController, private ads: AdvertisementsService, private utilities: UtilitiesService) { }

  ngOnInit() {
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
}
