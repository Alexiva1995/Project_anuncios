import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-congratulations',
  templateUrl: './congratulations.page.html',
  styleUrls: ['./congratulations.page.scss'],
})
export class CongratulationsPage implements OnInit {

  constructor(private ruta: NavController) { }

  ngOnInit() {
  }

  publicar(){
    this.ruta.navigateForward([`/tabs/explore`])
  }

  mantener(){
    this.ruta.navigateForward([`/tabs/ads`])
  }

}
