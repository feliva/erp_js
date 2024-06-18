import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HeaderComponent} from './header/header.component';
import {NavComponent} from './nav/nav.component';
import {MainComponent} from './main/main.component';
import {AppRoutingModule} from '../app-routing.module';
import {PrimeNGAppUse} from '../prime-ng-app-use.module';
import {PanelMenuModule} from "primeng/panelmenu";
import {ComponentsModule} from "../components/components.module";
import {LoadingComponent} from "../components/loading/loading.component";


@NgModule({
  declarations: [
    HeaderComponent,
    NavComponent,
    MainComponent
  ],
    imports: [
        CommonModule,
        AppRoutingModule,
        PrimeNGAppUse,
        PanelMenuModule,
        ComponentsModule,
        LoadingComponent
    ],
  exports:[
    HeaderComponent,
    NavComponent,
    MainComponent
  ]
})
export class TemplateModule { }
