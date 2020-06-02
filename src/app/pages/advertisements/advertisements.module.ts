import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdvertisementsPageRoutingModule } from './advertisements-routing.module';

import { AdvertisementsPage } from './advertisements.page';
import { PopinfoPage } from 'src/app/components/popinfo/popinfo.page';
import { ComponentsModule } from 'src/app/components/component.module';

@NgModule({
  entryComponents:[
    PopinfoPage
   ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdvertisementsPageRoutingModule,
    ComponentsModule
  ],
  declarations: [AdvertisementsPage]
})
export class AdvertisementsPageModule {}
