import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiService } from '../api/api.service';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private api: ApiService
  ) { }


    /**
   * Método para registrar un usuario
   * @param data Datos del usuario*
   * **/
  public signUp(data: any) {
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

    /**
   * Método para iniciar sesion un usuario
   * @param data Datos del usuario*
   * **/
  public signIn(data) {
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

     /**
   * Método para obtener la informacion del usuario logueado
   * **/
  public getUser() {
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
