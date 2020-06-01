import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { PopinfoPage } from 'src/app/components/popinfo/popinfo.page';

@Component({
  selector: 'app-advertisements',
  templateUrl: './advertisements.page.html',
  styleUrls: ['./advertisements.page.scss'],
})
export class AdvertisementsPage implements OnInit {

  constructor( public popoverController: PopoverController) { }

  ngOnInit() {
  }

  async menu(event) {

    const popover = await this.popoverController.create({
      component: PopinfoPage,
      event:event,
      showBackdrop: false,
    });
    await popover.present()
  }


}
