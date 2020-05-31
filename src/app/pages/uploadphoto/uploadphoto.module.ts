import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UploadphotoPageRoutingModule } from './uploadphoto-routing.module';

import { UploadphotoPage } from './uploadphoto.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UploadphotoPageRoutingModule
  ],
  declarations: [UploadphotoPage]
})
export class UploadphotoPageModule {}
