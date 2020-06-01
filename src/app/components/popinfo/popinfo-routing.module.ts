import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PopinfoPage } from './popinfo.page';

const routes: Routes = [
  {
    path: '',
    component: PopinfoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PopinfoPageRoutingModule {}
