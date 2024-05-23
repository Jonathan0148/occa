import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MinutasPage } from './minutas.page';

const routes: Routes = [
  {
    path: '',
    component: MinutasPage
  },
  {
    path: 'mdetalle',
    loadChildren: () => import('./mdetalle/mdetalle.module').then( m => m.MdetallePageModule)
  },
  {
    path: 'resumen',
    loadChildren: () => import('./resumen/resumen.module').then( m => m.ResumenPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MinutasPageRoutingModule {}
