import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {TemplateModule} from "./template/template.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptors, withInterceptorsFromDi } from "@angular/common/http";
import {InputTextModule} from "primeng/inputtext";
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {PrimeNGAppUse} from './prime-ng-app-use.module';
import {ComponentsModule} from './components/components.module';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {EstoqueModule} from "./estoque/estoque.module";
import {loadingInterceptor} from "./interceptor/loading.interceptor";
import {globalErrorInterceptor} from "./interceptor/global.error.interceptor";
import {LoadingComponent} from "./components/loading/loading.component";

@NgModule({ declarations: [
        AppComponent
    ],
    bootstrap: [AppComponent], imports: [BrowserModule,
        TemplateModule,
        // UsModule,
        // UserModule,
        ReactiveFormsModule,
        FormsModule,
        InputTextModule,
        NoopAnimationsModule,
        PrimeNGAppUse,
        ComponentsModule,
        EstoqueModule,
        LoadingComponent], providers: [
        provideHttpClient(withInterceptors([globalErrorInterceptor, loadingInterceptor])),
        provideAnimationsAsync(),
        provideHttpClient(withInterceptorsFromDi())
    ] })
export class AppModule { }
