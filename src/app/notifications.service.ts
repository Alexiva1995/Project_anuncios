import { Injectable } from '@angular/core';
import { FCM } from '@ionic-native/fcm/ngx'
import { CONSTANTES } from './services/constantes';
@Injectable({
  providedIn: 'root'
})
export class NotificationsService {
  userId: string;

  constructor(private fcm: FCM) { }


  
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
    
    this.fcm.onTokenRefresh().subscribe(token => {
      //backend.registerToken(token);
    });
  }

  private disabled(){
    this.oneSignal.setSubscription(false);
  }
}
