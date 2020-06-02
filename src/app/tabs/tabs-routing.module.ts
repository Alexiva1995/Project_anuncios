import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'explore',
        loadChildren: () => import('../pages/explore/explore.module').then( m => m.ExplorePageModule)
      },
      {
        path: 'ads',
        loadChildren: () => import('../pages/advertisements/advertisements.module').then( m => m.AdvertisementsPageModule)
      },
      {
        path: 'offer',
        loadChildren: () => import('../pages/offer/offer.module').then( m => m.OfferPageModule)
      },
      {
       path: 'profile',
    loadChildren: () => import('../pages/profile/profile.module').then( m => m.ProfilePageModule)
      },
      {
        path: '',
        redirectTo: 'tabs/explore',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: 'tabs/explore',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
