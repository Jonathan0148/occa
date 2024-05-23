import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DomoticaPage } from './domotica.page';

const routes: Routes = [
  {
    path: '',
    component: DomoticaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DomoticaPageRoutingModule {}
