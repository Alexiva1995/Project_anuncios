import { Injectable } from '@angular/core';
import { OneSignal } from '@ionic-native/onesignal/ngx';
import { CONSTANTES } from './services/constantes';
@Injectable({
  providedIn: 'root'
})
export class NotificationsService {
  userId: string;

  constructor(private oneSignal: OneSignal) { }

  public handlerNotifications(){
    this.oneSignal.startInit('c1f688f2-217d-4a8f-b019-127cbfc8014c', '245562045849');
    this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.Notification);
    this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.InAppAlert);
    this.oneSignal.setSubscription(true);
    this.oneSignal.sendTag("token", localStorage.getItem(CONSTANTES.LOCAL_STORAGE.token));//token
    this.oneSignal.handleNotificationOpened()
    .subscribe(jsonData => {
  /*     let alert = this.alertCtrl.create({
        title: jsonData.notification.payload.title,
        subTitle: jsonData.notification.payload.body,
        buttons: ['OK']
      });
      alert.present();
      console.log('notificationOpenedCallback: ' + JSON.stringify(jsonData)); */
    });
    this.oneSignal.endInit();
    this.oneSignal.getIds().then(onesignal=>{
      this.userId = onesignal.userId
    }).catch(error=>{
      console.log(error)
    })
    
    this.oneSignal.endInit();
  }

  private disabled(){
    this.oneSignal.setSubscription(false);
  }
}
