import {
  Injectable
} from '@angular/core';
import {
  ApiService
} from '../api/api.service';
import { Observable } from 'rxjs/internal/Observable';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { HttpHeaders } from '@angular/common/http';
import { CONSTANTES } from '../constantes';

@Injectable({
  providedIn: 'root'
})
export class AdvertisementsService {
  constructor(
    private api: ApiService,
    private transfer: FileTransfer
  ) {}

  /**
   * Método para obtener todos los anuncios
   * **/
  public getAds() {
    return new Promise((resolve, reject) => {
      const seq = this.api.get('api/auth/ads', null, true);
      seq.subscribe((res: any) => {
        resolve(res);
        console.log(res);
      }, err => {
        reject(err);
      });
    })
  }

  public getMyAds() {
    return new Promise((resolve, reject) => {

      const seq = this.api.post('api/auth/ads/my-ads', null, true);
      seq.subscribe((res: any) => {
        resolve(res['ad']);
        console.log(res);
      }, err => {
        reject(err);
      });
    })
  }

  public updateMyAds(id, status) {
    return new Promise((resolve, reject) => {


      const data = {
        id: id,
        status: status
      }

      const seq = this.api.post('api/auth/ads/update', data, true);
      seq.subscribe((res: any) => {
        resolve(res);
        console.log(res);
      }, err => {
        reject(err);
      });
    })
  }

  public removeMyAds(id) {
    return new Promise((resolve, reject) => {


      const data = {
        id: id,
      }

      const seq = this.api.post('api/auth/ads/delete', data, true);
      seq.subscribe((res: any) => {
        resolve(res);
        console.log(res);
      }, err => {
        reject(err);
      });
    })
  }

  public createAds(usuario, file, city) {
    return new Promise((resolve, reject) => {

      const data = {
        title: usuario.titulo,
        content: usuario.descripcion,
        origin_city: city,
        categories: usuario.categoria
      }
        
      console.log(data)

      const seq = this.api.post('api/auth/ads/store', data, true);
      seq.subscribe((res: any) => {
        this.uploadPhoto(file)
        resolve(true);
      }, err => {
        reject(false);
      });
    })
  }



  public uploadFile(data) {
    const fileTransfer: FileTransferObject = this.transfer.create();
    let headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': "Bearer " + localStorage.getItem(CONSTANTES.LOCAL_STORAGE.token)
  })
    let options: FileUploadOptions = {
      fileKey: "photo",
      fileName: "file.jpg",
      chunkedMode: false,
      mimeType: "image/jpeg",
      headers: { headers }
    }
    //Data es la imagen
    fileTransfer.upload(data, 'http://valdusoft.com/ada/pi/auth/ads/store', options).then(data => {
    }, error => {
      alert("error");
      alert("error" + JSON.stringify(error));
    });
  
  }

  public categorys() {
    return new Promise((resolve, reject) => {
      let observer:Observable<any> = this.api.post('api/auth/categories', null , true);
      observer.subscribe((res: any) => {
        resolve(res);
        console.log(res);
      }, err => {
        reject(err);
      });
    })
  }


}
