import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { AdvertisementsService } from 'src/app/advertisements.service';

@Component({
  selector: 'app-offer',
  templateUrl: './offer.page.html',
  styleUrls: ['./offer.page.scss'],
})
export class OfferPage implements OnInit {
  public formGroup: FormGroup;
  constructor(private fb: FormBuilder,private ruta: NavController,private ads: AdvertisementsService,) { 
                this.formGroup = this.fb.group({
                  titulo: ['', Validators.required],
                  categoria: ['', Validators.required],
                  descripcion: ['', Validators.required]
                });
              }

  
  ngOnInit() {
  }

  selecion(valor){
    this.formGroup.controls.categoria.setValue(valor);
  }

  async finalizar(){
   console.log(this.formGroup.value)
    this.ruta.navigateForward([`/uploadphoto/${JSON.stringify(this.formGroup.value)}`])
    // deporte 1 / tecnologia 2
 
  }

  salir(){
    this.ruta.navigateForward(['/tabs'])
  }



}
