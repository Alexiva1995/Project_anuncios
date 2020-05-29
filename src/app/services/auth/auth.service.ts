import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiService } from '../api/api.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private _Http: HttpClient,
    private api: ApiService
  ) { }

  public registerUser(data) {
    return new Promise((resolve, reject) => {
      const seq = this.api.get('api/v1/clientes/listarTodos');
      seq.subscribe((res: any) => {
        resolve(res);
        console.log(res);
      }, err => {
        reject(err);
      });
    })
  }
 
}
