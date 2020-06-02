import { Injectable } from '@angular/core';
import { FCM } from '@ionic-native/fcm/ngx'
import { AlertController } from '@ionic/angular';
@Injectable({
  providedIn: 'root'
})
export class NotificationsService {
  userId: string;

  constructor(private fcm: FCM, private alertController: AlertController) { }


  
  public handlerNotifications(){
    this.fcm.getToken().then(token => {
      //backend.registerToken(token
    
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


}
