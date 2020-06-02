import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OfferPageRoutingModule } from './offer-routing.module';

import { OfferPage } from './offer.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule, 
    ReactiveFormsModule,
    IonicModule,
    OfferPageRoutingModule
  ],
  declarations: [OfferPage]
})
export class OfferPageModule {}
