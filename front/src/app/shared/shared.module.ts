import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactMessageValidationComponent} from "./message-validation/react-message-validation.component";
import {TemplateMessageValidationComponent} from "./message-validation/template-message-validation.component";
import {PrimeNGAppUse} from '../prime-ng-app-use.module';


@NgModule({
    imports: [
        CommonModule,
        PrimeNGAppUse,
        ReactMessageValidationComponent,
        TemplateMessageValidationComponent
    ],
    exports: [
        ReactMessageValidationComponent,
        TemplateMessageValidationComponent,
    ]
})
export class SharedModule { }
