import { Injectable } from '@angular/core';
import { FCM } from '@ionic-native/fcm/ngx'
import { AlertController } from '@ionic/angular';
import { CONSTANTES } from './services/constantes';
@Injectable({
  providedIn: 'root'
})
export class NotificationsService {
  userId: string;

  constructor(private fcm: FCM, private alertController: AlertController) { }


  
  public handlerNotifications(){
    this.fcm.getToken().then(async token => {
      //backend.registerToken(token
      const alert = await this.alertController.create({
        cssClass: 'my-custom-class',
        header: 'token',
        subHeader: ':',
        message: token,
        buttons: ['OK']
      });
  
      await alert.present();
    
    });
    
    this.fcm.onNotification().subscribe(data => {
      if(data.wasTapped){
        console.log("Received in background");
      } else {
        console.log("Received in foreground");
      };
    });
    
    this.fcm.onTokenRefresh().subscribe(async token => {
      //backend.registerToken(token);
      const alert = await this.alertController.create({
        cssClass: 'my-custom-class',
        header: 'token',
        subHeader: ':',
        message: token,
        buttons: ['OK']
      });
  
      await alert.present();
    });
  }

  setToken(){
    this.fcm.getToken().then((token) => {
      localStorage.setItem(CONSTANTES.LOCAL_STORAGE.FCM, token)
    })

  }

}
