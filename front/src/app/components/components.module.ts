import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ShowMessageComponent} from './show-message/show-message.component';
import {BreadcrumbComponent} from './breadcrumb/breadcrumb.component';
import {RouterModule} from "@angular/router";
import {LoadingComponent} from "./loading/loading.component";


@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        ShowMessageComponent,
        BreadcrumbComponent
    ],
    exports: [
        ShowMessageComponent,
        BreadcrumbComponent,
    ]
})
export class ComponentsModule { }
