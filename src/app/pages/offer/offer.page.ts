import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-offer',
  templateUrl: './offer.page.html',
  styleUrls: ['./offer.page.scss'],
})
export class OfferPage implements OnInit {
  evaluarColor:boolean
  evaluarColor1:boolean

  constructor() { }

  ngOnInit() {
  }

  selecion(valor) {
    switch (valor) {
      case 0:
            {
              this.evaluarColor = true
              this.evaluarColor1 = false
            }
        break;

      case 1:
        {
          this.evaluarColor = false
          this.evaluarColor1 = true

        }
        break;

      default:
        break;
    }
  }

}
