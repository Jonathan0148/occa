import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VerreqPage } from './verreq.page';

const routes: Routes = [
  {
    path: '',
    component: VerreqPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VerreqPageRoutingModule {}
