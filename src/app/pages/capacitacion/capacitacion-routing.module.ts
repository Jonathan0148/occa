import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CapacitacionPage } from './capacitacion.page';

const routes: Routes = [
  {
    path: '',
    component: CapacitacionPage
  },
  {
    path: 'capdetalle',
    loadChildren: () => import('./capdetalle/capdetalle.module').then( m => m.CapdetallePageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CapacitacionPageRoutingModule {}
