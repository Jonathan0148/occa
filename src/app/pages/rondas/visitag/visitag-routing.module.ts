import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VisitagPage } from './visitag.page';

const routes: Routes = [
  {
    path: '',
    component: VisitagPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VisitagPageRoutingModule {}
