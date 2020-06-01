import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PopinfoPageRoutingModule } from './popinfo-routing.module';

import { PopinfoPage } from './popinfo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PopinfoPageRoutingModule
  ],
  declarations: [PopinfoPage]
})
export class PopinfoPageModule {}
