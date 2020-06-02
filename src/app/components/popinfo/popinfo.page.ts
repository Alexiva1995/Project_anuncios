import { Component, OnInit } from '@angular/core';
import { PopoverController, NavParams } from '@ionic/angular';
import { AdvertisementsService } from 'src/app/services/advertisements/advertisements.service';
import { UtilitiesService } from 'src/app/services/utilities/utilities.service';
import { CONSTANTES } from 'src/app/services/constantes';

@Component({
  selector: 'app-popinfo',
  templateUrl: './popinfo.page.html',
  styleUrls: ['./popinfo.page.scss'],
})
export class PopinfoPage implements OnInit {

  constructor(public popoverController: PopoverController,
              private ads: AdvertisementsService,
              private utilities: UtilitiesService,
              public navParams: NavParams,
              ) { }

  ngOnInit() {
  }

  async anular(){
    this.popoverController.dismiss()
    await this.utilities.displayLoading();
     await this.ads.updateMyAds(this.navParams.get('id'),this.navParams.get('status')).then(async (res) => {
      console.log("respuesta",res)
      await this.utilities.dismissLoading();
      }, (err) => {
      this.utilities.dismissLoading();
      this.utilities.displayToastButtonTime(err.error.message ? err.error.message : CONSTANTES.MESSAGES.error);
      console.log("getError", err);
    })
  }

  async borrar(){
    this.popoverController.dismiss()
    await this.utilities.displayLoading();
     await this.ads.removeMyAds(this.navParams.get('id')).then(async (res) => {
      console.log("respuesta",res)
      await this.utilities.dismissLoading();
      }, (err) => {
      this.utilities.dismissLoading();
      this.utilities.displayToastButtonTime(err.error.message ? err.error.message : CONSTANTES.MESSAGES.error);
      console.log("getError", err);
    })
  }

}
