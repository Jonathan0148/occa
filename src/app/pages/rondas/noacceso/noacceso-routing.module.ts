import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NoaccesoPage } from './noacceso.page';

const routes: Routes = [
  {
    path: '',
    component: NoaccesoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NoaccesoPageRoutingModule {}
