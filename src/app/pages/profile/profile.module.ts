import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';
import { Camera } from '@ionic-native/camera/ngx';
import { ComponentsModule } from 'src/app/components/component.module';
import { ProfilePage } from './profile.page';
const routes: Routes = [
  {
    path: '',
    component: ProfilePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    ComponentsModule
  ],
  declarations: [ProfilePage],
  providers: [
    Camera,
  ]
})
export class ProfilePageModule {}
