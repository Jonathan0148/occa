import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RondasPage } from './rondas.page';

const routes: Routes = [
  {
    path: '',
    component: RondasPage
  },
  {
    path: 'ronpuntos',
    loadChildren: () => import('./ronpuntos/ronpuntos.module').then( m => m.RonpuntosPageModule)
  },
  {
    path: 'preguntas',
    loadChildren: () => import('./preguntas/preguntas.module').then( m => m.PreguntasPageModule)
  },
  {
    path: 'verreq',
    loadChildren: () => import('./verreq/verreq.module').then( m => m.VerreqPageModule)
  },
  {
    path: 'reqdetalle',
    loadChildren: () => import('./reqdetalle/reqdetalle.module').then( m => m.ReqdetallePageModule)
  },
  {
    path: 'facialbas',
    loadChildren: () => import('./facialbas/facialbas.module').then( m => m.FacialbasPageModule)
  },
  {
    path: 'basepto',
    loadChildren: () => import('./basepto/basepto.module').then( m => m.BaseptoPageModule)
  },
  {
    path: 'noacceso',
    loadChildren: () => import('./noacceso/noacceso.module').then( m => m.NoaccesoPageModule)
  },
  {
    path: 'accion',
    loadChildren: () => import('./accion/accion.module').then( m => m.AccionPageModule)
  },
  {
    path: 'visitag',
    loadChildren: () => import('./visitag/visitag.module').then( m => m.VisitagPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RondasPageRoutingModule {}
