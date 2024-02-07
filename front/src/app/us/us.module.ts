import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RouterModule} from '@angular/router';

import {UsControlComponent} from './us-control.component';
import {UsRoutingModule} from './us-routing.module';
import {PrimeNGAppUse} from '../prime-ng-app-use.module';
import {UsBuscaComponent} from './us-busca.component';


@NgModule({
  declarations: [
    UsControlComponent,
    UsBuscaComponent
  ],
  imports: [
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    CommonModule,

    UsRoutingModule,
    PrimeNGAppUse,

  ]
})
export class UsModule { }
