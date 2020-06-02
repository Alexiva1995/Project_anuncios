import { Component, OnInit } from '@angular/core';
import { UtilitiesService } from 'src/app/services/utilities/utilities.service';
import { AdvertisementsService } from 'src/app/advertisements.service';
import { CONSTANTES } from 'src/app/services/constantes';
import { NavController } from '@ionic/angular';
import { NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-explore',
  templateUrl: './explore.page.html',
  styleUrls: ['./explore.page.scss'],
})
export class ExplorePage implements OnInit {
  advertisements: Object = [];

  constructor(
              private utilities: UtilitiesService,
              private ads: AdvertisementsService,
              private navCtrl: NavController
  ) { }

  ngOnInit() {
    this.getAds();
  }


  //Metodo para listar todos los anuncios
  async getAds(){
    await this.utilities.displayLoading();
    await this.ads.getAds().then(async (res) => {
     this.advertisements = res['todos los anuncios'];
      await this.utilities.dismissLoading();
    }, (err) => {
      this.utilities.dismissLoading();
      this.utilities.displayToastButtonTime(err.error.message ? err.error.message : CONSTANTES.MESSAGES.error);
      console.log("getError", err);
    })
  }

   //Metodo de enrutamiento de pantallas
   goTo(url, params?) {
    if(params){
      let navigationExtras: NavigationExtras = {
        queryParams: {
            data: JSON.stringify(params)
        }
    };
      this.navCtrl.navigateForward(url, navigationExtras);
    }else{
      this.navCtrl.navigateForward(url);
    }
  }

}
