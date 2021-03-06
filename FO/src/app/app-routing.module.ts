import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)},
  { path: 'gestisci-richiesta/:pk_req', loadChildren: './gestisci-richiesta/gestisci-richiesta.module#GestisciRichiestaPageModule' },
  { path: 'view-object', loadChildren: './view-object/view-object.module#ViewObjectPageModule' },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
