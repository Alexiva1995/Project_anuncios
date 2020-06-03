import { Injectable } from '@angular/core';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
@Injectable({
  providedIn: 'root'
})
export class SharingService {

  constructor( private socialSharing: SocialSharing ) { }

  sharing(){
    this.socialSharing.share("Salut, c'est un test de SmartBunnyApp", "Description de l'annonce", null, 'UrlAutoGenerada')
  }
}
