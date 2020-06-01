import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
/*   {
    path: 'login',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule),
    canActivate:[AuthGuard]
  }, */
  {
    path: 'register',
    loadChildren: () => import('./pages/register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: '',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./pages/profile/profile.module').then( m => m.ProfilePageModule)
  },
  {
    path: 'tutorial',
    loadChildren: () => import('./pages/tutorial/tutorial.module').then( m => m.TutorialPageModule)
  },
  {
    path: 'explore',
    loadChildren: () => import('./pages/explore/explore.module').then( m => m.ExplorePageModule)
  },
  {
    path: 'advertisements',
    loadChildren: () => import('./pages/advertisements/advertisements.module').then( m => m.AdvertisementsPageModule)
  },
  {
    path: 'offer',
    loadChildren: () => import('./pages/offer/offer.module').then( m => m.OfferPageModule)
  },
  {
    path: 'uploadphoto',
    loadChildren: () => import('./pages/uploadphoto/uploadphoto.module').then( m => m.UploadphotoPageModule)
  },
  {
    path: 'congratulations',
    loadChildren: () => import('./pages/congratulations/congratulations.module').then( m => m.CongratulationsPageModule)
  },
  {
    path: 'seeadvertisements',
    loadChildren: () => import('./pages/seeadvertisements/seeadvertisements.module').then( m => m.SeeadvertisementsPageModule)
  },  {
    path: 'popinfo',
    loadChildren: () => import('./components/popinfo/popinfo.module').then( m => m.PopinfoPageModule)
  }



];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
