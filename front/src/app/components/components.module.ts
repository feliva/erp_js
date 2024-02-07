import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ShowMessageComponent} from './show-message/show-message.component';
import {BreadcrumbComponent} from './breadcrumb/breadcrumb.component';


@NgModule({
  declarations: [
    ShowMessageComponent,
    BreadcrumbComponent,
  ],
  imports: [
    CommonModule
  ],
  exports:[
    ShowMessageComponent,
    BreadcrumbComponent,
  ]
})
export class ComponentsModule { }
