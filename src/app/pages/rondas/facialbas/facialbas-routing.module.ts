import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FacialbasPage } from './facialbas.page';

const routes: Routes = [
  {
    path: '',
    component: FacialbasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FacialbasPageRoutingModule {}
