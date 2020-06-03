import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { PopinfoPage } from 'src/app/components/popinfo/popinfo.page';
import { UtilitiesService } from 'src/app/services/utilities/utilities.service';
import { CONSTANTES } from 'src/app/services/constantes';
import { AdvertisementsService } from 'src/app/services/advertisements/advertisements.service';

@Component({
  selector: 'app-advertisements',
  templateUrl: './advertisements.page.html',
  styleUrls: ['./advertisements.page.scss'],
})
export class AdvertisementsPage implements OnInit {
  advertisements:any = []
  contador:number

  constructor( public popoverController: PopoverController,
              private ads: AdvertisementsService,
              private utilities: UtilitiesService,) { }

  ngOnInit() {
    this.getAds();
  }

  //Metodo para listar todos mis anuncios
  async getAds(){
    await this.utilities.displayLoading();
     await this.ads.getMyAds().then(async (res) => {
      this.advertisements = res;
      await this.utilities.dismissLoading();
      }, (err) => {
      this.utilities.dismissLoading();
      this.utilities.displayToastButtonTime(err.error.message ? err.error.message : CONSTANTES.MESSAGES.error);
      console.log("getError", err);
    })
  }

  // Metodo para actualizar anuncios
  async updateAds(id,status){
    await this.utilities.displayLoading();
     await this.ads.updateMyAds(id,status).then(async (res) => {
      console.log("respuesta",res)
      await this.utilities.dismissLoading();
      }, (err) => {
      this.utilities.dismissLoading();
      this.utilities.displayToastButtonTime(err.error.message ? err.error.message : CONSTANTES.MESSAGES.error);
      console.log("getError", err);
    })
  }
  // Menu
  async menu(event,id,status) {

    const popover = await this.popoverController.create({
      component: PopinfoPage,
      event:event,
      showBackdrop: false,
      componentProps: {
        'id': id,
        'status': status
      }
    });
    await popover.present()
  }



}
