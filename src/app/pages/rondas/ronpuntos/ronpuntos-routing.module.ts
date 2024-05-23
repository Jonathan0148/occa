import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RonpuntosPage } from './ronpuntos.page';

const routes: Routes = [
  {
    path: '',
    component: RonpuntosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RonpuntosPageRoutingModule {}
