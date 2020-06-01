import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SeeadvertisementsPage } from './seeadvertisements.page';

const routes: Routes = [
  {
    path: '',
    component: SeeadvertisementsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SeeadvertisementsPageRoutingModule {}
