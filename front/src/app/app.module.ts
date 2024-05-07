import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {TemplateModule} from "./template/template.module";
import {UserModule} from "./user/user.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HTTP_INTERCEPTORS, HttpClientModule, provideHttpClient, withInterceptors} from "@angular/common/http";
import {InputTextModule} from "primeng/inputtext";
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {UsModule} from './us/us.module';
import {PrimeNGAppUse} from './prime-ng-app-use.module';
import {ComponentsModule} from './components/components.module';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {EstoqueModule} from "./estoque/estoque.module";
import {loadingInterceptor} from "./interceptor/loading.interceptor";
import {globalErrorInterceptor} from "./interceptor/global.error.interceptor";
import {LoadingComponent} from "./components/loading/loading.component";

@NgModule({
  declarations: [
    AppComponent
  ],
    imports: [
        BrowserModule,
        HttpClientModule,
        TemplateModule,
        UserModule,
        UsModule,
        UserModule,
        ReactiveFormsModule,
        FormsModule,
        InputTextModule,
        NoopAnimationsModule,
        PrimeNGAppUse,
        ComponentsModule,
        EstoqueModule,
        LoadingComponent
    ],
  bootstrap: [AppComponent],
  providers: [
    provideHttpClient(withInterceptors([globalErrorInterceptor,loadingInterceptor])),
    provideAnimationsAsync()
  ]
})
export class AppModule { }
