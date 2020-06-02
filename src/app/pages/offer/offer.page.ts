import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-offer',
  templateUrl: './offer.page.html',
  styleUrls: ['./offer.page.scss'],
})
export class OfferPage implements OnInit {
  public formGroup: FormGroup;
  constructor(private fb: FormBuilder,private ruta: NavController,) { 
                this.formGroup = this.fb.group({
                  titulo: ['', Validators.required],
                  categoria: ['hola', Validators.required],
                  descripcion: ['', Validators.required]
                });
              }

  
  ngOnInit() {
  }

  finalizar(){
   console.log(this.formGroup.value)
    this.ruta.navigateForward([`/uploadphoto/${JSON.stringify(this.formGroup.value)}`])
  }

  salir(){
    this.ruta.back()
  }

}
