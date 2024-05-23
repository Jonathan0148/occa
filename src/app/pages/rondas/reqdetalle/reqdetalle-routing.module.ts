import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReqdetallePage } from './reqdetalle.page';

const routes: Routes = [
  {
    path: '',
    component: ReqdetallePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReqdetallePageRoutingModule {}
