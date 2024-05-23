import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FuncionesPage } from './funciones.page';

const routes: Routes = [
  {
    path: '',
    component: FuncionesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FuncionesPageRoutingModule {}
