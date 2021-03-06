import {
  Injectable
} from '@angular/core';
import {
  ApiService
} from './services/api/api.service';
import { Observable } from 'rxjs/internal/Observable';


@Injectable({
  providedIn: 'root'
})
export class AdvertisementsService {
  constructor(
    private api: ApiService
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

  public createAds(title, content, file, city, category) {
    return new Promise((resolve, reject) => {

      const data = {
        title: title,
        content: content,
        file: file,
        origin_city: city,
        categories: category
      }

      const seq = this.api.post('api/auth/ads/store', data, true);
      seq.subscribe((res: any) => {
        resolve(res);
        console.log(res);
      }, err => {
        reject(err);
      });
    })
  }

  public uploadPhoto(data) {
    return new Promise((resolve, reject) => {
      let observer:Observable<any> = this.api.post('api/auth/user', data, true);
      observer.subscribe((res: any) => {
        resolve(res);
        console.log(res);
      }, err => {
        reject(err);
      });
    })
  }


}
