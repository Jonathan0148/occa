import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BaseptoPage } from './basepto.page';

const routes: Routes = [
  {
    path: '',
    component: BaseptoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BaseptoPageRoutingModule {}
