import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SeeadvertisementsPageRoutingModule } from './seeadvertisements-routing.module';

import { SeeadvertisementsPage } from './seeadvertisements.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SeeadvertisementsPageRoutingModule
  ],
  declarations: [SeeadvertisementsPage]
})
export class SeeadvertisementsPageModule {}
