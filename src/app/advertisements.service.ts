import { Injectable } from '@angular/core';
import { ApiService } from './services/api/api.service';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AdvertisementsService {
  token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiNDA2MzQ2Yzg1MjQ1NDcwZjY2YmVkYzNjODZmODk1ZjZkOTFiYWVmOWZjYWJiYjY0NzFhZDFlYWNiZDE1NmE4NTkxNzQ2Mjg3NzFiMWJjYWYiLCJpYXQiOjE1OTEwMjI1MTYsIm5iZiI6MTU5MTAyMjUxNiwiZXhwIjoxNjIyNTU4NTE2LCJzdWIiOiIxIiwic2NvcGVzIjpbXX0.VD3OsbrqpWBeOLUD9uTRw-VNwR950YJlDqcAG797axDNNlebwOquj_JLxHD6Ah0sGvpmvhJZnPWFS4eS-DNIknc5acBq3xs1EcZi9eHtvXRZFQNfUOKawryg37ATvx8Ilj-7ik56B-LJe-M4RTiK_1ZwLdHyYZUfjj9OOexeSJaOx5j-5THUZkZvoLkIhMlhXC9EbGCRYNYbL1SG37EDxkU9BWxlFQFnaCwCmntzLidJ1nu0wk3qbAjfcfQKZl67gDAxLiEG1inxbrQpFs8DjOo1n_HwDN-bj9TQNhHl4SacqxKfZYr2rIo3IWZpOrxlU8Irxc9P05AfFwBm2in1FOfcYMevdAQuFKrFZpRpR7_AagW9O1HOSQms6K2up1ZjtH0ZZHgaZ0u_iumC23vqXVxUFUyO2srYdgmQOYaYTOrOl9Z5qFk6v_XUz1vsHry3W4D39liep8Ts__lXwLHdlptIKEAeFSTfXno1fCjINxphrDovqWPZU1iTtF1OtgPHJKlKQNeC_Ljqz-2pBRsNms-jVZGUyWKfWWyqeBUNr9r9yeqCI14CgeWweG-YaqnpS9Pgunigs8q0sjm6lV_O8dq0c2maQwj7RKo8a10xY4uydKU9KOOX5VBPjH7u51cTnZrjwzJzUNt9dhlSZe3oux8Lt8UfKLMeLKWaTWVz6Qo"
  constructor(
    private api: ApiService,
    private http: HttpClient
  ) { }

       /**
   * Método para obtener todos los anuncios
   * **/
  public getAds() {
    return new Promise((resolve, reject) => {
      const seq = this.api.get('api/auth/user', null, true);
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
      const headers = new HttpHeaders({
        'Authorization': 'Bearer ' + this.token,  
        'Content-Type':'application/json',

      })
        
      const seq = this.http.post('http://valdusoft.com/ad/api/auth/ads/my-ads', null, {headers});
      seq.subscribe((res: any) => {
        resolve(res['ad']);
        console.log(res);
      }, err => {
        reject(err);
      });
    })
  }

  public updateMyAds(id,status) {
    return new Promise((resolve, reject) => {
      const headers = new HttpHeaders({
        'Authorization': 'Bearer ' + this.token,  
        'Content-Type':'application/json',
      })

      const data = {
        id: id,
        status:status
      }  
        
      const seq = this.http.post('http://valdusoft.com/ad/api/auth/ads/update', data, {headers});
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
      const headers = new HttpHeaders({
        'Authorization': 'Bearer ' + this.token,  
        'Content-Type':'application/json',
      })

      const data = {
        id: id,
      }  
        
      const seq = this.http.post('http://valdusoft.com/ad/api/auth/ads/delete', data, {headers});
      seq.subscribe((res: any) => {
        resolve(res);
        console.log(res);
      }, err => {
        reject(err);
      });
    })
  }

  public createAds(title,content,file,city,category) {
    return new Promise((resolve, reject) => {
      const headers = new HttpHeaders({
        'Authorization': 'Bearer ' + this.token,  
        'Content-Type':'application/json',
      })

      const data = {
        title: title,
        content:content,
        file:file,
        origin_city:city,
        categories:category
      }  
        
      const seq = this.http.post('http://valdusoft.com/ad/api/auth/ads/store', data, {headers});
      seq.subscribe((res: any) => {
        resolve(res);
        console.log(res);
      }, err => {
        reject(err);
      });
    })
  }


}
