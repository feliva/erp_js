import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HeaderComponent} from './header/header.component';
import {NavComponent} from './nav/nav.component';
import {MainComponent} from './main/main.component';
import {UserModule} from "../user/user.module";
import {AppRoutingModule} from '../app-routing.module';
import {PrimeNGAppUse} from '../prime-ng-app-use.module';


@NgModule({
  declarations: [
    HeaderComponent,
    NavComponent,
    MainComponent
  ],
  imports: [
    CommonModule,
    UserModule,
    AppRoutingModule,
    PrimeNGAppUse
  ],
  exports:[
    HeaderComponent,
    NavComponent,
    MainComponent
  ]
})
export class TemplateModule { }
