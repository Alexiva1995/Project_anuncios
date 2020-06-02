import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UploadphotoPage } from './uploadphoto.page';

const routes: Routes = [
  {
    path: '',
    component: UploadphotoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UploadphotoPageRoutingModule {}
