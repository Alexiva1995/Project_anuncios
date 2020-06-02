import { Component, OnInit } from '@angular/core';
import { NavParams } from '@ionic/angular';

@Component({
  selector: 'app-offer',
  templateUrl: './offer.page.html',
  styleUrls: ['./offer.page.scss'],
})
export class OfferPage implements OnInit {
  evaluarColor:boolean
  evaluarColor1:boolean

  constructor(public navParams: NavParams) { }

  ngOnInit() {
  }

  finalizar(){

  }

}
