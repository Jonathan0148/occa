import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { AgmCoreModule } from '@agm/core';
import { IonicModule } from '@ionic/angular';

// Pipes
import { PipesModule } from '../../pipes/pipes.module';

import { PropertyListPage } from './property-list.page';

const routes: Routes = [
  {
    path: '',
    component: PropertyListPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    PipesModule,
    RouterModule.forChild(routes),
    TranslateModule.forChild(),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyD9BxeSvt3u--Oj-_GD-qG2nPr1uODrR0Y'
    })
  ],
  declarations: [PropertyListPage]
})
export class PropertyListPageModule {}
