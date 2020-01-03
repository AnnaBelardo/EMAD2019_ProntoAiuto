import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { GestisciRichiestaPage } from './gestisci-richiesta.page';

const routes: Routes = [
  {
    path: '',
    component: GestisciRichiestaPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [GestisciRichiestaPage]
})
export class GestisciRichiestaPageModule {}
