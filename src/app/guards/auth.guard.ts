import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { CONSTANTES } from '../services/constantes';
import { NavController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private navCtrl: NavController
) { }

canActivate() {
    //Validamos que existe un usuario en el localstorage almacenado
    let token = localStorage.getItem(CONSTANTES.LOCAL_STORAGE.token);
    //let onboard = localStorage.getItem(CONSTANTES.LOCAL_STORAGE.tutorial);
    if (token) {
        this.navCtrl.navigateRoot('/tabs/explore');
    } else {
        this.navCtrl.navigateRoot('');
            return false;
    }
}
}