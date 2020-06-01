import { Injectable } from '@angular/core';
import { ApiService } from './services/api/api.service';

@Injectable({
  providedIn: 'root'
})
export class AdvertisementsService {

  constructor(
    private api: ApiService
  ) { }

       /**
   * Método para obtener todos los anuncios
   * **/
  public getAds() {
    return new Promise((resolve, reject) => {
      const seq = this.api.get('/api/auth/ads', null, true);
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
        resolve(res);
        console.log(res);
      }, err => {
        reject(err);
      });
    })
  }
}
