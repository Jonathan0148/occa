import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AccionPage } from './accion.page';

const routes: Routes = [
  {
    path: '',
    component: AccionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AccionPageRoutingModule {}
